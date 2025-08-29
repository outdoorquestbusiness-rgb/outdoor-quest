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
    // Removed audio as requested - silent experience
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
      className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-sky-900 via-blue-900 to-green-900 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 20% 60%, rgba(251, 191, 36, 0.2) 0%, transparent 40%)
        `
      }}
    >
      {/* Mystical Particles Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="mystical-particles"></div>
      </div>

      {/* Timer in top right */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center bg-gradient-to-r from-blue-900/90 to-green-900/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border-2 border-yellow-500/50">
          <Timer className="h-4 w-4 text-yellow-300 mr-2" />
          <span className="font-mono text-sm font-semibold text-yellow-100">
            {chronometer.formattedTime}
          </span>
        </div>
      </div>

      {/* Main Content */}
      {showContent && (
        <div className="max-w-2xl mx-auto animate-fadeInUp relative z-10">
          <div className="bg-gradient-to-br from-blue-900/95 via-sky-900/95 to-green-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-4 border-yellow-500/60 relative">
            {/* Ornate border decoration */}
            <div className="absolute inset-0 rounded-2xl border-4 border-blue-500/30 pointer-events-none"></div>
            <div className="absolute inset-2 rounded-xl border-2 border-yellow-400/40 pointer-events-none"></div>
            
            <div className="p-6 sm:p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-hyrule font-bold mb-3 text-yellow-300 drop-shadow-lg tracking-wider">
                  ♦ {missionStory.title} ♦
                </h3>
                <p className="text-lg text-blue-200 italic font-hyrule tracking-wide">{missionStory.subtitle}</p>
              </div>
              
              {/* Typewriter Story Text */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-blue-800/60 via-sky-800/60 to-green-800/60 rounded-xl p-6 border-2 border-blue-500/40">
                  <p className="text-lg leading-relaxed font-hyrule text-blue-100 min-h-[200px] tracking-wide italic text-shadow-hyrule">
                    {typewriterText}
                  </p>
                </div>
              </div>

              {/* Dahu Blanc Photo - Only show after story is complete */}
              {showButton && (
                <div className="text-center animate-slideInUp">
                  <div className="relative mx-auto max-w-xs">
                    <div className="relative">
                      <img 
                        src={dahuBlancImage}
                        alt="Le Dahu Blanc mystérieux dans son environnement montagnard"
                        className="w-full h-auto rounded-xl shadow-2xl border-4 border-gold-400 transform hover:scale-105 transition-transform duration-300"
                        data-testid="img-dahu-blanc-intro"
                        style={{
                          filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.7)) brightness(1.1) contrast(1.1)'
                        }}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-purple-800/30 via-transparent to-indigo-800/30 pointer-events-none"></div>
                      {/* Mystical glow effect */}
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-30 blur-sm animate-pulse"></div>
                    </div>
                  </div>
                
                  {/* Description after photo */}
                  <div className="mt-6 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 rounded-xl p-6 border-2 border-gold-400/60">
                    <div className="text-center text-purple-100 font-majora">
                      <p className="mb-3 italic text-lg tracking-wide">
                        "Une créature légendaire aux pattes avant plus courtes que les pattes arrière, 
                        parfaitement adaptée aux pentes escarpées des Alpes..."
                      </p>
                      <p className="text-purple-200 tracking-wide">
                        Votre quête commence maintenant. Suivez les indices, résolvez les énigmes, 
                        et découvrez les secrets millénaires du Dahu Blanc.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button - Only show when typing is complete */}
          {showButton && (
            <div className="animate-slideInUp">
              <button
                onClick={handleStartAdventure}
                className="w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 hover:from-purple-600 hover:via-indigo-600 hover:to-purple-600 text-gold-100 font-bold py-6 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 text-xl font-majora tracking-wider border-4 border-gold-500/60 relative overflow-hidden"
                data-testid="button-start-mission"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-gold-500/20 to-purple-500/20 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 mr-3 text-gold-300" />
                  ◆ COMMENCER L'AVENTURE ◆
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Philosopher:ital,wght@0,400;0,700;1,400&display=swap');
        
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
        
        @keyframes mysticalFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
            opacity: 0.4;
          }
        }
        
        @keyframes mysticalGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(79, 70, 229, 0.8);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .font-hyrule {
          font-family: 'Cinzel', 'Philosopher', serif;
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        
        .text-shadow-hyrule {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(59, 130, 246, 0.4);
        }
        
        .mystical-particles {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #fbbf24, transparent),
            radial-gradient(2px 2px at 40px 70px, #a855f7, transparent),
            radial-gradient(1px 1px at 90px 40px, #6366f1, transparent),
            radial-gradient(1px 1px at 130px 80px, #fbbf24, transparent),
            radial-gradient(2px 2px at 160px 30px, #a855f7, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: mysticalFloat 8s ease-in-out infinite;
          opacity: 0.7;
        }
        
        .mystical-particles::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 50px 50px, #fbbf24, transparent),
            radial-gradient(2px 2px at 120px 120px, #6366f1, transparent),
            radial-gradient(1px 1px at 180px 80px, #a855f7, transparent);
          background-repeat: repeat;
          background-size: 250px 150px;
          animation: mysticalFloat 12s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
}