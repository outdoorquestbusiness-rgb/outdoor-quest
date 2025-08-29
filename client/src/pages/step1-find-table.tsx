import { useState, useEffect } from "react";
import { ArrowLeft, Timer, MapPin, Navigation, Vibrate } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function Step1FindTable() {
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

  const storyText = "Tu as quitté l'ombre de la forêt. Devant toi, l'alpage s'ouvre et le sentier serpente vers le ciel. Là où les hommes ont dressé une pierre parlante, tourne-toi vers elle : elle montre du doigt les géants qui entourent le Petit Môle.";

  const shakeScreen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleWalkToTable = () => {
    setIsWalking(true);
    
    // Simulate walking to table, then vibrate after 2 seconds
    setTimeout(() => {
      setIsWalking(false);
      setHasArrived(true);
      shakeScreen();
      setTimeout(() => {
        setShowArrivedButton(true);
      }, 1000);
    }, 2000);
  };

  const handleArrivedAtTable = () => {
    setLocation("/step2-decipher-password");
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
      className={`min-h-screen p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 relative transition-transform duration-300 ${
        isShaking ? 'animate-pulse' : ''
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(30, 64, 175, 0.15) 0%, transparent 40%)
        `
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/alpine-station")}
          className="p-3 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gold-400"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-gold-300" />
        </button>
        
        <div className="flex items-center bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border-2 border-gold-500/50">
          <Timer className="h-4 w-4 text-gold-300 mr-2" />
          <span className="font-mono text-sm font-semibold text-gold-100">
            {chronometer.formattedTime}
          </span>
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Story Card - Step 1 */}
            <div className="bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-slate-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-4 border-gold-500/60 relative">
              <div className="absolute inset-0 rounded-2xl border-4 border-purple-500/30 pointer-events-none"></div>
              <div className="absolute inset-2 rounded-xl border-2 border-gold-400/40 pointer-events-none"></div>
              <div className="p-6 sm:p-8 relative">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 text-gold-400 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-majora font-bold mb-3 text-gold-300 drop-shadow-lg tracking-wider">
                    ◆ ÉTAPE I — TROUVER LA TABLE D'ORIENTATION ◆
                  </h3>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-slate-800/60 via-purple-800/60 to-slate-800/60 rounded-xl p-6 border-2 border-purple-500/40">
                    <p className="text-lg leading-relaxed font-majora text-purple-100 min-h-[100px] tracking-wide italic text-center text-shadow-lg">
                      {typewriterText}
                    </p>
                  </div>
                </div>

                {/* Walk to Table Button */}
                {showWalkButton && !isWalking && !hasArrived && (
                  <div className="text-center animate-slideInUp">
                    <button
                      onClick={handleWalkToTable}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                      data-testid="button-walk-to-table"
                    >
                      <Navigation className="h-5 w-5 mr-2 inline-block" />
                      Se rendre à la table d'orientation
                    </button>
                  </div>
                )}

                {/* Walking Status */}
                {isWalking && (
                  <div className="text-center animate-slideInUp">
                    <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                      <Navigation className="h-8 w-8 text-blue-300 mx-auto mb-3 animate-spin" />
                      <p className="text-blue-100 font-elvish">
                        Vous vous dirigez vers la table d'orientation...
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
                        📱 L'app vibre... Vous êtes au bon endroit !
                      </div>
                      <p className="text-green-200 text-sm italic">
                        Vous voici devant la table d'orientation sur la crête du Petit Môle.
                      </p>
                    </div>

                    {/* Arrived Button */}
                    {showArrivedButton && (
                      <button
                        onClick={handleArrivedAtTable}
                        className="bg-green-600 hover:bg-green-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors animate-slideInUp"
                        data-testid="button-arrived-at-table"
                      >
                        Je suis arrivé à la table d'orientation
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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Philosopher:ital,wght@0,400;0,700;1,400&display=swap');
        
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
        
        .font-majora {
          font-family: 'Cinzel', 'Philosopher', serif;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  );
}