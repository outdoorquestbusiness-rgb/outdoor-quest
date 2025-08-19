import { ArrowLeft, BookOpen, Backpack, Trophy, ArrowRight, Shield, MapPin, Smartphone, Wifi, Camera } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function Rules() {
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
          onClick={() => setLocation("/missions")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-white drop-shadow-lg">Règles & Notice</h2>
        <div className="w-10"></div>
      </div>

      {/* Rules Content */}
      <div className="space-y-6">
        {/* Rules Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-forest" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Règles du jeu</h3>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-forest rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Résolvez les énigmes dans l'ordre chronologique
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-forest rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Utilisez les indices avec parcimonie pour un meilleur score
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-forest rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Respectez l'environnement naturel du Môle
            </li>
          </ul>
        </div>

        {/* Safety Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Sécurité</h3>
          </div>
          <div className="flex items-center text-slate-600">
            <Shield className="h-4 w-4 mr-3 text-red-500" />
            <span className="font-medium">{t("safety.trail")}</span>
          </div>
        </div>

        {/* Technical Requirements Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-mountain/10 rounded-full flex items-center justify-center mr-3">
              <Smartphone className="h-5 w-5 text-mountain" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Exigences Techniques</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-3 text-forest" />
              <span className="font-medium">{t("gps.required")}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Camera className="h-4 w-4 mr-3 text-adventure" />
              <span className="font-medium">{t("ar.featured")}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Wifi className="h-4 w-4 mr-3 text-mountain" />
              <span className="font-medium">{t("offline.playable")}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Smartphone className="h-4 w-4 mr-3 text-forest" />
              <span className="font-medium">{t("phone.charged")}</span>
            </div>
          </div>
        </div>

        {/* Resources Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-mountain/10 rounded-full flex items-center justify-center mr-3">
              <Backpack className="h-5 w-5 text-mountain" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Ressources nécessaires</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-slate-600">
              <i className="fas fa-mobile-alt text-slate-400 mr-3"></i>
              <span className="font-medium">Smartphone</span>
            </div>
            <div className="flex items-center text-slate-600">
              <i className="fas fa-pencil-alt text-slate-400 mr-3"></i>
              <span className="font-medium">Papier/Crayon</span>
            </div>
            <div className="flex items-center text-slate-600">
              <i className="fas fa-hiking text-slate-400 mr-3"></i>
              <span className="font-medium">Chaussures de marche</span>
            </div>
            <div className="flex items-center text-slate-600">
              <i className="fas fa-tint text-slate-400 mr-3"></i>
              <span className="font-medium">Bouteille d'eau</span>
            </div>
          </div>
        </div>

        {/* Scoring Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-adventure/10 rounded-full flex items-center justify-center mr-3">
              <Trophy className="h-5 w-5 text-adventure" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Système de score</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Réponse correcte</span>
              <span className="font-semibold text-forest">+100 pts</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Bonus vitesse</span>
              <span className="font-semibold text-mountain">+50 pts</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Indice utilisé</span>
              <span className="font-semibold text-red-500">-25 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8">
        <button
          onClick={() => setLocation("/mission-intro")}
          className="w-full bg-gradient-to-r from-forest to-mountain text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          data-testid="button-continue"
        >
          <ArrowRight className="h-5 w-5 mr-2 inline" />
          Continuer vers l'introduction
        </button>
      </div>
    </div>
  );
}
