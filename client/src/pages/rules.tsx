import { ArrowLeft, Shield, Clock, Users, Target, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

export default function Rules() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => setLocation("/teams")}
          className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-elvish font-bold text-white drop-shadow-lg">
          📋 Règles du Jeu
        </h1>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-indigo-900/95 to-purple-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-indigo-300/50">
          <div className="text-center">
            <Shield className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-elvish font-bold text-indigo-100 mb-4">
              Bienvenue dans la Salle des Règles
            </h2>
            <p className="text-indigo-200 font-elvish text-lg italic">
              "Avant de partir à l'aventure sur les traces du mystérieux Dahu Blanc, 
              prenez connaissance des règles qui gouvernent cette quête épique."
            </p>
          </div>
        </div>

        {/* Game Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Rules */}
          <div className="bg-green-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-green-300">
            <div className="text-center mb-4">
              <Users className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-elvish font-bold text-green-800">
                Travail d'Équipe
              </h3>
            </div>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🤝</span>
                <span className="font-elvish">Collaboration obligatoire pour certaines énigmes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">💭</span>
                <span className="font-elvish">Partagez vos découvertes avec votre équipe</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🗣️</span>
                <span className="font-elvish">Communication constante recommandée</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🏆</span>
                <span className="font-elvish">Victoire collective uniquement</span>
              </li>
            </ul>
          </div>

          {/* Time Rules */}
          <div className="bg-orange-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-orange-300">
            <div className="text-center mb-4">
              <Clock className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-elvish font-bold text-orange-800">
                Gestion du Temps
              </h3>
            </div>
            <ul className="space-y-3 text-orange-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⏱️</span>
                <span className="font-elvish">Chronomètre activé dès le début</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">🎯</span>
                <span className="font-elvish">Objectif : terminer en moins de 60 minutes</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">💡</span>
                <span className="font-elvish">Les indices réduisent le score final</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⭐</span>
                <span className="font-elvish">Bonus de rapidité pour les meilleures équipes</span>
              </li>
            </ul>
          </div>

          {/* Enigma Rules */}
          <div className="bg-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-300">
            <div className="text-center mb-4">
              <Target className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="text-xl font-elvish font-bold text-purple-800">
                Résolution d'Énigmes
              </h3>
            </div>
            <ul className="space-y-3 text-purple-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">🧩</span>
                <span className="font-elvish">8 énigmes progressives à résoudre</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">🔍</span>
                <span className="font-elvish">Observation et logique requises</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">📱</span>
                <span className="font-elvish">Utilisez la réalité augmentée quand indiquée</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">🔄</span>
                <span className="font-elvish">Tentatives illimitées, mais temps compté</span>
              </li>
            </ul>
          </div>

          {/* Safety Rules */}
          <div className="bg-red-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-red-300">
            <div className="text-center mb-4">
              <AlertTriangle className="h-10 w-10 text-red-600 mx-auto mb-3" />
              <h3 className="text-xl font-elvish font-bold text-red-800">
                Sécurité en Montagne
              </h3>
            </div>
            <ul className="space-y-3 text-red-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">🥾</span>
                <span className="font-elvish">Équipement de randonnée obligatoire</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">📍</span>
                <span className="font-elvish">Restez sur les sentiers balisés</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">🌦️</span>
                <span className="font-elvish">Vérifiez la météo avant de partir</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">📞</span>
                <span className="font-elvish">Gardez un moyen de communication</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Game Flow */}
        <div className="bg-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-blue-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-elvish font-bold text-blue-800 mb-4">
              🗺️ Déroulement de l'Aventure
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 rounded-lg p-4 text-center border-2 border-blue-200">
              <div className="text-3xl mb-2">🌲</div>
              <h4 className="font-elvish font-bold text-blue-800 mb-2">Forêt</h4>
              <p className="text-blue-700 text-sm">Énigmes de départ et découverte des indices</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 text-center border-2 border-blue-200">
              <div className="text-3xl mb-2">🏔️</div>
              <h4 className="font-elvish font-bold text-blue-800 mb-2">Station Alpine</h4>
              <p className="text-blue-700 text-sm">Défis de navigation et orientation</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 text-center border-2 border-blue-200">
              <div className="text-3xl mb-2">🗺️</div>
              <h4 className="font-elvish font-bold text-blue-800 mb-2">Table d'Orientation</h4>
              <p className="text-blue-700 text-sm">Géographie et déchiffrement</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 text-center border-2 border-blue-200">
              <div className="text-3xl mb-2">✝️</div>
              <h4 className="font-elvish font-bold text-blue-800 mb-2">Croix du Sommet</h4>
              <p className="text-blue-700 text-sm">Épreuve finale et révélation</p>
            </div>
          </div>
        </div>

        {/* Start Adventure Button */}
        <div className="text-center bg-gradient-to-r from-amber-900/95 to-yellow-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-amber-300/50">
          <h3 className="text-2xl font-elvish font-bold text-amber-100 mb-4">
            Prêt pour l'Aventure ?
          </h3>
          <p className="text-amber-200 font-elvish mb-6 italic">
            "Les règles sont claires, votre équipe est formée. 
            Il ne reste plus qu'à partir sur les traces du mystérieux Dahu Blanc !"
          </p>
          
          <button
            onClick={() => setLocation("/mission-intro")}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-elvish font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            data-testid="button-start-adventure"
          >
            <Target className="h-6 w-6 mr-3 inline-block" />
            Commencer l'Aventure
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        .font-elvish {
          font-family: 'Kalam', cursive;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}