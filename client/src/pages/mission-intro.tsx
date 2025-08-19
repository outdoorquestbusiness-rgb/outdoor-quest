import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { missionStory } from "@/data/missions";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function MissionIntro() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})` 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => setLocation("/rules")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-white drop-shadow-lg">Introduction</h2>
        <div className="w-10"></div>
      </div>

      {/* Story Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-6 border border-white/50">
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-merriweather font-bold mb-2 text-slate-800">{missionStory.title}</h3>
              <p className="text-slate-600">{missionStory.subtitle}</p>
            </div>
            
            <div className="prose prose-slate text-sm leading-relaxed">
              {missionStory.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-slate-700">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setLocation("/riddle/chapter/1/riddle/1")}
          className="w-full bg-gradient-to-r from-forest to-mountain text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          data-testid="button-start-mission"
        >
          <ArrowRight className="h-5 w-5 mr-2 inline" />
          Commencer l'aventure
        </button>
      </div>
    </div>
  );
}