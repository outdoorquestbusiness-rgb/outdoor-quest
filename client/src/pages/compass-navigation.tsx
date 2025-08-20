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
  const [needleRotation, setNeedleRotation] = useState(45); // 45 degrees for NE
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
        
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Navigation</h2>
        <div className="w-10"></div>
      </div>

      {/* Compass Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-6 border-4 border-amber-500/50">
          <div className="p-8">
            {/* Simplified Compass Display */}
            <div className="relative w-80 h-80 mx-auto mb-8">
              {/* Outer Ring - simplified */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl">
                {/* Cardinal Directions Only */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-slate-800">N</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-slate-800">S</div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl font-bold text-slate-800">W</div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl font-bold text-slate-800">E</div>
              </div>
              
              {/* Large Compass Needle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative transition-transform duration-500 ease-out"
                  style={{ 
                    transform: `rotate(${needleRotation}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  {/* Large North Pointer (Red) */}
                  <div className="absolute top-0 left-1/2 w-0 h-0 transform -translate-x-1/2 border-l-4 border-r-4 border-b-20 border-transparent border-b-red-600"></div>
                  <div className="absolute top-5 left-1/2 w-2 h-20 transform -translate-x-1/2 bg-gradient-to-b from-red-600 to-red-400 rounded-full shadow-lg"></div>
                  
                  {/* Large South Pointer (White) */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0 transform -translate-x-1/2 rotate-180 border-l-4 border-r-4 border-b-20 border-transparent border-b-white"></div>
                  <div className="absolute bottom-5 left-1/2 w-2 h-20 transform -translate-x-1/2 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-lg border-2 border-gray-400"></div>
                </div>
              </div>
              
              {/* Center Pivot - larger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full shadow-lg border-2 border-slate-400"></div>
              </div>
            </div>

            {/* Navigation Info */}
            <div className="text-center space-y-4 mb-8">
              <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-400/30">
                <div className="flex items-center justify-center mb-2">
                  <Navigation className="h-5 w-5 text-amber-400 mr-2" />
                  <span className="text-amber-100 font-semibold">Direction: Nord-Est</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{walkingTime}</div>
                    <div className="text-amber-300 text-sm">minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{distance}</div>
                    <div className="text-amber-300 text-sm">mètres</div>
                  </div>
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
                  onClick={() => setLocation("/mini-enigma/1")}
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
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}