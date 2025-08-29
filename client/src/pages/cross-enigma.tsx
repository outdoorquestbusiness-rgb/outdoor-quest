import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Cross, Users, Key } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function CrossEnigma() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [player1Answer, setPlayer1Answer] = useState("");
  const [player2Answer, setPlayer2Answer] = useState("");
  const [showError, setShowError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNextStep, setShowNextStep] = useState(false);

  // Cross inscription details for the enigma
  const crossDetails = {
    year: "2024",
    altitude: "1863",
    commemorative: "EN MEMOIRE DES RANDONNEURS"
  };

  const handleSubmit = () => {
    // The password could be formed by combining the year and altitude: "20241863"
    const combinedAnswer = player1Answer + player2Answer;
    const correctAnswer = crossDetails.year + crossDetails.altitude; // "20241863"
    
    if (combinedAnswer === correctAnswer || 
        (player1Answer === crossDetails.year && player2Answer === crossDetails.altitude) ||
        (player1Answer === crossDetails.altitude && player2Answer === crossDetails.year)) {
      setIsCompleted(true);
      setShowError(false);
      setTimeout(() => {
        setShowNextStep(true);
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleContinue = () => {
    setLocation("/ar-dahu-discovery");
  };

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/journey-to-cross")}
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
      <div className="max-w-6xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Cross Enigma Header */}
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-gray-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Cross className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-gray-100 drop-shadow-sm">
                    L'Énigme de la Croix
                  </h3>
                  <p className="text-lg text-gray-300 italic font-elvish">Collaboration requise</p>
                </div>

                {/* Cross Illustration with Inscriptions */}
                <div className="bg-white/90 rounded-xl p-6 mb-6 text-center">
                  <div className="flex justify-center mb-4">
                    <svg width="250" height="300" viewBox="0 0 250 300" className="drop-shadow-lg">
                      {/* Cross structure */}
                      <rect x="120" y="50" width="12" height="180" fill="#6B7280" stroke="#374151" strokeWidth="2"/>
                      <rect x="80" y="110" width="90" height="12" fill="#6B7280" stroke="#374151" strokeWidth="2"/>
                      
                      {/* Cross base mount */}
                      <rect x="110" y="230" width="30" height="20" fill="#4B5563" stroke="#374151" strokeWidth="2"/>
                      
                      {/* Year inscription */}
                      <rect x="100" y="70" width="50" height="25" fill="#E5E7EB" stroke="#374151" strokeWidth="1" rx="3"/>
                      <text x="125" y="88" fontSize="14" fill="#374151" fontWeight="bold" textAnchor="middle">2024</text>
                      
                      {/* Altitude inscription */}
                      <rect x="95" y="140" width="60" height="25" fill="#E5E7EB" stroke="#374151" strokeWidth="1" rx="3"/>
                      <text x="125" y="158" fontSize="12" fill="#374151" fontWeight="bold" textAnchor="middle">1863m</text>
                      
                      {/* Commemorative text */}
                      <rect x="60" y="190" width="130" height="35" fill="#E5E7EB" stroke="#374151" strokeWidth="1" rx="3"/>
                      <text x="125" y="205" fontSize="8" fill="#374151" fontWeight="bold" textAnchor="middle">EN MEMOIRE</text>
                      <text x="125" y="218" fontSize="8" fill="#374151" fontWeight="bold" textAnchor="middle">DES RANDONNEURS</text>
                      
                      {/* Mystical elements */}
                      <circle cx="125" cy="120" r="40" fill="none" stroke="#FCD34D" strokeWidth="2" opacity="0.6">
                        <animate attributeName="r" values="35;45;35" dur="4s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                  
                  <p className="text-gray-800 font-elvish italic mb-4">
                    "Observez bien les inscriptions sur cette croix métallique. 
                    Elles recèlent le code qui ouvre la porte du mystère final."
                  </p>
                </div>

                {!isCompleted && (
                  <>
                    {/* Collaborative Challenge */}
                    <div className="bg-blue-100/90 rounded-xl p-6 mb-6 border-2 border-blue-300">
                      <div className="text-center mb-4">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="text-xl font-elvish font-bold text-blue-800">
                          Défi de Collaboration
                        </h4>
                        <p className="text-blue-700 italic">
                          Deux randonneurs doivent unir leurs forces pour décoder le mystère
                        </p>
                      </div>
                      
                      {/* Split Screen for Two Players */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Player 1 */}
                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                          <h5 className="text-green-800 font-elvish font-bold mb-3 text-center">
                            🥾 Joueur 1
                          </h5>
                          <p className="text-green-700 text-sm mb-3">
                            "Tu vois l'année gravée sur la croix. C'est un indice important..."
                          </p>
                          <input
                            type="text"
                            value={player1Answer}
                            onChange={(e) => setPlayer1Answer(e.target.value)}
                            placeholder="Votre partie du code..."
                            className="w-full px-3 py-2 border-2 border-green-400 rounded-lg font-elvish focus:border-green-600 focus:outline-none"
                            data-testid="input-player1"
                          />
                        </div>

                        {/* Player 2 */}
                        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                          <h5 className="text-orange-800 font-elvish font-bold mb-3 text-center">
                            🥾 Joueur 2
                          </h5>
                          <p className="text-orange-700 text-sm mb-3">
                            "Tu vois l'altitude inscrite. Elle fait partie du secret..."
                          </p>
                          <input
                            type="text"
                            value={player2Answer}
                            onChange={(e) => setPlayer2Answer(e.target.value)}
                            placeholder="Votre partie du code..."
                            className="w-full px-3 py-2 border-2 border-orange-400 rounded-lg font-elvish focus:border-orange-600 focus:outline-none"
                            data-testid="input-player2"
                          />
                        </div>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex justify-center space-x-4 mt-6">
                        <button
                          onClick={handleSubmit}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                          data-testid="button-validate"
                        >
                          Valider ma solution
                        </button>
                        <button
                          onClick={() => {
                            // Force continue to next step
                            setIsCompleted(true);
                            setTimeout(() => setShowNextStep(true), 1000);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                          data-testid="button-abandon"
                        >
                          Abandon
                        </button>
                        <button
                          onClick={() => {
                            // Show hint - pre-fill the answers
                            setPlayer1Answer('2024');
                            setPlayer2Answer('1863');
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                          data-testid="button-hint"
                        >
                          Indice
                        </button>
                      </div>

                      {/* Error Message */}
                      {showError && (
                        <div className="mt-4 bg-red-100 rounded-xl p-4 border-2 border-red-300 animate-slideInUp">
                          <p className="text-red-800 font-elvish font-bold text-center">
                            Essaye encore ! Regardez bien les inscriptions sur la croix...
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Success Message */}
                {isCompleted && (
                  <div className="bg-green-100/90 rounded-xl p-6 border-2 border-green-300 animate-slideInUp">
                    <div className="text-center">
                      <Key className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                        Code décrypté avec succès !
                      </h4>
                      <p className="text-green-700 font-elvish mb-4">
                        Vous avez uni vos forces pour révéler le secret : {crossDetails.year} + {crossDetails.altitude}
                        La croix frémit... quelque chose d'extraordinaire va se produire.
                      </p>

                      {showNextStep && (
                        <button
                          onClick={handleContinue}
                          className="bg-green-600 hover:bg-green-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors animate-slideInUp"
                          data-testid="button-continue-discovery"
                        >
                          Continuer la découverte
                        </button>
                      )}
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