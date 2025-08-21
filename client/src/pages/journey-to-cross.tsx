import { useState, useEffect } from "react";
import { ArrowLeft, Timer, MapPin, Navigation, Vibrate } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function JourneytoCross() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showWalkButton, setShowWalkButton] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [showArrivedButton, setShowArrivedButton] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const storyText = "Tu as percé les mystères de la table d'orientation. Maintenant, il est temps de gravir les derniers mètres vers le véritable sommet du Petit Môle. Là-haut, une croix métallique marque le point culminant, gardienne des secrets les plus anciens de la montagne. Le Dahu Blanc t'attend au sommet, prêt à révéler son ultime mystère.";

  const shakeScreen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleWalkToCross = () => {
    setIsWalking(true);
    
    // Simulate walking to cross, then vibrate after 2 seconds
    setTimeout(() => {
      setIsWalking(false);
      setHasArrived(true);
      shakeScreen();
      setTimeout(() => {
        setShowArrivedButton(true);
      }, 1000);
    }, 2000);
  };

  const handleArrivedAtCross = () => {
    setLocation("/cross-enigma");
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
            setShowWalkButton(true);
          }, 1000);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }, 1000);
  }, [storyText]);

  return (
    <div 
      className={`min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat transition-transform duration-300 ${
        isShaking ? 'animate-pulse' : ''
      }`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/step3-identify-mountain")}
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
            {/* Journey to Cross Card */}
            <div className="bg-purple-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-purple-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 text-purple-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-purple-100 drop-shadow-sm">
                    Direction — La Croix du Sommet
                  </h3>
                  <p className="text-lg text-purple-300 italic font-elvish">L'ascension finale</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <p className="text-lg leading-relaxed font-elvish text-purple-100 min-h-[120px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Walk to Cross Button */}
                {showWalkButton && !isWalking && !hasArrived && (
                  <div className="text-center animate-slideInUp">
                    <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30 mb-4">
                      <p className="text-purple-100 font-elvish text-sm mb-3">
                        Il ne reste que quelques mètres d'ascension pour atteindre la croix métallique.
                        L'air se raréfie, mais le sommet est à portée de main.
                      </p>
                    </div>
                    <button
                      onClick={handleWalkToCross}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                      data-testid="button-walk-to-cross"
                    >
                      <Navigation className="h-5 w-5 mr-2 inline-block" />
                      Aller à la croix
                    </button>
                  </div>
                )}

                {/* Walking Status */}
                {isWalking && (
                  <div className="text-center animate-slideInUp">
                    <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
                      <Navigation className="h-8 w-8 text-purple-300 mx-auto mb-3 animate-spin" />
                      <p className="text-purple-100 font-elvish">
                        Vous gravissez les derniers mètres vers la croix du sommet...
                        Le vent souffle fort à cette altitude.
                      </p>
                    </div>
                  </div>
                )}

                {/* Arrived Status */}
                {hasArrived && (
                  <div className="text-center animate-slideInUp">
                    <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-4">
                      <Vibrate className="h-8 w-8 text-green-300 mx-auto mb-3" />
                      <div className="text-green-100 font-semibold mb-2">
                        📱 L'app vibre... Vous avez atteint le sommet !
                      </div>
                      <p className="text-green-200 text-sm italic">
                        Devant vous se dresse la croix métallique du Petit Môle, 
                        point culminant à 1863 mètres d'altitude.
                      </p>
                    </div>

                    {/* Arrived Button */}
                    {showArrivedButton && (
                      <button
                        onClick={handleArrivedAtCross}
                        className="bg-green-600 hover:bg-green-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors animate-slideInUp"
                        data-testid="button-arrived-at-cross"
                      >
                        Je suis à la croix
                      </button>
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