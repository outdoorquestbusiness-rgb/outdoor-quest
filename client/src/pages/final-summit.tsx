import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Mountain, Cross } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function FinalCongratulations() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCross, setShowCross] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const storyText = "Tu as percé les secrets de la table d'orientation. Il ne reste plus qu'une étape pour accomplir ta quête : te rendre au véritable sommet du Petit Môle, là où se dresse la croix. C'est ici, au point culminant, que le Dahu Blanc révèle son plus grand mystère. Les vents de montagne portent des échos anciens... La croix t'attend, gardienne des secrets éternels de ces sommets.";

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
            setShowCross(true);
            setTimeout(() => {
              setShowFinalMessage(true);
            }, 2000);
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
            {/* Final Summit Story */}
            <div className="bg-indigo-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-indigo-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Cross className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-indigo-100 drop-shadow-sm">
                    L'Étape Finale — La Croix du Sommet
                  </h3>
                  <p className="text-lg text-indigo-300 italic font-elvish">Le secret ultime du Dahu Blanc</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <p className="text-lg leading-relaxed font-elvish text-indigo-100 min-h-[150px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Summit Cross Illustration */}
                {showCross && (
                  <div className="animate-slideInUp mb-6">
                    <div className="bg-white/90 rounded-xl p-6 text-center border-2 border-indigo-300">
                      {/* SVG Summit Cross */}
                      <div className="flex justify-center mb-4">
                        <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-lg">
                          {/* Mountain peak */}
                          <polygon points="100,20 160,120 40,120" fill="#8B7D6B" stroke="#654321" strokeWidth="2"/>
                          <polygon points="100,20 140,80 60,80" fill="#A0958B" stroke="#654321" strokeWidth="1"/>
                          
                          {/* Cross base */}
                          <rect x="95" y="110" width="10" height="60" fill="#654321" stroke="#4A4A4A" strokeWidth="2"/>
                          
                          {/* Cross horizontal beam */}
                          <rect x="80" y="125" width="40" height="8" fill="#654321" stroke="#4A4A4A" strokeWidth="2"/>
                          
                          {/* Cross shadow */}
                          <rect x="105" y="115" width="3" height="55" fill="#4A4A4A" opacity="0.6"/>
                          <rect x="83" y="127" width="35" height="3" fill="#4A4A4A" opacity="0.6"/>
                          
                          {/* Mountain details */}
                          <path d="M 50 120 Q 100 100 150 120" stroke="#9B8B7A" strokeWidth="2" fill="none"/>
                          <circle cx="75" cy="105" r="2" fill="#7A6B5A"/>
                          <circle cx="125" cy="108" r="1.5" fill="#7A6B5A"/>
                          
                          {/* Mystical aura around cross */}
                          <circle cx="100" cy="135" r="25" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.7">
                            <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                          </circle>
                          
                          {/* Ground/summit */}
                          <ellipse cx="100" cy="170" rx="80" ry="8" fill="#8B7D6B" opacity="0.8"/>
                          
                          {/* Text */}
                          <text x="100" y="200" fontSize="14" fill="#654321" fontWeight="bold" textAnchor="middle" fontFamily="serif">
                            Croix du Petit Môle
                          </text>
                          <text x="100" y="220" fontSize="12" fill="#7A6B5A" textAnchor="middle" fontFamily="serif">
                            1863m d'altitude
                          </text>
                        </svg>
                      </div>
                      
                      <p className="text-indigo-800 font-elvish text-lg italic mb-4">
                        Au sommet du Petit Môle, la croix métallique se dresse fièrement, 
                        témoin silencieux des randonneurs qui ont gravi ces pentes escarpées.
                      </p>
                      
                      <div className="bg-indigo-100 rounded-lg p-4 border border-indigo-300">
                        <p className="text-indigo-900 font-elvish font-bold text-sm">
                          📍 Point culminant : 1863 mètres<br/>
                          🏔️ Vue panoramique sur les Alpes<br/>
                          ⛪ Croix de montagne traditionnelle
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Message */}
                {showFinalMessage && (
                  <div className="animate-slideInUp">
                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border-2 border-amber-400">
                      <div className="text-center">
                        <h4 className="text-xl font-elvish font-bold text-amber-800 mb-4">
                          🏆 Félicitations ! Tu as accompli la quête !
                        </h4>
                        <p className="text-amber-700 font-elvish mb-4 italic">
                          "Au sommet, sous la croix ancestrale, le Dahu Blanc t'observe avec respect. 
                          Tu as prouvé ta détermination et ta sagesse. Le véritable trésor était le voyage lui-même : 
                          les énigmes résolues, les paysages découverts, et les secrets des montagnes révélés."
                        </p>
                        
                        <div className="bg-white/80 rounded-lg p-4 border border-amber-300 mb-4">
                          <p className="text-amber-900 font-elvish font-bold">
                            🌟 Temps total : {chronometer.formattedTime}<br/>
                            📍 Sommet atteint : Croix du Petit Môle (1863m)<br/>
                            🦌 Légende découverte : Le Dahu Blanc
                          </p>
                        </div>
                        
                        <button
                          onClick={() => setLocation("/missions")}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-return-missions"
                        >
                          Retour aux missions
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