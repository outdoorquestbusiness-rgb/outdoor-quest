import { useState } from "react";
import { ArrowLeft, Plus, Key, Check, Clock, Star, Users, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

export default function Missions() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const { toast } = useToast();

  const { data: missions = [], refetch } = useQuery({
    queryKey: ["/api/missions"],
  });

  const validateCode = useMutation({
    mutationFn: async (code: string) => {
      return await apiRequest("POST", "/api/missions/validate-code", { accessCode: code });
    },
    onSuccess: (response) => {
      toast({
        title: "Success!",
        description: `Mission "${response.name}" added successfully!`,
      });
      setAccessCode("");
      setShowAddForm(false);
      refetch();
    },
    onError: () => {
      toast({
        title: "Invalid Code",
        description: "Please try code 1234 for demo.",
        variant: "destructive",
      });
    },
  });

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim()) {
      validateCode.mutate(accessCode);
    }
  };

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
          onClick={() => setLocation("/")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{t("missions.title")}</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-forest text-white shadow-md hover:shadow-lg transition-all hover:bg-forest/90"
          data-testid="button-add-mission"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Add Mission</span>
        </button>
      </div>

      {/* Add Mission Form */}
      {showAddForm && (
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-forest/20">
            <div className="flex items-center mb-4">
              <Key className="h-5 w-5 text-forest mr-2" />
              <span className="font-semibold text-slate-700">{t("access.code")}</span>
            </div>
            <form onSubmit={handleValidateCode} className="flex gap-2">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
                placeholder={t("enter.code")}
                required
              />
              <button
                type="submit"
                disabled={validateCode.isPending}
                className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors disabled:bg-slate-300"
              >
                {validateCode.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-2">{t("demo.code")}</p>
          </div>
        </div>
      )}

      {/* Missions List */}
      <div className="space-y-6">
        {missions.map((mission: any) => {
          // Check if mission is "new" (created within last 24 hours)
          const isNewMission = new Date(mission.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000;
          
          return (
            <div
              key={mission.id}
              onClick={() => setLocation(`/mission/${mission.id}`)}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-[1.02] duration-300 border border-white/50"
              data-testid={`card-mission-${mission.id}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-forest via-mountain to-adventure rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-mountain text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{mission.name}</h3>
                      <p className="text-slate-600">{mission.description}</p>
                    </div>
                  </div>
                  {isNewMission && (
                    <span className="bg-adventure text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg animate-pulse">
                      {t("new")}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-4 w-4 mr-2 text-forest" />
                    <span className="font-medium">{mission.duration}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Star className="h-4 w-4 mr-2 text-adventure" />
                    <span className="font-medium">{mission.difficulty}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="h-4 w-4 mr-2 text-mountain" />
                    <span className="font-medium">{mission.ageRecommended}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-4 w-4 mr-2 text-forest" />
                    <span className="font-medium">{mission.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {missions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600">No missions available. Add one with the + button!</p>
          </div>
        )}
      </div>
    </div>
  );
}
