import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { missionStory } from "@/data/missions";
import { useChronometer } from "@/hooks/use-chronometer";
import { createIntriguingSound } from "@/utils/audio";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function MissionIntro() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const chronometer = useChronometer();

  const fullStoryText = missionStory.content.join(" ");

  const handleStartAdventure = () => {
    chronometer.start();
    // Store start time in localStorage for persistence
    localStorage.setItem('missionStartTime', Date.now().toString());
    setLocation("/forest-challenge");
  };

  useEffect(() => {
    // Play horror movie transition sound and show background for 1.5 seconds, then start typewriter
    createIntriguingSound(2000);
    const showContentTimer = setTimeout(() => {
      setShowContent(true);
      
      // Start typewriter animation
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < fullStoryText.length) {
          setTypewriterText(fullStoryText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Show button after story is complete
          setTimeout(() => setShowButton(true), 500);
        }
      }, 30); // 30ms per character for faster handwritten typing speed

      return () => clearInterval(typeInterval);
    }, 1500);

    return () => clearTimeout(showContentTimer);
  }, [fullStoryText]);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${moleMountainImage})` 
      }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between mb-8 pt-4 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setLocation("/rules")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Introduction</h2>
        <div className="w-10"></div>
      </div>

      {/* Story Content */}
      {showContent && (
        <div className="max-w-2xl mx-auto animate-fadeInUp">
          <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-amber-200/50">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-amber-900 drop-shadow-sm">
                  {missionStory.title}
                </h3>
                <p className="text-lg text-amber-700 italic font-elvish">{missionStory.subtitle}</p>
                
                {/* Authentic Dahu Image */}
                <div className="mt-6 mb-4">
                  <div className="inline-block p-3 bg-amber-100 rounded-xl shadow-lg transform rotate-1">
                    <div className="w-40 h-40 mx-auto bg-white rounded-lg shadow-inner flex items-center justify-center border-2 border-amber-200 relative overflow-hidden">
                      <img 
                        src="/attached_assets/dahu_blanc_1755704186917.png" 
                        alt="Dahu Blanc"
                        className="w-full h-full object-contain p-2 opacity-90"
                      />
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-elvish text-amber-800 bg-white/80 px-2 py-1 rounded">
                        Dahu Blanc
                      </div>
                    </div>
                  </div>
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
        @import url('https://fonts.cdnfonts.com/css/tengwar-annatar');
        
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
          font-family: 'Tengwar Annatar', serif;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}