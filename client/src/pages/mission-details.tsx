import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Star, Users, MapPin, Play, Mountain } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

interface MissionDetailsProps {
  missionId: string;
}

export default function MissionDetails({ missionId }: MissionDetailsProps) {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  const { data: mission, isLoading } = useQuery({
    queryKey: ["/api/missions", missionId],
  });

  useEffect(() => {
    if (mission && showIntro) {
      // Animation sequence - reduced by 1 second
      const timeouts = [
        setTimeout(() => setAnimationPhase(1), 400),
        setTimeout(() => setAnimationPhase(2), 1200),
        setTimeout(() => setAnimationPhase(3), 2000),
        setTimeout(() => setShowIntro(false), 3000),
      ];

      return () => timeouts.forEach(clearTimeout);
    }
  }, [mission, showIntro]);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Mission Not Found</h2>
          <button
            onClick={() => setLocation("/missions")}
            className="bg-forest text-white px-6 py-3 rounded-xl hover:bg-forest/90 transition-colors"
          >
            Back to Missions
          </button>
        </div>
      </div>
    );
  }

  // Introductory Animation Screen
  if (showIntro) {
    return (
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${mountainBgImage})` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {/* Mountain Icon Animation */}
            <div className={`mb-8 transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <Mountain className="h-24 w-24 mx-auto text-white animate-pulse" />
            </div>
            
            {/* Mission Name */}
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-500 ${
              animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              {mission.name}
            </h1>
            
            {/* Mission Description - Removed from loading animation */}
            
            {/* Loading indicator - reduced to 3 seconds */}
            <div className="mt-12">
              <div className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-white rounded-full animate-[loading_3s_ease-in-out_forwards]" 
                     style={{ width: '0%', animation: 'loading 3s ease-in-out forwards' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skip button */}
        <button
          onClick={() => setShowIntro(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          Skip
        </button>
        
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
      }}
    >
      {/* Back Button - Fixed */}
      <button
        onClick={() => setLocation("/missions")}
        className="fixed top-4 left-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:bg-white/20 transition-all"
        data-testid="button-back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      {/* Full Screen Mission Content */}
      <div className="min-h-screen flex flex-col">
        {/* Hero Section - Full Height */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="text-center text-white max-w-4xl mx-auto px-6 animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
              {mission.name}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
              {mission.description}
            </p>
            
            {/* Mission Stats - Animated Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <Clock className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-sm text-white/80 mb-1">{t("duration")}</p>
                <p className="font-bold text-white">{mission.duration}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <Star className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-sm text-white/80 mb-1">{t("difficulty")}</p>
                <p className="font-bold text-white">{mission.difficulty}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <Users className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-sm text-white/80 mb-1">{t("age.recommended")}</p>
                <p className="font-bold text-white">{mission.ageRecommended}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <MapPin className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-sm text-white/80 mb-1">Location</p>
                <p className="font-bold text-white">{mission.location}</p>
              </div>
            </div>

            {/* Start Adventure Button */}
            <button
              onClick={() => setLocation("/rules")}
              className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl"
              data-testid="button-start-adventure"
            >
              <Play className="h-6 w-6 mr-3 inline-block group-hover:translate-x-1 transition-transform" />
              {t("start.adventure")}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
