import { useState, useEffect } from "react";
import { ArrowLeft, Compass, Smartphone, Timer, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import { createIntriguingSound } from "@/utils/audio";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function RiddleChapter() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCompassButton, setShowCompassButton] = useState(false);
  const chronometer = useChronometer();

  const storyText = "Aventurez-vous dans la forêt enchantée du Môle. Entre les grands sapins séculaires, tout semble identique à première vue, mais le dahu blanc y a semé ses premiers mystères. Les arbres murmurent des secrets anciens, les racines entrelacées bloquent parfois votre chemin... et parfois, une mystérieuse vibration dans votre poche vous avertit qu'une énigme est proche.";

  const instructions = [
    "Trois mini-énigmes vous attendent dans cette forêt mystérieuse.",
    "Résolvez chaque défi en temps imparti pour gagner un indice précieux.",
    "Ces indices, je le pressens, vous serviront dans votre quête à venir."
  ];

  const tips = [
    {
      icon: <Compass className="h-5 w-5" />,
      text: "Utilisez la boussole pour vous guider vers le prochain point d'énigme"
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      text: "Gardez l'œil alerte et non rivé sur votre écran - la nature recèle bien des surprises"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Une fois dans la zone, votre téléphone vibrera. Soyez à l'affût"
    }
  ];

  useEffect(() => {
    // Restore chronometer if it was already started
    const savedStartTime = localStorage.getItem('missionStartTime');
    if (savedStartTime && !chronometer.isRunning) {
      chronometer.start();
    }

    // No sound - removed as requested
    const showContentTimer = setTimeout(() => {
      setShowContent(true);
      
      // Start typewriter animation
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < storyText.length) {
          setTypewriterText(storyText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Show instructions after story is complete
          setTimeout(() => {
            setShowInstructions(true);
            setTimeout(() => setShowCompassButton(true), 1000);
          }, 500);
        }
      }, 30); // Fast handwritten typing speed

      return () => clearInterval(typeInterval);
    }, 1000);

    return () => clearTimeout(showContentTimer);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-green-900 via-emerald-800 to-stone-800 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(101, 163, 13, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(87, 83, 78, 0.15) 0%, transparent 40%)
        `
      }}
    >
      {/* Header with Timer */}
      <div className={`flex items-center justify-between mb-6 pt-4 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setLocation("/mission-intro")}
          className="p-3 rounded-lg bg-gradient-to-r from-emerald-700 to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-600"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-amber-200" />
        </button>
        
        <div className="flex items-center bg-gradient-to-r from-stone-800/90 to-emerald-900/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border-2 border-amber-600/50">
          <Timer className="h-4 w-4 text-amber-200 mr-2" />
          <span className="font-mono text-sm font-semibold text-amber-100">
            {chronometer.formattedTime}
          </span>
        </div>
        
        <div className="w-10"></div>
        <div className="w-10"></div>
      </div>

      {/* Story Content */}
      {showContent && (
        <div className="max-w-3xl mx-auto animate-fadeInUp">
          {/* Story Card */}
          <div className="bg-gradient-to-br from-emerald-800/95 via-green-800/95 to-stone-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-4 border-amber-600/60 relative">
            <div className="absolute inset-0 rounded-2xl border-4 border-green-600/30 pointer-events-none"></div>
            <div className="absolute inset-2 rounded-xl border-2 border-amber-500/40 pointer-events-none"></div>
            <div className="p-6 sm:p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-forest font-bold mb-3 text-amber-300 drop-shadow-lg tracking-wider">
                  ◈ LA FORÊT DES MYSTÈRES ◈
                </h3>
                <p className="text-lg text-green-200 italic font-forest tracking-wide">Premier défi du dahu blanc</p>
              </div>
              
              {/* Typewriter Story Text */}
              <div className="relative mb-6">
                <p className="text-lg leading-relaxed font-elvish text-emerald-900 min-h-[120px] tracking-wide italic">
                  {typewriterText}
                </p>
              </div>

              {/* Instructions */}
              {showInstructions && (
                <div className="animate-slideInUp">
                  <div className="bg-emerald-100/80 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-elvish font-bold text-emerald-900 mb-4 text-center">
                      Les Règles de la Quête
                    </h4>
                    <div className="space-y-3">
                      {instructions.map((instruction, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="font-elvish text-emerald-800 leading-relaxed">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips - vertical layout */}
                  <div className="space-y-3 mb-4">
                    {tips.map((tip, index) => (
                      <div key={index} className="bg-white/90 rounded-lg p-4 border-l-4 border-emerald-500">
                        <div className="flex items-start">
                          <div className="text-emerald-600 mr-3 mt-1">
                            {tip.icon}
                          </div>
                          <p className="text-sm font-elvish text-slate-700 leading-relaxed">{tip.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Special tip above button */}
                  <div className="bg-amber-100/90 rounded-lg p-4 border-l-4 border-amber-500 mb-6">
                    <div className="flex items-start">
                      <div className="text-amber-600 mr-3 mt-1">
                        <Timer className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-elvish text-amber-800 leading-relaxed font-semibold">
                        Jusqu'à votre arrivée au point, vous pouvez juste profiter de la randonnée !
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compass Button */}
          {showCompassButton && (
            <div className="animate-slideInUp text-center">
              <button
                onClick={() => setLocation("/compass-navigation")}
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 text-xl font-elvish relative overflow-hidden"
                data-testid="button-compass"
              >
                <div className="flex items-center justify-center">
                  <Compass className="h-8 w-8 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Suivre la boussole</span>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .font-forest {
          font-family: 'Uncial Antiqua', 'MedievalSharp', serif;
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        
        .text-shadow-forest {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}