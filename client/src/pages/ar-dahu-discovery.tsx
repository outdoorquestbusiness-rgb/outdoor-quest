import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Camera, Eye, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";
import dahuBlancImage from "@assets/dahu_blanc_1755704186917.png";

export default function ArDahuDiscovery() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [showRevelation, setShowRevelation] = useState(false);
  const [showARButton, setShowARButton] = useState(false);
  const [arActivated, setArActivated] = useState(false);
  const [showDahu, setShowDahu] = useState(false);
  const [showFinalDirection, setShowFinalDirection] = useState(false);

  const handleARActivation = () => {
    setArActivated(true);
    // Simulate AR camera activation
    setTimeout(() => {
      setShowDahu(true);
      setTimeout(() => {
        setShowFinalDirection(true);
      }, 3000);
    }, 2000);
  };

  const handleContinue = () => {
    setLocation("/final-congratulations");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setShowRevelation(true);
        setTimeout(() => {
          setShowARButton(true);
        }, 2000);
      }, 1500);
    }, 1000);
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
          onClick={() => setLocation("/cross-enigma")}
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
            {/* Revelation Card */}
            <div className="bg-indigo-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-indigo-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Eye className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-indigo-100 drop-shadow-sm">
                    La Révélation
                  </h3>
                  <p className="text-lg text-indigo-300 italic font-elvish">Le secret de la croix</p>
                </div>

                {/* Initial Revelation */}
                <div className="bg-yellow-100/90 rounded-xl p-6 mb-6 border-2 border-yellow-400">
                  <p className="text-yellow-900 font-elvish text-lg text-center mb-4">
                    "Vous avez percé le code de la croix, mais attendez..."
                  </p>
                  <p className="text-yellow-800 font-elvish italic text-center">
                    La croix frémit et murmure un dernier secret : 
                    <strong> "Je ne suis pas le véritable point culminant du Môle..."</strong>
                  </p>
                </div>

                {/* Revelation Text */}
                {showRevelation && (
                  <div className="animate-slideInUp bg-white/90 rounded-xl p-6 mb-6">
                    <p className="text-gray-800 font-elvish text-lg text-center mb-4">
                      "Seuls ceux qui sont capables de voir le Dahu Blanc peuvent être guidés 
                      vers le véritable sommet mystique du Mont Môle."
                    </p>
                    <div className="bg-purple-100 rounded-lg p-4 border border-purple-300">
                      <p className="text-purple-900 font-elvish font-bold text-center text-sm">
                        🔮 Le Dahu Blanc apparaît uniquement à travers la vision augmentée<br/>
                        📱 Pointez votre caméra vers la croix pour révéler sa présence
                      </p>
                    </div>
                  </div>
                )}

                {/* AR Activation Button */}
                {showARButton && !arActivated && (
                  <div className="text-center animate-slideInUp">
                    <button
                      onClick={handleARActivation}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-elvish font-bold py-4 px-8 rounded-xl shadow-lg transition-colors transform hover:scale-105"
                      data-testid="button-activate-ar"
                    >
                      <Camera className="h-6 w-6 mr-3 inline-block" />
                      Passer en Réalité Augmentée
                    </button>
                  </div>
                )}

                {/* AR Camera Simulation */}
                {arActivated && !showDahu && (
                  <div className="animate-slideInUp">
                    <div className="bg-black rounded-xl p-6 border-4 border-blue-400 relative">
                      <div className="text-center text-green-400 font-mono mb-4">
                        📱 CAMERA AR ACTIVE
                      </div>
                      <div className="bg-gray-800 rounded-lg h-48 flex items-center justify-center">
                        <div className="text-green-400 font-mono animate-pulse">
                          🎯 Recherche du Dahu Blanc...
                        </div>
                      </div>
                      <div className="text-center text-green-400 font-mono text-sm mt-2">
                        Pointez vers la croix...
                      </div>
                    </div>
                  </div>
                )}

                {/* Dahu Blanc Appears in AR */}
                {showDahu && (
                  <div className="animate-slideInUp">
                    <div className="bg-black rounded-xl p-6 border-4 border-gold-400 relative">
                      <div className="text-center text-gold-400 font-mono mb-4">
                        ✨ DAHU BLANC DETECTÉ ✨
                      </div>
                      <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg p-4 relative">
                        {/* AR Dahu Blanc */}
                        <div className="text-center">
                          <div className="relative mx-auto max-w-xs">
                            <img 
                              src={dahuBlancImage}
                              alt="Le Dahu Blanc en réalité augmentée"
                              className="w-full h-auto rounded-lg shadow-xl border-4 border-gold-300"
                              style={{
                                filter: 'drop-shadow(0 0 20px #FFD700) brightness(1.2)',
                                animation: 'glow 2s ease-in-out infinite alternate'
                              }}
                            />
                            {/* AR Direction Arrow */}
                            <div className="absolute -top-4 -right-4 text-6xl animate-bounce">
                              ➡️
                            </div>
                            <div className="absolute -top-8 -right-8 bg-gold-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                              Direction
                            </div>
                          </div>
                          <p className="text-gold-300 font-elvish text-lg mt-4 italic">
                            "Le Dahu Blanc pointe fièrement vers la direction du banc..."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Direction */}
                {showFinalDirection && (
                  <div className="animate-slideInUp mt-6">
                    <div className="bg-gold-100/90 rounded-xl p-6 border-2 border-gold-400">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gold-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-gold-800 mb-3">
                          Le Véritable Sommet Révélé !
                        </h4>
                        <p className="text-gold-700 font-elvish mb-4">
                          Le Dahu Blanc vous indique la direction du banc panoramique, 
                          le véritable point culminant spirituel du Mont Môle. 
                          C'est là que les anciens randonneurs trouvaient la paix.
                        </p>
                        
                        <button
                          onClick={handleContinue}
                          className="bg-gold-600 hover:bg-gold-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-final-congratulations"
                        >
                          Suivre le Dahu vers le banc
                        </button>
                      </div>
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
        
        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 20px #FFD700) brightness(1.2);
          }
          100% {
            filter: drop-shadow(0 0 30px #FFA500) brightness(1.4);
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
        
        .border-gold-400 {
          border-color: #FBBF24;
        }
        
        .bg-gold-100 {
          background-color: #FEF3C7;
        }
        
        .text-gold-300 {
          color: #FCD34D;
        }
        
        .text-gold-400 {
          color: #FBBF24;
        }
        
        .text-gold-600 {
          color: #D97706;
        }
        
        .text-gold-700 {
          color: #B45309;
        }
        
        .text-gold-800 {
          color: #92400E;
        }
        
        .bg-gold-400 {
          background-color: #FBBF24;
        }
        
        .bg-gold-600 {
          background-color: #D97706;
        }
        
        .bg-gold-700 {
          background-color: #B45309;
        }
      `}</style>
    </div>
  );
}