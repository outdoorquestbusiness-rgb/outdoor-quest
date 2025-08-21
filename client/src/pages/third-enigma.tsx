import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Users, Eye, Map, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

interface LetterCorrespondence {
  greek: string;
  cyrillic: string;
  latin: string;
}

export default function ThirdEnigma() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Game states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [playerAnswer, setPlayerAnswer] = useState("");

  const storyText = "Au plus profond de la forêt mystérieuse, le Dahu Blanc vous attend pour la dernière épreuve de ce domaine sylvestre. Sa voix ancienne résonne entre les arbres : 'Mortels courageux, vous avez traversé les mystères de ma forêt avec sagesse. Une ultime énigme forestière vous sépare de la sortie de ces bois enchantés. Je garde jalousement un objet sacré, porteur d'un de mes nombreux secrets. Ce secret est écrit dans une langue oubliée des vivants, déchiffrable seulement par ceux qui unissent leurs forces. Découvrez mon objet secret et sa signification... puis vous pourrez quitter ma forêt pour poursuivre votre quête au-delà de ces terres.'";

  const greekToLatin: { greek: string; latin: string }[] = [
    { greek: "Π", latin: "P" },
    { greek: "Ι", latin: "I" },
    { greek: "Ε", latin: "E" },
    { greek: "Ρ", latin: "R" },
    { greek: "Τ", latin: "T" },
  ];

  const cyrillicToGreek: { cyrillic: string; greek: string }[] = [
    { cyrillic: "П", greek: "Π" },
    { cyrillic: "И", greek: "Ι" },
    { cyrillic: "Е", greek: "Ε" },
    { cyrillic: "Р", greek: "Ρ" },
    { cyrillic: "Т", greek: "Τ" },
  ];

  const correctAnswer = "FUJI";
  const cyrillicWord = "ФУДЖИ"; // "FUJI" in Cyrillic

  const handleSubmit = () => {
    if (playerAnswer.toUpperCase() === correctAnswer) {
      setIsCompleted(true);
      setTimerActive(false);
    } else {
      // Show visual feedback for wrong answer
      setPlayerAnswer("");
    }
  };

  const handleTimeout = () => {
    setIsTimeUp(true);
    setTimerActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timerActive && timeRemaining === 0) {
      handleTimeout();
    }
  }, [timerActive, timeRemaining]);

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
            setShowPuzzle(true);
            setTimerActive(true);
          }, 1500);
        }
      }, 30);

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
          onClick={() => setLocation("/third-compass")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <div className="flex items-center space-x-4">
          {/* Main Timer */}
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <Timer className="h-4 w-4 text-forest mr-2" />
            <span className="font-mono text-sm font-semibold text-slate-700">
              {chronometer.formattedTime}
            </span>
          </div>
          
          {/* Puzzle Timer */}
          {(showPuzzle && timerActive) && (
            <div className="flex items-center bg-red-600 text-white rounded-lg px-3 py-2 shadow-lg animate-pulse">
              <Timer className="h-4 w-4 mr-2" />
              <span className="font-mono text-sm font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Story Card */}
            <div className="bg-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-emerald-200/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-emerald-900 drop-shadow-sm">
                    La Dernière Énigme de la Forêt
                  </h3>
                  <p className="text-lg text-emerald-700 italic font-elvish">L'Objet Secret du Dahu</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-6">
                  <p className="text-lg leading-relaxed font-elvish text-emerald-900 min-h-[150px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Split Screen Puzzle */}
                {showPuzzle && !isCompleted && !isTimeUp && (
                  <div className="animate-slideInUp">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {/* Player 1 - Object Photo */}
                      <div className="bg-blue-900/80 rounded-xl p-6 border-2 border-blue-400">
                        <div className="text-center mb-4">
                          <Eye className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                          <h4 className="text-xl font-elvish font-bold text-blue-100">
                            Joueur 1 - L'Objet Secret
                          </h4>
                        </div>
                        
                        {/* Stone Object SVG */}
                        <div className="bg-white/90 rounded-lg p-6 mb-4">
                          <svg 
                            className="w-full h-48 mx-auto"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Stone background */}
                            <rect x="30" y="60" width="140" height="80" rx="8" fill="#708090" stroke="#2F4F4F" strokeWidth="3"/>
                            <rect x="25" y="55" width="150" height="90" rx="10" fill="#778899" stroke="#2F4F4F" strokeWidth="2"/>
                            
                            {/* Stone texture */}
                            <circle cx="70" cy="90" r="3" fill="#696969" opacity="0.6"/>
                            <circle cx="130" cy="110" r="4" fill="#696969" opacity="0.5"/>
                            <circle cx="110" cy="85" r="2" fill="#2F4F4F" opacity="0.7"/>
                            
                            {/* Cyrillic text "ФУДЖИ" */}
                            <text x="100" y="110" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2F4F4F">
                              ФУДЖИ
                            </text>
                          </svg>
                        </div>
                        
                        {/* Greek Letters for Player 1 */}
                        <div className="bg-white/80 rounded-lg p-4">
                          <h5 className="font-bold text-gray-800 mb-3">Correspondances Grec → Latin :</h5>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {greekToLatin.map((letter, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="font-mono text-lg">{letter.greek}</span>
                                <span className="font-semibold">{letter.latin}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Player 2 - Environment Photo */}
                      <div className="bg-green-900/80 rounded-xl p-6 border-2 border-green-400">
                        <div className="text-center mb-4">
                          <Map className="h-6 w-6 text-green-300 mx-auto mb-2" />
                          <h4 className="text-xl font-elvish font-bold text-green-100">
                            Joueur 2 - L'Environnement
                          </h4>
                        </div>
                        
                        {/* Environment SVG */}
                        <div className="bg-white/90 rounded-lg p-6 mb-4">
                          <svg 
                            className="w-full h-48 mx-auto"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Forest background */}
                            <rect x="0" y="0" width="200" height="200" fill="#228B22"/>
                            
                            {/* Trees */}
                            <ellipse cx="50" cy="80" rx="20" ry="25" fill="#006400"/>
                            <ellipse cx="150" cy="70" rx="25" ry="30" fill="#006400"/>
                            <ellipse cx="30" cy="120" rx="15" ry="20" fill="#228B22"/>
                            <ellipse cx="170" cy="110" rx="18" ry="22" fill="#228B22"/>
                            
                            {/* Stone location - small hint */}
                            <rect x="90" y="140" width="20" height="12" rx="2" fill="#778899" stroke="#2F4F4F"/>
                            
                            {/* Moss and vegetation */}
                            <circle cx="80" cy="160" r="8" fill="#32CD32" opacity="0.7"/>
                            <circle cx="120" cy="155" r="6" fill="#32CD32" opacity="0.8"/>
                          </svg>
                        </div>
                        
                        {/* Cyrillic Letters for Player 2 */}
                        <div className="bg-white/80 rounded-lg p-4">
                          <h5 className="font-bold text-gray-800 mb-3">Correspondances Cyrillique → Grec :</h5>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {cyrillicToGreek.map((letter, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="font-mono text-lg">{letter.cyrillic}</span>
                                <span className="font-semibold">{letter.greek}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Answer Input */}
                    <div className="bg-white/90 rounded-xl p-6 text-center">
                      <h4 className="text-xl font-elvish font-bold text-gray-800 mb-4">
                        Quel mot est inscrit sur l'objet secret ?
                      </h4>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <input
                          type="text"
                          value={playerAnswer}
                          onChange={(e) => setPlayerAnswer(e.target.value)}
                          placeholder="Tapez votre réponse..."
                          className="px-4 py-2 border-2 border-gray-300 rounded-lg font-elvish text-lg focus:border-emerald-500 focus:outline-none"
                          data-testid="input-answer"
                        />
                        <button
                          onClick={handleSubmit}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-2 px-6 rounded-lg transition-colors"
                          data-testid="button-submit-answer"
                        >
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Result */}
                {isCompleted && (
                  <div className="animate-slideInUp">
                    <div className="bg-green-100/90 rounded-xl p-6 mb-6 border-2 border-green-300">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                          Le Dahu Blanc approuve !
                        </h4>
                        <p className="text-green-700 font-elvish mb-4">
                          Vous avez découvert l'objet secret et déchiffré le mystère des écritures anciennes ! La forêt s'ouvre devant vous.
                        </p>
                        
                        <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-400">
                          <h5 className="font-bold text-amber-800 mb-2">Mot indice révélé :</h5>
                          <p className="text-lg font-elvish font-bold text-amber-900">FUJI</p>
                          <p className="text-sm text-amber-700 italic mt-2">
                            "Le mont sacré de l'Orient révèle ses mystères..."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Failure Result */}
                {isTimeUp && !isCompleted && (
                  <div className="animate-slideInUp">
                    <div className="bg-red-100/90 rounded-xl p-6 mb-6 border-2 border-red-300">
                      <div className="text-center">
                        <XCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-red-800 mb-3">
                          Le temps s'est écoulé...
                        </h4>
                        <p className="text-red-700 font-elvish mb-4">
                          Le Dahu Blanc disparaît entre les arbres, mais vous permet de continuer votre chemin hors de la forêt.
                        </p>
                        
                        <div className="bg-white/80 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-700 font-elvish italic">
                            "Mes secrets ne sont pas pour tous... Peut-être une prochaine fois, mortels."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                {(isCompleted || isTimeUp) && (
                  <div className="text-center">
                    <button
                      onClick={() => setLocation("/alpine-station")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                      data-testid="button-continue-adventure"
                    >
                      Sortir de la forêt
                    </button>
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