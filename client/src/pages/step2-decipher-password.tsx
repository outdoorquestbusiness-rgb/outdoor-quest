import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Star, Key } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function Step2DecipherPassword() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [foundWord, setFoundWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);

  // Only show clues that were actually found in the forest
  const forestClues = ["BLANC", "OLYMPE", "FUJI"];

  const handleWordSubmit = () => {
    if (foundWord.toUpperCase() === "MONT") {
      setIsCorrect(true);
      setShowError(false);
      setTimeout(() => {
        setLocation("/step3-identify-mountain");
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-purple-950 to-indigo-950 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(79, 70, 229, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.15) 0%, transparent 50%)
        `
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/step1-find-table")}
          className="p-3 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gold-400"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-gold-300" />
        </button>
        
        <div className="flex items-center bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border-2 border-gold-500/50">
          <Timer className="h-4 w-4 text-gold-300 mr-2" />
          <span className="font-mono text-sm font-semibold text-gold-100">
            {chronometer.formattedTime}
          </span>
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Step 2 - Password Challenge */}
            <div className="bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-slate-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-4 border-gold-500/60 relative">
              <div className="absolute inset-0 rounded-2xl border-4 border-purple-500/30 pointer-events-none"></div>
              <div className="absolute inset-2 rounded-xl border-2 border-gold-400/40 pointer-events-none"></div>
              <div className="p-6 sm:p-8 relative">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 text-gold-400 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-majora font-bold mb-3 text-gold-300 drop-shadow-lg tracking-wider">
                    ◆ ÉTAPE II — DÉCHIFFRER LE MOT DE PASSE ◆
                  </h3>
                </div>

                <div className="bg-gradient-to-r from-slate-800/80 via-purple-800/80 to-slate-800/80 rounded-xl p-6 mb-6 border-2 border-purple-500/50">
                  <p className="text-purple-100 font-majora text-lg italic text-center mb-6 tracking-wide text-shadow-lg">
                    "Tu as récolté trois noms au cœur de la forêt : Regarde-les bien. 
                    Ils ont une origine commune. Réunis-les, et tu trouveras le mot de passe qui ouvre la porte des cimes."
                  </p>

                  {/* Forest Clues Display - Only found words */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {forestClues.map((clue, index) => (
                      <div key={index} className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 rounded-lg p-4 text-center border-2 border-gold-400/60">
                        <div className="text-xl font-majora font-bold text-gold-200 tracking-wider">
                          {clue}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isCorrect && (
                    <div className="text-center">
                      <p className="text-purple-100 font-majora font-bold mb-4 tracking-wide">
                        Quel mot unit ces trois noms ?
                      </p>
                      <div className="flex justify-center items-center space-x-4 mb-4">
                        <input
                          type="text"
                          value={foundWord}
                          onChange={(e) => setFoundWord(e.target.value)}
                          placeholder="Tapez le mot de passe..."
                          className="px-4 py-2 border-2 border-amber-400 rounded-lg font-elvish text-lg focus:border-amber-600 focus:outline-none"
                          data-testid="input-password"
                        />
                        <button
                          onClick={handleWordSubmit}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-2 px-6 rounded-lg transition-colors"
                          data-testid="button-submit-password"
                        >
                          Valider
                        </button>
                      </div>
                      
                      {/* Error Message */}
                      {showError && (
                        <div className="bg-orange-100 rounded-xl p-4 border-2 border-orange-300 animate-slideInUp">
                          <p className="text-orange-800 font-elvish font-bold">
                            Essaye encore ! Réfléchis à ce que ces trois mots ont en commun...
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Success Message */}
                  {isCorrect && (
                    <div className="bg-green-100/90 rounded-xl p-6 border-2 border-green-300 animate-slideInUp">
                      <div className="text-center">
                        <Key className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                          Parfait ! Le mot de passe est correct !
                        </h4>
                        <p className="text-green-700 font-elvish mb-4">
                          "MONT" - Tous ces noms sont des montagnes légendaires ! 
                          La table d'orientation va maintenant révéler ses secrets...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Philosopher:ital,wght@0,400;0,700;1,400&display=swap');
        
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
        
        .font-majora {
          font-family: 'Cinzel', 'Philosopher', serif;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  );
}