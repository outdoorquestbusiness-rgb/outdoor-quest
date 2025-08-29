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
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})` 
      }}
    >
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/step1-find-table")}
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
      <div className="max-w-4xl mx-auto">
        {showContent && (
          <div className="animate-fadeInUp">
            {/* Step 2 - Password Challenge */}
            <div className="bg-amber-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-amber-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-amber-100 drop-shadow-sm">
                    Étape 2 — Déchiffrer le mot de passe
                  </h3>
                </div>

                <div className="bg-white/90 rounded-xl p-6 mb-6">
                  <p className="text-amber-900 font-elvish text-lg italic text-center mb-6">
                    "Tu as récolté trois noms au cœur de la forêt : Regarde-les bien. 
                    Ils ont une origine commune. Réunis-les, et tu trouveras le mot de passe qui ouvre la porte des cimes."
                  </p>

                  {/* Forest Clues Display - Only found words */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {forestClues.map((clue, index) => (
                      <div key={index} className="bg-emerald-100 rounded-lg p-4 text-center border-2 border-emerald-300">
                        <div className="text-xl font-elvish font-bold text-emerald-900">
                          {clue}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isCorrect && (
                    <div className="text-center">
                      <p className="text-amber-800 font-elvish font-bold mb-4">
                        Quel mot unit ces trois noms ?
                      </p>
                      <div className="space-y-4 mb-4">
                        <div className="flex justify-center">
                          <input
                            type="text"
                            value={foundWord}
                            onChange={(e) => setFoundWord(e.target.value)}
                            placeholder="Tapez le mot de passe..."
                            className="px-4 py-2 border-2 border-amber-400 rounded-lg font-elvish text-lg focus:border-amber-600 focus:outline-none"
                            data-testid="input-password"
                          />
                        </div>
                        
                        {/* Control Buttons */}
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={handleWordSubmit}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                            data-testid="button-validate"
                          >
                            Valider ma solution
                          </button>
                          <button
                            onClick={() => {
                              // Force continue to next step
                              setIsCorrect(true);
                              setLocation("/step3-identify-mountain");
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                            data-testid="button-abandon"
                          >
                            Abandon
                          </button>
                          <button
                            onClick={() => {
                              // Show hint - give first letter
                              setFoundWord(prev => prev || 'M');
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                            data-testid="button-hint"
                          >
                            Indice
                          </button>
                        </div>
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
      `}</style>
    </div>
  );
}