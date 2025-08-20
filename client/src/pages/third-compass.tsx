import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Compass, Smartphone } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function ThirdCompass() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Navigation states
  const [isWalking, setIsWalking] = useState(false);
  const [walkingTime, setWalkingTime] = useState(0);
  const [distance, setDistance] = useState(400); // 400 meters
  const [hasArrived, setHasArrived] = useState(false);
  const [needleRotation, setNeedleRotation] = useState(45); // North-East
  
  // Screen shake effect
  const [isShaking, setIsShaking] = useState(false);
  
  const shakeScreen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleStartWalking = () => {
    setIsWalking(true);
    
    // Walking timer - 7 minutes (420 seconds) for demo, compressed to 7 seconds
    const interval = setInterval(() => {
      setWalkingTime(prev => {
        const newTime = prev + 0.1;
        return Math.round(newTime * 10) / 10; // Round to 1 decimal
      });
      
      setDistance(prev => {
        const newDistance = Math.max(0, prev - 57.1); // 400m / 7 seconds = 57.1m per iteration
        return newDistance;
      });
    }, 1000);

    // Needle movement animation
    const needleInterval = setInterval(() => {
      setNeedleRotation(prev => prev + (Math.random() - 0.5) * 10);
    }, 2000);

    // Stop after 7 seconds and show arrival
    setTimeout(() => {
      clearInterval(interval);
      clearInterval(needleInterval);
      setWalkingTime(0);
      setDistance(0);
      setIsWalking(false);
      setNeedleRotation(45); // Reset needle to NE
      setHasArrived(true);
      shakeScreen(); // Shake screen when arriving
    }, 7000);
  };

  return (
    <div 
      className={`min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat ${isShaking ? 'animate-shake' : ''}`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/second-enigma")}
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
            {/* Simplified Compass Display with Animation */}
            <div className="relative w-80 h-80 mx-auto mb-8 animate-compassAppear">
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
                  }}
                >
                  <div className="w-1 bg-red-600 h-32 origin-center rounded-full shadow-lg transform -translate-y-16"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Distance and Time Display */}
            <div className="bg-amber-50/90 rounded-xl p-6 mb-6 border-2 border-amber-200/50">
              <div className="text-center">
                <h3 className="text-xl font-elvish font-bold text-amber-800 mb-4">
                  Point d'énigme final
                </h3>
                <div className="grid grid-cols-2 gap-4 text-amber-700 font-elvish">
                  <div>
                    <p className="text-sm opacity-75">Distance</p>
                    <p className="text-2xl font-bold">{distance.toFixed(0)}m</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Temps estimé</p>
                    <p className="text-2xl font-bold">{isWalking ? `${walkingTime} min` : '7 min'}</p>
                  </div>
                </div>
              </div>
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

            {/* Walking Progress */}
            {isWalking && (
              <div className="text-center animate-slideInUp">
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30 mb-4">
                  <div className="text-blue-100 font-semibold">
                    🚶‍♂️ En route vers le point final...
                  </div>
                </div>
              </div>
            )}

            {/* Arrival Button */}
            {hasArrived && (
              <div className="animate-slideInUp">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-4 text-center">
                  <div className="text-green-100 font-semibold">
                    🎯 Vous êtes arrivé au point d'énigme final !
                  </div>
                </div>
                <button
                  onClick={() => setLocation("/third-enigma")}
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
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-compassAppear {
          animation: compassAppear 1.2s ease-out;
        }
        
        .font-elvish {
          font-family: 'Kalam', cursive;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}