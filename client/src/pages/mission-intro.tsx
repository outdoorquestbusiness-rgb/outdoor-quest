import { useState, useEffect } from "react";
import { ArrowRight, Timer } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { missionStory } from "@/data/missions";
import { useChronometer } from "@/hooks/use-chronometer";
import { createIntriguingSound } from "@/utils/audio";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";
import dahuBlancImage from "@assets/dahu_blanc_1755704186917.png";

export default function MissionIntro() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleStartAdventure = () => {
    chronometer.start();
    createIntriguingSound();
    setLocation("/forest-challenge");
  };

  useEffect(() => {
    // Start content display after initial delay
    setTimeout(() => {
      setShowContent(true);
      
      // Typewriter effect for story
      if (missionStory && missionStory.content && Array.isArray(missionStory.content)) {
        const fullStory = missionStory.content.join(" ");
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < fullStory.length) {
            setTypewriterText(fullStory.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // Show button after story is complete
            setTimeout(() => setShowButton(true), 1000);
          }
        }, 30); // 30ms per character for smooth typing

        return () => clearInterval(typeInterval);
      } else {
        // Fallback if missionStory is not available
        setTimeout(() => setShowButton(true), 1000);
      }
    }, 1000); // Initial delay before showing content
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Timer in top right */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <Timer className="h-4 w-4 text-forest mr-2" />
          <span className="font-mono text-sm font-semibold text-slate-700">
            {chronometer.formattedTime}
          </span>
        </div>
      </div>

      {/* Main Content */}
      {showContent && (
        <div className="max-w-2xl mx-auto animate-fadeInUp">
          <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-amber-200/50">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-amber-900 drop-shadow-sm">
                  {missionStory.title}
                </h3>
                <p className="text-lg text-amber-700 italic font-elvish">{missionStory.subtitle}</p>
                
                {/* Dahu Blanc Photo */}
                <div className="mt-6 mb-4">
                  <div className="relative mx-auto max-w-xs">
                    <img 
                      src={dahuBlancImage}
                      alt="Le Dahu Blanc mystérieux dans son environnement montagnard"
                      className="w-full h-auto rounded-xl shadow-lg border-4 border-amber-200"
                      data-testid="img-dahu-blanc-intro"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-amber-100/20 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Continue description after photo */}
              <div className="bg-white/90 rounded-xl p-6 mb-6 border-2 border-emerald-200">
                <div className="text-center text-gray-700 font-elvish">
                  <p className="mb-3 italic">
                    "Une créature légendaire aux pattes avant plus courtes que les pattes arrière, 
                    parfaitement adaptée aux pentes escarpées des Alpes..."
                  </p>
                  <p className="text-sm">
                    Votre quête commence maintenant. Suivez les indices, résolvez les énigmes, 
                    et découvrez les secrets millénaires du Dahu Blanc.
                  </p>
                </div>
              </div>
              
              {/* Typewriter Story Text */}
              <div className="relative">
                <p className="text-lg leading-relaxed font-elvish text-amber-900 min-h-[200px] tracking-wide italic">
                  {typewriterText}
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button - Only show when typing is complete */}
          {showButton && (
            <div className="animate-slideInUp">
              <button
                onClick={handleStartAdventure}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 text-xl font-elvish"
                data-testid="button-start-mission"
              >
                <ArrowRight className="h-6 w-6 mr-3 inline-block" />
                Commencer l'aventure
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
        
        .font-elvish {
          font-family: 'Kalam', cursive;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}