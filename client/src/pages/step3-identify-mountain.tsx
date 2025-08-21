import { useState, useEffect } from "react";
import { ArrowLeft, Timer, Mountain, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function Step3IdentifyMountain() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [selectedMountain, setSelectedMountain] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [guessInput, setGuessInput] = useState("");

  const handleMountainGuess = () => {
    // The correct answer is Mont Salève based on the riddle
    if (guessInput.toLowerCase().includes("saleve") || guessInput.toLowerCase().includes("salève")) {
      setSelectedMountain("Mont Salève");
      setIsCompleted(true);
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
          onClick={() => setLocation("/step2-decipher-password")}
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
            {/* Step 3 - Mountain Identification */}
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-slate-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <Mountain className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-slate-100 drop-shadow-sm">
                    Étape 3 — Identifier le mont
                  </h3>
                </div>

                <div className="bg-white/90 rounded-xl p-6 mb-6">
                  <p className="text-slate-800 font-elvish text-lg italic text-center mb-6">
                    "Voici la table d'orientation du Petit Môle. Elle pointe vers les sommets qui l'entourent."
                  </p>

                  {/* Orientation Table Illustration */}
                  <div className="bg-stone-100 rounded-xl p-6 mb-6 border-2 border-stone-300">
                    <h4 className="text-center font-elvish font-bold text-stone-800 mb-4">Table d'Orientation</h4>
                    
                    {/* SVG Table Illustration */}
                    <div className="flex justify-center mb-4">
                      <svg width="300" height="200" viewBox="0 0 300 200" className="border border-stone-400 rounded-lg bg-stone-200">
                        {/* Table base */}
                        <rect x="50" y="120" width="200" height="60" fill="#8B7355" stroke="#654321" strokeWidth="2" rx="5"/>
                        
                        {/* Orientation disc */}
                        <circle cx="150" cy="100" r="70" fill="#B8860B" stroke="#654321" strokeWidth="3"/>
                        
                        {/* Direction arrows and labels */}
                        
                        {/* Sud-Ouest - Mont Vuache */}
                        <line x1="110" y1="140" x2="90" y2="160" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="85" y="175" fontSize="8" fill="#654321" fontFamily="monospace">Vuache</text>
                        
                        {/* Ouest - Mont Forchat */}
                        <line x1="80" y1="100" x2="60" y2="100" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="45" y="95" fontSize="8" fill="#654321" fontFamily="monospace">Forchat</text>
                        
                        {/* Nord - Mont d'Or (Jura) */}
                        <line x1="150" y1="30" x2="150" y2="10" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="135" y="25" fontSize="8" fill="#654321" fontFamily="monospace">d'Or</text>
                        
                        {/* Est - Mont Salève */}
                        <line x1="220" y1="100" x2="240" y2="100" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="245" y="95" fontSize="8" fill="#654321" fontFamily="monospace">Salève</text>
                        
                        {/* Sud-Est - Mont Billiat */}
                        <line x1="190" y1="140" x2="210" y2="160" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="215" y="175" fontSize="8" fill="#654321" fontFamily="monospace">Billiat</text>
                        
                        {/* Chablais region - Ouzon/Chauffé */}
                        <line x1="120" y1="60" x2="100" y2="40" stroke="#654321" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="85" y="35" fontSize="7" fill="#654321" fontFamily="monospace">Ouzon</text>
                        
                        {/* Arrow marker definition */}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#654321"/>
                          </marker>
                        </defs>
                        
                        {/* Center point */}
                        <circle cx="150" cy="100" r="3" fill="#654321"/>
                      </svg>
                    </div>

                    {/* Mountain List */}
                    <div className="text-center text-sm text-stone-700">
                      <p className="mb-2 font-semibold">Sommets visibles :</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>• Mont Vuache (sud-ouest)</div>
                        <div>• Mont Salève (est)</div>
                        <div>• Mont d'Or (nord, Jura)</div>
                        <div>• Mont Forchat (ouest)</div>
                        <div>• Mont Ouzon (Chablais)</div>
                        <div>• Mont Billiat (sud-est)</div>
                      </div>
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300 mb-4">
                        <p className="text-blue-900 font-elvish font-bold mb-2">Devinette :</p>
                        <p className="text-blue-800 italic">
                          "Proche de Genève, je me dresse en falaise. 
                          Mon profil reconnaissable domine le lac. 
                          Les Genevois me voient chaque jour. Qui suis-je ?"
                        </p>
                      </div>
                      
                      <div className="flex justify-center items-center space-x-4">
                        <input
                          type="text"
                          value={guessInput}
                          onChange={(e) => setGuessInput(e.target.value)}
                          placeholder="Tapez le nom du mont..."
                          className="px-4 py-2 border-2 border-slate-400 rounded-lg font-elvish text-lg focus:border-slate-600 focus:outline-none"
                          data-testid="input-mountain-guess"
                        />
                        <button
                          onClick={handleMountainGuess}
                          className="bg-slate-600 hover:bg-slate-700 text-white font-elvish font-bold py-2 px-6 rounded-lg transition-colors"
                          data-testid="button-submit-mountain"
                        >
                          Valider
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {isCompleted && (
                    <div className="bg-green-100/90 rounded-xl p-6 border-2 border-green-300 animate-slideInUp">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                          Excellent ! C'est bien le Mont Salève !
                        </h4>
                        <p className="text-green-700 font-elvish mb-4">
                          Le Mont Salève, surnommé "le balcon de Genève", est effectivement reconnaissable par sa forme en falaise. 
                          Vous avez résolu l'énigme de la table d'orientation !
                        </p>
                        
                        {/* Continue Button */}
                        <button
                          onClick={() => setLocation("/final-dahu-encounter")}
                          className="bg-green-600 hover:bg-green-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-final-encounter"
                        >
                          Continuer l'aventure
                        </button>
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