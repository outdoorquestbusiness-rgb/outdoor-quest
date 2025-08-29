import { useState, useEffect } from "react";
import { ArrowLeft, Navigation, Timer, Smartphone } from "lucide-react";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function CompassNavigation() {
  const [, setLocation] = useLocation();
  const [walkingTime, setWalkingTime] = useState(15);
  const [distance, setDistance] = useState(950);
  const [isWalking, setIsWalking] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [needleRotation, setNeedleRotation] = useState(45); // 45 degrees = North-East // 45 degrees for NE
  const chronometer = useChronometer();

  // Function to simulate screen shake like alarm clock
  const shakeScreen = () => {
    const body = document.body;
    body.style.animation = 'shake 0.6s ease-in-out';
    setTimeout(() => {
      body.style.animation = '';
    }, 600);
    
    // Also try native vibration if available
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  };

  useEffect(() => {
    // Restore chronometer if it was already started
    const savedStartTime = localStorage.getItem('missionStartTime');
    if (savedStartTime && !chronometer.isRunning) {
      chronometer.start();
    }
  }, [chronometer]);

  const handleStartWalking = () => {
    setIsWalking(true);
    
    // Slightly move the needle during walking
    const needleInterval = setInterval(() => {
      setNeedleRotation(prev => prev + (Math.random() - 0.5) * 4); // Small random movements
    }, 500);
    
    // Animate countdown over 10 seconds
    const interval = setInterval(() => {
      setWalkingTime(prev => {
        const newTime = Math.max(0, prev - 1.5); // 15 minutes / 10 seconds = 1.5 per iteration
        return Math.round(newTime * 10) / 10; // Round to 1 decimal
      });
      
      setDistance(prev => {
        const newDistance = Math.max(0, prev - 95); // 950m / 10 seconds = 95m per iteration
        return newDistance;
      });
    }, 1000);

    // Stop after 10 seconds and show arrival
    setTimeout(() => {
      clearInterval(interval);
      clearInterval(needleInterval);
      setWalkingTime(0);
      setDistance(0);
      setIsWalking(false);
      setNeedleRotation(45); // Reset needle to NE
      setHasArrived(true);
      shakeScreen(); // Shake screen when arriving
    }, 10000);
  };

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/forest-challenge")}
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
        
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center flex-1">Navigation jusqu'au prochain point d'énigme</h2>
        <div className="w-10"></div>
      </div>

      {/* Compass Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-6 border-4 border-amber-500/50">
          <div className="p-8">
            {/* Simple navigation message */}
            <div className="text-center mb-8">
              <div className="bg-amber-50/90 rounded-xl p-6 border-2 border-amber-200/50">
                <h3 className="text-2xl font-elvish font-bold text-amber-800 mb-4">
                  Navigation vers le prochain point
                </h3>
                <p className="text-amber-700 font-elvish text-lg">
                  Suivez le sentier jusqu'au prochain point d'énigme
                </p>
              </div>
            </div>

            {/* Distance Display */}
            <div className="text-center space-y-4 mb-8">
              <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-400/30">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-amber-100 font-semibold">Distance jusqu'au point de repère</span>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white font-mono">{distance}</div>
                  <div className="text-amber-300 text-lg">mètres</div>
                </div>
              </div>
              
              {/* Walking Status */}
              {isWalking && (
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30 animate-pulse">
                  <div className="flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-100 font-semibold">En route vers le point d'énigme...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reminder */}
            <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400/30 mb-6">
              <div className="flex items-center text-emerald-100 text-sm">
                <Smartphone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="italic">Une vibration vous alertera quand vous approcherez de la zone mystérieuse</span>
              </div>
            </div>

            {/* Action Button */}
            {!hasArrived && !isWalking && (
              <button
                onClick={handleStartWalking}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                data-testid="button-start-walking"
              >
                Se rendre au point de la mini-énigme
              </button>
            )}

            {/* Arrival Button */}
            {hasArrived && (
              <div className="animate-slideInUp">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-4 text-center">
                  <div className="text-green-100 font-semibold">
                    🎯 Vous êtes arrivé au point d'énigme !
                  </div>
                </div>
                <button
                  onClick={() => setLocation("/first-enigma")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  data-testid="button-start-enigma"
                >
                  Je suis au bon endroit, commencer l'énigme
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        @keyframes compassAppear {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.7) rotate(-90deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .animate-compassAppear {
          animation: compassAppear 1.2s ease-out;
        }
      `}</style>
    </div>
  );
}