import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Compass, Smartphone, TreePine } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function SecondCompass() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showNavInfo, setShowNavInfo] = useState(false);
  
  // Navigation states
  const [isWalking, setIsWalking] = useState(false);
  const [walkingTime] = useState(0);
  const [distance] = useState(920); // 920 meters
  const [hasArrived, setHasArrived] = useState(false);
  const [needleRotation, setNeedleRotation] = useState(45);
  
  // Screen shake effect
  const [isShaking, setIsShaking] = useState(false);
  
  const storyText = "Un arbre remarquable vous attend sur votre chemin, marqué d'une bande d'écorce blanche distinctive. Il se dresse comme un gardien millénaire, témoin des secrets du Dahu. Gardez les yeux ouverts - ce géant ne peut être manqué. Le Dahu a prévu le prochain défi près de ses racines ancestrales...";

  const shakeScreen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleStartWalking = () => {
    setIsWalking(true);
    
    // Show arrival after 2 seconds (no countdown)
    setTimeout(() => {
      setIsWalking(false);
      setHasArrived(true);
      shakeScreen();
    }, 2000);
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
          setTimeout(() => setShowNavInfo(true), 500);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }, 1000);
  }, [storyText]);

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
          onClick={() => setLocation("/first-enigma")}
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
        
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center flex-1">Navigation vers l'Arbre Gardien</h2>
        <div className="w-10"></div>
      </div>

      {/* Tree Guardian Content */}
      {showContent && (
        <div className="max-w-md mx-auto animate-fadeInUp">
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-6 border-4 border-amber-500/50">
            <div className="p-8">
              
              {/* Remarkable Tree Image and Description */}
              <div className="mb-8">
                <div className="bg-emerald-50/95 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-emerald-200/50">
                <div className="text-center mb-4">
                  <TreePine className="h-12 w-12 text-emerald-700 mx-auto mb-3" />
                  <h3 className="text-2xl font-elvish font-bold text-emerald-900 drop-shadow-sm">
                    L'Arbre Gardien
                  </h3>
                  <p className="text-sm text-emerald-700 italic font-elvish mt-2">Guide vers le prochain mystère</p>
                </div>
                
                {/* Tree SVG Illustration */}
                <div className="bg-white/90 rounded-xl p-4 mb-4 border-2 border-emerald-200">
                  <svg 
                    className="w-full h-48 mx-auto"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Tree trunk */}
                    <rect x="140" y="120" width="20" height="60" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
                    
                    {/* Main canopy */}
                    <ellipse cx="150" cy="100" rx="60" ry="40" fill="#228B22" stroke="#006400" strokeWidth="2"/>
                    
                    {/* Secondary canopy layers */}
                    <ellipse cx="150" cy="85" rx="45" ry="30" fill="#32CD32" stroke="#228B22" strokeWidth="1.5"/>
                    <ellipse cx="150" cy="75" rx="30" ry="20" fill="#90EE90" stroke="#32CD32" strokeWidth="1"/>
                    
                    {/* Distinctive branches */}
                    <path d="M110 110 Q120 105 130 115" stroke="#8B4513" strokeWidth="3" fill="none"/>
                    <path d="M190 110 Q180 105 170 115" stroke="#8B4513" strokeWidth="3" fill="none"/>
                    <path d="M150 70 Q140 60 145 50" stroke="#8B4513" strokeWidth="2" fill="none"/>
                    
                    {/* Unique marking - white bark stripe */}
                    <rect x="145" y="130" width="10" height="25" fill="#F5F5DC" stroke="#DDD" strokeWidth="1"/>
                    
                    {/* Roots */}
                    <path d="M140 180 Q130 185 125 180" stroke="#8B4513" strokeWidth="2" fill="none"/>
                    <path d="M160 180 Q170 185 175 180" stroke="#8B4513" strokeWidth="2" fill="none"/>
                    
                    {/* Ground */}
                    <path d="M50 180 Q150 185 250 180" stroke="#8B4513" strokeWidth="2" fill="none"/>
                    
                    {/* Mystical aura */}
                    <circle cx="150" cy="100" r="80" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
                  </svg>
                </div>
                
                <div className="text-center font-elvish text-emerald-800 leading-relaxed">
                  <p className="mb-3 italic min-h-[120px]">
                    {typewriterText}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Info */}
            {showNavInfo && (
              <div className="bg-amber-50/90 rounded-xl p-6 mb-6 border-2 border-amber-200/50 animate-slideInUp">
                <div className="text-center mb-4">
                  <Compass className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <h4 className="text-lg font-elvish font-bold text-amber-800">
                    Informations de Navigation
                  </h4>
                </div>
                
                <div className="space-y-3 text-amber-700 font-elvish">
                  <div className="flex justify-between items-center">
                    <span>Distance depuis point de départ:</span>
                    <span className="font-semibold">{isWalking ? `${distance}m` : '920m'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temps depuis point de départ:</span>
                    <span className="font-semibold">{isWalking ? `${walkingTime.toFixed(1)} min` : '~14 minutes'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Direction:</span>
                    <span className="font-semibold">Sud-Est</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reminder */}
            <div className="bg-red-500/20 rounded-xl p-4 border border-red-400/30 mb-6">
              <div className="flex items-start text-red-100 text-sm">
                <Smartphone className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">⚠️ Attention Important!</p>
                  <p className="italic">
                    Votre téléphone vibrera quand vous approcherez du point. 
                    Si vous ratez l'arbre gardien, vous raterez l'énigme et perdrez le mot indice!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!hasArrived && !isWalking && (
              <button
                onClick={handleStartWalking}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                data-testid="button-start-walking"
              >
                Se rendre au point énigme
              </button>
            )}

            {/* Walking Progress */}
            {isWalking && (
              <div className="text-center animate-slideInUp">
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30 mb-4">
                  <div className="text-blue-100 font-semibold">
                    🚶‍♂️ En route vers l'Arbre Gardien...
                  </div>
                  <div className="text-blue-200 text-sm mt-2">
                    Cherchez l'arbre à l'écorce blanche distinctive
                  </div>
                </div>
              </div>
            )}

            {/* Arrival Button */}
            {hasArrived && (
              <div className="animate-slideInUp">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-4 text-center">
                  <div className="text-green-100 font-semibold">
                    🌳 Vous voici devant l'Arbre Gardien !
                  </div>
                  <div className="text-green-200 text-sm mt-2">
                    Ses racines millénaires cachent le prochain mystère...
                  </div>
                </div>
                <button
                  onClick={() => setLocation("/second-enigma")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  data-testid="button-start-second-enigma"
                >
                  Je suis au bon endroit, commencer l'énigme
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
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
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .font-elvish {
          font-family: 'Kalam', cursive;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}