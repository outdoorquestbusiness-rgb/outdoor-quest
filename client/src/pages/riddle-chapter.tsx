import { useState, useEffect } from "react";
import { ArrowLeft, Compass, Smartphone, Timer, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
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
    },
    {
      icon: <Timer className="h-5 w-5" />,
      text: "Préparez-vous à résoudre la mini-énigme avec célérité"
    }
  ];

  useEffect(() => {
    // Restore chronometer if it was already started
    const savedStartTime = localStorage.getItem('missionStartTime');
    if (savedStartTime && !chronometer.isRunning) {
      chronometer.start();
    }

    // Show background for 1 second, then start typewriter
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
      }, 40); // Faster typing for this page

      return () => clearInterval(typeInterval);
    }, 1000);

    return () => clearTimeout(showContentTimer);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className={`flex items-center justify-between mb-6 pt-4 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setLocation("/mission-intro")}
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
        
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Chapitre 1</h2>
        <div className="w-10"></div>
      </div>

      {/* Story Content */}
      {showContent && (
        <div className="max-w-3xl mx-auto animate-fadeInUp">
          {/* Story Card */}
          <div className="bg-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-emerald-200/50">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-3 text-emerald-900 drop-shadow-sm">
                  La Forêt des Mystères
                </h3>
                <p className="text-lg text-emerald-700 italic font-serif">Premier défi du dahu blanc</p>
              </div>
              
              {/* Typewriter Story Text */}
              <div className="relative mb-6">
                <p className="text-lg leading-relaxed font-serif text-emerald-900 min-h-[120px] tracking-wide">
                  {typewriterText}
                  {typewriterText.length < storyText.length && <span className="animate-pulse">|</span>}
                </p>
              </div>

              {/* Instructions */}
              {showInstructions && (
                <div className="animate-slideInUp">
                  <div className="bg-emerald-100/80 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-serif font-bold text-emerald-900 mb-4 text-center">
                      Les Règles de la Quête
                    </h4>
                    <div className="space-y-3">
                      {instructions.map((instruction, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="font-serif text-emerald-800 leading-relaxed">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {tips.map((tip, index) => (
                      <div key={index} className="bg-white/90 rounded-lg p-4 border-l-4 border-emerald-500">
                        <div className="flex items-start">
                          <div className="text-emerald-600 mr-3 mt-1">
                            {tip.icon}
                          </div>
                          <p className="text-sm font-serif text-slate-700 leading-relaxed">{tip.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compass Button */}
          {showCompassButton && (
            <div className="animate-slideInUp text-center">
              <button
                onClick={() => setLocation("/mini-enigma/1")}
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 text-xl font-serif relative overflow-hidden"
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
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&display=swap');
        
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
        
        .font-serif {
          font-family: 'Merriweather', serif;
        }
      `}</style>
    </div>
  );
}