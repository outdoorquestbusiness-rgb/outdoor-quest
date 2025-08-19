import { ArrowLeft, Clock, Star, Users, MapPin, Play } from "lucide-react";
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

  const { data: mission, isLoading } = useQuery({
    queryKey: ["/api/missions", missionId],
  });

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

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => setLocation("/missions")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-white drop-shadow-lg">Mission Details</h2>
        <div className="w-10"></div>
      </div>

      {/* Mission Hero */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div
          className="h-48 bg-gradient-to-r from-forest to-mountain flex items-center justify-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white">
            <h1 className="text-3xl font-merriweather font-black mb-2">{mission.name}</h1>
            <p className="text-white/90">{mission.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-forest" />
              </div>
              <p className="text-sm text-slate-600 mb-1">{t("duration")}</p>
              <p className="font-semibold">{mission.duration}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-mountain/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-mountain" />
              </div>
              <p className="text-sm text-slate-600 mb-1">{t("difficulty")}</p>
              <p className="font-semibold">{mission.difficulty}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-adventure/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-adventure" />
              </div>
              <p className="text-sm text-slate-600 mb-1">{t("age.recommended")}</p>
              <p className="font-semibold">{mission.ageRecommended}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-earth" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Location</p>
              <p className="font-semibold">{mission.location}</p>
            </div>
          </div>

          <button
            onClick={() => setLocation("/rules")}
            className="w-full bg-gradient-to-r from-forest to-mountain text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <Play className="h-5 w-5 mr-2 inline" />
            {t("start.adventure")}
          </button>
        </div>
      </div>
    </div>
  );
}
