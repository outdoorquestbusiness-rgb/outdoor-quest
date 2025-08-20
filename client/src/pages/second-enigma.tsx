import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Music, Check, X, Volume2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

interface Question {
  id: number;
  audioDescription: string;
  options: string[];
  correct: number;
  genre: string;
}

export default function SecondEnigma() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Game states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const storyText = "L'Arbre Gardien se dresse devant vous, ses branches millénaires murmurant dans le vent. Soudain, une voix mystérieuse résonne dans votre esprit : 'Mortel qui cherche les secrets du Dahu, je suis le serviteur de cette créature légendaire. Pour poursuivre votre quête, vous devez prouver votre sagesse et votre connexion avec les harmonies de ce monde. Écoutez attentivement ces mélodies... et révélez-moi leur origine.'";

  const questions: Question[] = [
    {
      id: 1,
      audioDescription: "Une mélodie épique et mystérieuse s'élève, évoquant des terres lointaines et des aventures héroïques...",
      options: ["Le Seigneur des Anneaux", "Game of Thrones", "Harry Potter", "Star Wars"],
      correct: 0,
      genre: "film"
    },
    {
      id: 2,
      audioDescription: "Un air joyeux et familier retentit, rappelant les aventures d'un ogre vert et de ses compagnons...",
      options: ["Shrek", "Madagascar", "L'Âge de Glace", "Monstres et Cie"],
      correct: 0,
      genre: "animation"
    },
    {
      id: 3,
      audioDescription: "Une mélodie inquiétante et angoissante surgit, évoquant les profondeurs océaniques et un danger imminent...",
      options: ["Les Dents de la Mer", "Titanic", "Aquaman", "Pirates des Caraïbes"],
      correct: 0,
      genre: "film"
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (newAnswers[index] === q.correct) {
          correctCount++;
        }
      });
      
      setScore(correctCount);
      setIsCompleted(true);
      setTimeout(() => setShowResults(true), 1000);
    }
  };

  const isSuccess = score >= 2;

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
            setShowQuestions(true);
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
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/second-compass")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <Timer className="h-4 w-4 text-forest mr-2" />
          <span className="font-mono text-sm font-semibold text-slate-700">
            {chronometer.formattedTime}
          </span>
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
                    Le Test de l'Arbre Gardien
                  </h3>
                  <p className="text-lg text-emerald-700 italic font-elvish">Blind Test Musical</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-6">
                  <p className="text-lg leading-relaxed font-elvish text-emerald-900 min-h-[120px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Music Test */}
                {showQuestions && !isCompleted && (
                  <div className="animate-slideInUp">
                    <div className="bg-white/90 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-elvish font-bold text-emerald-900 mb-4 text-center">
                        Question {currentQuestion + 1} / {questions.length}
                      </h4>
                      
                      {/* Audio Description */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-2 border-blue-200">
                        <div className="flex items-center mb-3">
                          <Volume2 className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-bold text-blue-800">Écoutez attentivement...</span>
                        </div>
                        <p className="text-blue-700 font-elvish italic">
                          {questions[currentQuestion].audioDescription}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className="p-4 bg-emerald-100 hover:bg-emerald-200 rounded-lg border-2 border-emerald-300 hover:border-emerald-500 transition-colors text-emerald-800 font-elvish font-semibold"
                            data-testid={`option-${index}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="mt-6">
                        <div className="flex justify-center space-x-2">
                          {questions.map((_, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${
                                index <= currentQuestion ? 'bg-emerald-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {isCompleted && showResults && (
                  <div className="animate-slideInUp">
                    {/* Success Message */}
                    {isSuccess && (
                      <div className="bg-green-100/90 rounded-xl p-6 mb-6 border-2 border-green-300">
                        <div className="text-center">
                          <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
                          <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                            L'Arbre approuve votre sagesse !
                          </h4>
                          <p className="text-green-700 font-elvish mb-4">
                            Vous avez réussi {score}/3 questions. Votre connexion avec les harmonies de ce monde est authentique.
                          </p>
                          
                          <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-400">
                            <h5 className="font-bold text-amber-800 mb-2">Indice précieux révélé :</h5>
                            <p className="text-lg font-elvish font-bold text-amber-900">MUSIQUE</p>
                            <p className="text-sm text-amber-700 italic mt-2">
                              L'Arbre murmure : "Les harmonies guideront votre chemin vers le Dahu..."
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Failure Message */}
                    {!isSuccess && (
                      <div className="bg-red-100/90 rounded-xl p-6 mb-6 border-2 border-red-300">
                        <div className="text-center">
                          <X className="h-8 w-8 text-red-600 mx-auto mb-3" />
                          <h4 className="text-xl font-elvish font-bold text-red-800 mb-3">
                            L'Arbre reste silencieux...
                          </h4>
                          <p className="text-red-700 font-elvish mb-4">
                            Vous n'avez réussi que {score}/3 questions. Les harmonies de ce monde vous échappent encore.
                          </p>
                          
                          {/* Show correct answers */}
                          <div className="bg-white/80 rounded-lg p-4 mb-4">
                            <h5 className="font-bold text-gray-800 mb-3">Les bonnes réponses étaient :</h5>
                            <div className="space-y-2 text-sm">
                              {questions.map((question, index) => (
                                <div key={question.id} className="flex justify-between items-center">
                                  <span className="text-gray-600">Question {index + 1}:</span>
                                  <span className={`font-semibold ${answers[index] === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                                    {question.options[question.correct]}
                                    {answers[index] === question.correct && ' ✓'}
                                    {answers[index] !== question.correct && ' ✗'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-700 font-elvish italic">
                              "Les mélodies portent en elles les secrets du cosmos. 
                              Seuls ceux qui savent les reconnaître peuvent poursuivre leur quête..."
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Continue Button */}
                    <div className="text-center">
                      <button
                        onClick={() => setLocation("/third-compass")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                        data-testid="button-next-enigma"
                      >
                        Passer à la prochaine énigme
                      </button>
                    </div>
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