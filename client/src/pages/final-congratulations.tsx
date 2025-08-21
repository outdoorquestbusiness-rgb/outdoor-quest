import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Trophy, Star, Clock, MapPin, Target, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function FinalCongratulations() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showEnigmas, setShowEnigmas] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Mission statistics
  const missionStats = {
    totalTime: chronometer.formattedTime,
    enigmasolved: 8,
    locationsDiscovered: 6,
    cluesFound: 3,
    collaborations: 1,
    altitude: 1863
  };

  const enigmasCompleted = [
    "🌲 Mots-croisés de la forêt mystérieuse",
    "🎵 Test auditif des bruits de la nature",
    "🔍 Découverte d'objet secret",
    "🧭 Navigation à la boussole",
    "🏔️ Déchiffrement du mot de passe (MONT)",
    "🗺️ Identification du Mont Salève",
    "✝️ Énigme de la croix collaborative",
    "🦌 Découverte du Dahu Blanc en AR"
  ];

  const knowledgeGained = [
    "📍 Géographie: Mont Salève, Mont Vuache, Mont Billiat",
    "🏔️ Altitude du Petit Môle: 1863 mètres",
    "🦌 Légende du Dahu Blanc alpin",
    "🗺️ Utilisation d'une table d'orientation",
    "🌲 Écosystème montagnard des Alpes",
    "✝️ Histoire des croix de montagne",
    "👥 Importance de la collaboration en randonnée",
    "📱 Technologie de réalité augmentée"
  ];

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setShowStats(true);
        setTimeout(() => {
          setShowEnigmas(true);
          setTimeout(() => {
            setShowKnowledge(true);
            setTimeout(() => {
              setShowRating(true);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/ar-dahu-discovery")}
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
      <div className="max-w-5xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp space-y-6">
            {/* Congratulations Header */}
            <div className="bg-gradient-to-r from-gold-600 to-yellow-500 rounded-2xl shadow-2xl overflow-hidden border-2 border-gold-400">
              <div className="p-6 sm:p-8 text-center">
                <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl sm:text-5xl font-elvish font-bold text-white drop-shadow-lg mb-3">
                  🎉 Félicitations ! 🎉
                </h1>
                <h2 className="text-2xl font-elvish text-white/90 mb-4">
                  Tu as accompli ta quête !
                </h2>
                <p className="text-white/80 font-elvish text-lg">
                  Le mystérieux Dahu Blanc t'a guidé vers le véritable sommet spirituel du Mont Môle. 
                  Tu as découvert bien plus qu'une simple randonnée !
                </p>
              </div>
            </div>

            {/* Statistics */}
            {showStats && (
              <div className="animate-slideInUp bg-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-300">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-elvish font-bold text-blue-800">
                      Statistiques de l'Aventure
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200">
                      <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="font-elvish font-bold text-blue-800">Temps Total</p>
                      <p className="text-blue-600 font-mono">{missionStats.totalTime}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200">
                      <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="font-elvish font-bold text-green-800">Énigmes</p>
                      <p className="text-green-600 font-bold">{missionStats.enigmasolved}/8</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200">
                      <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="font-elvish font-bold text-purple-800">Lieux</p>
                      <p className="text-purple-600 font-bold">{missionStats.locationsDiscovered}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200">
                      <Trophy className="h-6 w-6 text-gold-600 mx-auto mb-2" />
                      <p className="font-elvish font-bold text-gold-800">Altitude</p>
                      <p className="text-gold-600 font-bold">{missionStats.altitude}m</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enigmas Completed */}
            {showEnigmas && (
              <div className="animate-slideInUp bg-green-50/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-green-300">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <Star className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-elvish font-bold text-green-800">
                      Énigmes Résolues
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {enigmasCompleted.map((enigma, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border-2 border-green-200 flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          ✓
                        </div>
                        <p className="font-elvish text-green-800">{enigma}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Gained */}
            {showKnowledge && (
              <div className="animate-slideInUp bg-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-300">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <Star className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-elvish font-bold text-purple-800">
                      Nouvelles Connaissances Acquises
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {knowledgeGained.map((knowledge, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border-2 border-purple-200 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          📚
                        </div>
                        <p className="font-elvish text-purple-800">{knowledge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rating */}
            {showRating && (
              <div className="animate-slideInUp bg-orange-50/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-300">
                <div className="p-6 sm:p-8">
                  <div className="text-center">
                    <Heart className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-elvish font-bold text-orange-800 mb-4">
                      Notez votre expérience
                    </h3>
                    <p className="text-orange-700 font-elvish mb-6">
                      Comment avez-vous trouvé cette aventure sur les traces du Dahu Blanc ?
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center space-x-2 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className={`text-4xl transition-colors ${
                            star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                          } hover:text-yellow-400`}
                          data-testid={`star-${star}`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                    
                    {userRating > 0 && (
                      <div className="animate-slideInUp bg-white rounded-xl p-4 border-2 border-orange-300 mb-4">
                        <p className="text-orange-800 font-elvish font-bold">
                          Merci pour votre note de {userRating}/5 étoiles !
                        </p>
                        <p className="text-orange-700 text-sm mt-2">
                          Votre retour nous aide à améliorer l'expérience pour les futurs aventuriers.
                        </p>
                      </div>
                    )}

                    {/* Final Thank You */}
                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border-2 border-amber-400">
                      <h4 className="text-xl font-elvish font-bold text-amber-800 mb-3">
                        Merci d'avoir vécu cette aventure !
                      </h4>
                      <p className="text-amber-700 font-elvish mb-4">
                        Le Dahu Blanc et les sommets du Mont Môle garderont à jamais le souvenir 
                        de votre passage. Vous êtes maintenant un véritable explorateur des Alpes !
                      </p>
                      <p className="text-amber-600 text-sm italic">
                        "Que cette expérience vous inspire à explorer davantage les merveilles 
                        de nos montagnes et à préserver leurs secrets pour les générations futures."
                      </p>
                    </div>

                    {/* Return Button */}
                    <div className="mt-6">
                      <button
                        onClick={() => setLocation("/missions")}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                        data-testid="button-return-missions"
                      >
                        Retour aux missions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
        
        .bg-gold-600 {
          background-color: #D97706;
        }
        
        .border-gold-400 {
          border-color: #FBBF24;
        }
        
        .text-gold-600 {
          color: #D97706;
        }
        
        .text-gold-800 {
          color: #92400E;
        }
      `}</style>
    </div>
  );
}