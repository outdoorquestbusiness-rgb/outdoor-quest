import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Mountain, Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";
import dahuBlancImage from "@assets/dahu_blanc_1755704186917.png";

export default function AlpineStation() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showDahuPhoto, setShowDahuPhoto] = useState(false);
  const [showClues, setShowClues] = useState(false);

  const storyText = "Vous émergez enfin de la forêt mystérieuse, vos pas vous menant vers les hauteurs du Mont Môle. Devant vous se dresse la station d'alpage du Petit Môle, battue par les vents de montagne. Cette station offre des vues magnifiques sur les sommets environnants. Ce n'est pas encore la rencontre avec le Dahu Blanc, mais l'exploration de ce lieu magique et de ses panoramas extraordinaires. Les indices récoltés dans la forêt vont maintenant prendre tout leur sens... L'air pur de la montagne porte en lui les secrets millénaires de cette créature légendaire.";

  const forestClues = [
    { enigma: "Énigme des Arbres", clue: "BLANC" },
    { enigma: "Test Musical", clue: "OLYMPE" },
    { enigma: "Objet Secret", clue: "FUJI" }
  ];

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})` 
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
                    La Station d'Alpage du Mont Môle
                  </h3>
                  <p className="text-lg text-slate-300 italic font-elvish">Rencontre avec le Dahu Blanc</p>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <p className="text-lg leading-relaxed font-elvish text-slate-200 min-h-[150px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Dahu Blanc Photo */}
                {showDahuPhoto && (
                  <div className="animate-slideInUp mb-8">
                    <div className="bg-white/95 rounded-xl p-6 text-center border-2 border-slate-200">
                      <h4 className="text-2xl font-elvish font-bold text-slate-800 mb-4">
                        Le Dahu Blanc Légendaire
                      </h4>
                      
                      <div className="relative mx-auto mb-4 max-w-md">
                        <img 
                          src={dahuBlancImage}
                          alt="Le Dahu Blanc mystérieux dans son environnement montagnard"
                          className="w-full h-auto rounded-lg shadow-lg border-4 border-amber-200"
                          data-testid="img-dahu-blanc"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-amber-100/20 to-transparent"></div>
                      </div>
                      
                      <p className="text-slate-700 font-elvish italic">
                        "Voici le majestueux Dahu Blanc, gardien des secrets du Mont Môle. 
                        Sa fourrure immaculée brille sous les rayons alpins, et ses yeux anciens 
                        reflètent la sagesse des montagnes éternelles."
                      </p>
                    </div>
                  </div>
                )}

                {/* Forest Clues Summary */}
                {showClues && (
                  <div className="animate-slideInUp">
                    <div className="bg-amber-50/95 rounded-xl p-6 mb-6 border-2 border-amber-300/50">
                      <div className="text-center mb-6">
                        <Star className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-amber-800">
                          Indices Récoltés dans la Forêt
                        </h4>
                        <p className="text-amber-700 italic font-elvish mt-2">
                          Ces mots mystérieux vont révéler leur véritable pouvoir...
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {forestClues.map((item, index) => (
                          <div key={index} className="bg-white/80 rounded-lg p-4 text-center border-2 border-amber-200">
                            <h5 className="font-bold text-amber-800 mb-2">{item.enigma}</h5>
                            <div className="text-2xl font-elvish font-bold text-amber-900 bg-amber-100 rounded-lg py-2 px-4 border border-amber-300">
                              {item.clue}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-4 border-2 border-amber-400">
                        <p className="text-center font-elvish text-amber-900 italic">
                          Le Dahu Blanc regarde ces mots avec un sourire mystérieux...
                          <br />
                          "Ces trois indices forment ensemble la clé de mon plus grand secret."
                        </p>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="text-center">
                      <button
                        onClick={() => setLocation("/orientation-table")}
                        className="bg-slate-700 hover:bg-slate-800 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors transform hover:scale-105"
                        data-testid="button-orientation-table"
                      >
                        Explorer la Station d'Alpage
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