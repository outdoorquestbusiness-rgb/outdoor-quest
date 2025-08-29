import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Mountain } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function AlpineStation() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showDahuPhoto, setShowDahuPhoto] = useState(false);
  const [showClues, setShowClues] = useState(false);

  const storyText = "Vous émergez enfin de la forêt mystérieuse, vos pas vous menant vers les hauteurs du Mont Môle. Devant vous se dresse la station d'alpage du Petit Môle, battue par les vents de montagne. Cette station offre des vues magnifiques sur les sommets environnants, un panorama à couper le souffle sur les Alpes françaises et suisses. L'air pur de la montagne semble porter des murmures anciens... Quelque part dans ces hauteurs, le Dahu Blanc continue sa garde éternelle, invisible mais présent. Les légendes parlent d'une créature qui ne se révèle qu'à ceux qui savent vraiment regarder...";

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
            setShowDahuPhoto(true);
            setTimeout(() => {
              setShowClues(true);
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/third-enigma")}
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
            {/* Story Card */}
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-slate-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Mountain className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-slate-100 drop-shadow-sm">
                    La Station d'Alpage du Petit Môle
                  </h3>
                  <p className="text-lg text-slate-300 italic font-elvish">Les hauteurs mystérieuses</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <p className="text-lg leading-relaxed font-elvish text-slate-200 min-h-[150px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Mountain Atmosphere */}
                {showDahuPhoto && (
                  <div className="animate-slideInUp mb-6">
                    <div className="bg-white/80 rounded-xl p-6 text-center border-2 border-blue-300">
                      <p className="text-blue-900 font-elvish italic text-lg mb-4">
                        Le vent souffle à travers les herbes d'alpage... Un silence mystérieux plane sur les hauteurs.
                      </p>
                      <p className="text-blue-800 font-elvish">
                        Vous ressentez une présence invisible, comme si des yeux anciens vous observaient depuis les crêtes.
                        Les légendes prennent vie dans ces lieux sauvages et préservés.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mountain Description and Continue */}
                {showClues && (
                  <div className="animate-slideInUp">
                    <div className="bg-white/90 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-elvish font-bold text-blue-900 mb-4 text-center">
                        Le Petit Môle
                      </h4>
                      <p className="text-blue-800 font-elvish text-center mb-4 italic">
                        "Un sommet privilégié offrant un panorama exceptionnel sur les Alpes..."
                      </p>
                      
                      <div className="bg-slate-100 rounded-lg p-4 text-center border-2 border-slate-300">
                        <p className="text-slate-800 font-elvish mb-3">
                          Altitude : 1863 mètres
                        </p>
                        <p className="text-slate-700 text-sm">
                          Vue sur le Mont Blanc, le Lac Léman, les Préalpes et le Jura.
                          Point de départ de nombreuses randonnées vers les sommets du Chablais.
                        </p>
                      </div>
                      
                      <div className="text-center mt-6 bg-amber-100/80 rounded-lg p-4 border-2 border-amber-300">
                        <p className="text-amber-800 font-elvish font-bold mb-2">
                          L'esprit de la montagne murmure :
                        </p>
                        <p className="text-amber-700 italic">
                          "Celui qui cherche le Dahu trouvera bien plus que ce qu'il espérait. 
                          La montagne révèle ses secrets à ceux qui savent regarder au-delà du visible..."
                        </p>
                      </div>
                    </div>

                    {/* Continue to Exploration */}
                    <div className="text-center">
                      <button
                        onClick={() => setLocation("/step1-find-table")}
                        className="bg-slate-700 hover:bg-slate-800 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors transform hover:scale-105"
                        data-testid="button-start-exploration"
                      >
                        Commencer l'exploration du Petit Môle
                      </button>
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