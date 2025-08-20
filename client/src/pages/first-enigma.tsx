import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Check, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

interface CrosswordCell {
  id: string;
  value: string;
  readOnly: boolean;
  wordId?: string;
  position: number;
}

export default function FirstEnigma() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Timer states
  const [enigmaTimer, setEnigmaTimer] = useState(120); // 2 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCrossword, setShowCrossword] = useState(false);
  
  // Game states
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showClue, setShowClue] = useState(false);
  
  // Crossword grid state - 7x7 grid with intersecting words
  const [grid, setGrid] = useState<CrosswordCell[][]>(() => {
    const initialGrid: CrosswordCell[][] = [];
    for (let i = 0; i < 7; i++) {
      initialGrid[i] = [];
      for (let j = 0; j < 7; j++) {
        initialGrid[i][j] = {
          id: `${i}-${j}`,
          value: '',
          readOnly: true,
          position: 0
        };
      }
    }
    
    // HETRE (1. horizontal, row 1, cols 1-5) - intersects with CHENE at position 2
    for (let j = 1; j <= 5; j++) {
      initialGrid[1][j] = {
        id: `1-${j}`,
        value: j === 3 ? 'T' : '', // Pre-fill intersection with CHENE
        readOnly: j === 3, // Make intersection read-only
        wordId: 'hetre',
        position: j - 1
      };
    }
    
    // CHENE (2. vertical, col 3, rows 0-4) - intersects with HETRE at row 1
    for (let i = 0; i <= 4; i++) {
      if (i === 1) continue; // Skip HETRE intersection (already handled)
      initialGrid[i][3] = {
        id: `${i}-3`,
        value: '',
        readOnly: false,
        wordId: 'chene',
        position: i
      };
    }
    
    // EPICEA (3. horizontal, row 3, cols 0-5) - intersects with CHENE at position 3 and SAPIN at position 5
    for (let j = 0; j <= 5; j++) {
      initialGrid[3][j] = {
        id: `3-${j}`,
        value: j === 3 ? 'E' : (j === 5 ? 'A' : ''), // Pre-fill intersections
        readOnly: j === 3 || j === 5, // Make intersections read-only
        wordId: 'epicea',
        position: j
      };
    }
    
    // SAPIN (4. vertical, col 5, rows 3-6) - intersects with EPICEA at row 3
    for (let i = 3; i <= 6; i++) {
      if (i === 3) continue; // Skip EPICEA intersection (already handled)
      initialGrid[i][5] = {
        id: `${i}-5`,
        value: '',
        readOnly: false,
        wordId: 'sapin',
        position: i - 3
      };
    }
    
    return initialGrid;
  });

  const storyText = "Regardez la végétation qui vous entoure, les arbres et les plantes essayent de vous parler. Apprenez à les écouter. Identifiez les essences d'arbres qui peuplent cette forêt mystérieuse...";
  
  // Words and their answers
  const answers = {
    hetre: 'HETRE',
    chene: 'CHENE', 
    epicea: 'EPICEA',
    sapin: 'SAPIN'
  };

  // Start enigma timer
  const startEnigmaTimer = () => {
    setTimerActive(true);
    
    const interval = setInterval(() => {
      setEnigmaTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setIsTimeUp(true);
          // Show solution when time is up
          showSolution();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Show solution in grid
  const showSolution = () => {
    const solutionGrid = [...grid];
    
    // Fill in all answers
    const solutions = {
      hetre: 'HETRE',
      chene: 'CHENE',
      epicea: 'EPICEA',
      sapin: 'SAPIN'
    };

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const cell = solutionGrid[i][j];
        if (cell.wordId && !cell.readOnly) {
          const word = solutions[cell.wordId as keyof typeof solutions];
          if (word[cell.position]) {
            solutionGrid[i][j] = {
              ...cell,
              value: word[cell.position]
            };
          }
        }
      }
    }
    
    setGrid(solutionGrid);
  };

  // Check if crossword is completed
  const checkCompletion = () => {
    const currentAnswers = {
      hetre: '',
      chene: '',
      epicea: '',
      sapin: ''
    };

    // Extract current answers from grid
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const cell = grid[i][j];
        if (cell.wordId && cell.value) {
          currentAnswers[cell.wordId as keyof typeof answers] += cell.value;
        }
      }
    }

    // Check if all answers are correct
    const allCorrect = Object.keys(answers).every(
      word => currentAnswers[word as keyof typeof answers] === answers[word as keyof typeof answers]
    );

    if (allCorrect && !isCompleted && timerActive) {
      setIsCompleted(true);
      setTimerActive(false);
      setTimeout(() => setShowClue(true), 1000);
    }
  };

  // Handle cell input
  const handleCellChange = (row: number, col: number, value: string) => {
    if (value.length > 1) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      value: value.toUpperCase()
    };
    setGrid(newGrid);
    
    // Check completion after state update
    setTimeout(checkCompletion, 100);
  };

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Start content display
    setTimeout(() => {
      setShowContent(true);
      
      // Typewriter effect
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < storyText.length) {
          setTypewriterText(storyText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setShowCrossword(true);
            startEnigmaTimer();
          }, 1000);
        }
      }, 40);

      return () => clearInterval(typeInterval);
    }, 1000);
  }, [storyText]);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timers */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/forest-challenge")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <div className="flex items-center space-x-4">
          {/* General Timer */}
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <Timer className="h-4 w-4 text-forest mr-2" />
            <span className="font-mono text-sm font-semibold text-slate-700">
              {chronometer.formattedTime}
            </span>
          </div>
          
          {/* Enigma Timer - Red */}
          {timerActive && (
            <div className="flex items-center bg-red-600/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg animate-pulse">
              <Timer className="h-4 w-4 text-white mr-2" />
              <span className="font-mono text-sm font-semibold text-white">
                {formatTime(enigmaTimer)}
              </span>
            </div>
          )}
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Story Card */}
            <div className="bg-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-emerald-200/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-emerald-900 drop-shadow-sm">
                    Première Énigme
                  </h3>
                  <p className="text-lg text-emerald-700 italic font-elvish">Les Secrets de la Forêt</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-6">
                  <p className="text-lg leading-relaxed font-elvish text-emerald-900 min-h-[80px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Crossword Puzzle */}
                {showCrossword && (
                  <div className="animate-slideInUp">
                    <div className="bg-white/90 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-elvish font-bold text-emerald-900 mb-4 text-center">
                        Mots Croisés de la Forêt
                      </h4>
                      
                      {/* Crossword Grid */}
                      <div className="grid grid-cols-7 gap-1 max-w-sm mx-auto mb-4">
                        {grid.map((row, i) => 
                          row.map((cell, j) => (
                            <div key={cell.id} className="relative">
                              {/* Number labels for word starts */}
                              {((i === 1 && j === 1) || (i === 0 && j === 3) || (i === 3 && j === 0) || (i === 3 && j === 5)) && (
                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-emerald-600 text-white text-xs flex items-center justify-center rounded-full font-bold z-10">
                                  {(i === 1 && j === 1) ? '1' : 
                                   (i === 0 && j === 3) ? '2' : 
                                   (i === 3 && j === 0) ? '3' : '4'}
                                </div>
                              )}
                              <input
                                type="text"
                                value={cell.value}
                                onChange={(e) => handleCellChange(i, j, e.target.value)}
                                disabled={cell.readOnly || isCompleted || isTimeUp}
                                className={`w-8 h-8 text-center text-sm font-bold border-2 ${
                                  cell.readOnly 
                                    ? 'bg-gray-100 border-gray-300' 
                                    : 'bg-white border-emerald-400 focus:border-emerald-600'
                                } ${
                                  isCompleted ? 'bg-green-100' : ''
                                } ${
                                  isTimeUp && !cell.readOnly && !isCompleted ? 'bg-red-100 text-red-700' : ''
                                } rounded`}
                                maxLength={1}
                                data-testid={`crossword-cell-${i}-${j}`}
                              />
                            </div>
                          ))
                        )}
                      </div>

                      {/* Clues */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-bold text-emerald-800 mb-2">Horizontal:</h5>
                          <p className="text-emerald-700">1. Arbre aux feuilles caduques, bois dur (5 lettres)</p>
                          <p className="text-emerald-700">3. Conifère aux aiguilles plates (6 lettres)</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-emerald-800 mb-2">Vertical:</h5>
                          <p className="text-emerald-700">2. Arbre au gland (5 lettres)</p>
                          <p className="text-emerald-700">4. Conifère de Noël (4 lettres)</p>
                        </div>
                      </div>
                    </div>

                    {/* Success Message */}
                    {isCompleted && (
                      <div className="bg-green-100/90 rounded-xl p-6 mb-6 animate-slideInUp border-2 border-green-300">
                        <div className="text-center">
                          <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
                          <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                            Félicitations !
                          </h4>
                          <p className="text-green-700 font-elvish mb-4">
                            Vous avez résolu l'énigme des arbres ! Votre connaissance de la forêt vous sera précieuse.
                          </p>
                          
                          {showClue && (
                            <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-400">
                              <h5 className="font-bold text-amber-800 mb-2">Indice précieux :</h5>
                              <p className="text-lg font-elvish font-bold text-amber-900">DIEU</p>
                              <p className="text-sm text-amber-700 italic mt-2">
                                Gardez ce mot précieusement en mémoire, il vous sera utile plus tard...
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Time Up Message */}
                    {isTimeUp && !isCompleted && (
                      <div className="bg-red-100/90 rounded-xl p-6 mb-6 animate-slideInUp border-2 border-red-300">
                        <div className="text-center">
                          <X className="h-8 w-8 text-red-600 mx-auto mb-3" />
                          <h4 className="text-xl font-elvish font-bold text-red-800 mb-3">
                            Trop tard !
                          </h4>
                          <p className="text-red-700 font-elvish mb-4">
                            Le temps est écoulé. Voici les réponses que vous cherchiez :
                          </p>
                          <div className="bg-white/80 rounded-lg p-4 text-center">
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                              <div>
                                <p><span className="font-bold">1. HETRE</span> - Arbre aux feuilles caduques</p>
                                <p><span className="font-bold">3. EPICEA</span> - Conifère aux aiguilles plates</p>
                              </div>
                              <div>
                                <p><span className="font-bold">2. CHENE</span> - Arbre au gland</p>
                                <p><span className="font-bold">4. SAPIN</span> - Conifère de Noël</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Continue Button */}
                    {(isCompleted || isTimeUp) && (
                      <div className="text-center animate-slideInUp">
                        <button
                          onClick={() => setLocation("/riddle-chapter")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-next-enigma"
                        >
                          Passer à la prochaine énigme
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .font-elvish {
          font-family: 'Kalam', cursive;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}