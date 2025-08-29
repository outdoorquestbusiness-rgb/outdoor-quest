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
  const [showError, setShowError] = useState(false);

  const handleMountainGuess = () => {
    // The correct answer is Mont Salève based on the riddle
    if (guessInput.toLowerCase().includes("saleve") || guessInput.toLowerCase().includes("salève")) {
      setSelectedMountain("Mont Salève");
      setIsCompleted(true);
      setShowError(false);
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
                    
                    {/* Enhanced SVG Table Illustration */}
                    <div className="flex justify-center mb-4">
                      <svg width="400" height="280" viewBox="0 0 400 280" className="border-2 border-stone-500 rounded-xl bg-gradient-to-b from-stone-100 to-stone-200 shadow-lg">
                        {/* Table base with perspective */}
                        <rect x="80" y="180" width="240" height="80" fill="#8B7355" stroke="#654321" strokeWidth="3" rx="8"/>
                        <rect x="85" y="175" width="230" height="15" fill="#A0855B" rx="5"/>
                        
                        {/* Orientation disc with enhanced details */}
                        <circle cx="200" cy="140" r="85" fill="#C4A747" stroke="#654321" strokeWidth="4"/>
                        <circle cx="200" cy="140" r="75" fill="#D4B857" stroke="#654321" strokeWidth="2"/>
                        
                        {/* Compass rose in center */}
                        <g transform="translate(200,140)">
                          <circle cx="0" cy="0" r="8" fill="#654321"/>
                          <text x="-3" y="5" fontSize="12" fill="white" fontWeight="bold">N</text>
                        </g>
                        
                        {/* Direction arrows and enhanced labels */}
                        
                        {/* Sud-Ouest - Mont Vuache */}
                        <g>
                          <line x1="140" y1="180" x2="110" y2="210" stroke="#8B4513" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                          <rect x="95" y="215" width="45" height="20" fill="white" stroke="#8B4513" rx="3"/>
                          <text x="117" y="228" fontSize="10" fill="#8B4513" fontWeight="bold" textAnchor="middle">Vuache</text>
                        </g>
                        
                        {/* Ouest - Mont Forchat */}
                        <g>
                          <line x1="115" y1="140" x2="80" y2="140" stroke="#8B4513" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                          <rect x="40" y="130" width="45" height="20" fill="white" stroke="#8B4513" rx="3"/>
                          <text x="62" y="143" fontSize="10" fill="#8B4513" fontWeight="bold" textAnchor="middle">Forchat</text>
                        </g>
                        
                        {/* Nord - Mont d'Or (Jura) */}
                        <g>
                          <line x1="200" y1="55" x2="200" y2="20" stroke="#8B4513" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                          <rect x="177" y="5" width="46" height="20" fill="white" stroke="#8B4513" rx="3"/>
                          <text x="200" y="18" fontSize="10" fill="#8B4513" fontWeight="bold" textAnchor="middle">Mont d'Or</text>
                        </g>
                        
                        {/* Est - Mont Salève (highlighted) */}
                        <g>
                          <line x1="285" y1="140" x2="320" y2="140" stroke="#B22222" strokeWidth="4" markerEnd="url(#arrowhead-red)"/>
                          <rect x="325" y="130" width="50" height="20" fill="#FFE4E1" stroke="#B22222" strokeWidth="2" rx="3"/>
                          <text x="350" y="143" fontSize="11" fill="#B22222" fontWeight="bold" textAnchor="middle">SALÈVE</text>
                        </g>
                        
                        {/* Sud-Est - Mont Billiat */}
                        <g>
                          <line x1="260" y1="180" x2="290" y2="210" stroke="#8B4513" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                          <rect x="295" y="215" width="45" height="20" fill="white" stroke="#8B4513" rx="3"/>
                          <text x="317" y="228" fontSize="10" fill="#8B4513" fontWeight="bold" textAnchor="middle">Billiat</text>
                        </g>
                        
                        {/* Nord-Ouest - Chablais region */}
                        <g>
                          <line x1="160" y1="100" x2="130" y2="70" stroke="#8B4513" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                          <rect x="115" y="60" width="40" height="20" fill="white" stroke="#8B4513" rx="3"/>
                          <text x="135" y="73" fontSize="10" fill="#8B4513" fontWeight="bold" textAnchor="middle">Ouzon</text>
                        </g>
                        
                        {/* Arrow marker definitions */}
                        <defs>
                          <marker id="arrowhead" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto">
                            <polygon points="0 0, 12 4.5, 0 9" fill="#8B4513"/>
                          </marker>
                          <marker id="arrowhead-red" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto">
                            <polygon points="0 0, 12 4.5, 0 9" fill="#B22222"/>
                          </marker>
                        </defs>
                        
                        {/* Decorative elements */}
                        <circle cx="200" cy="140" r="4" fill="#654321"/>
                        <text x="200" y="270" fontSize="12" fill="#654321" fontWeight="bold" textAnchor="middle">Table d'Orientation du Petit Môle</text>
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
                      
                      <div className="flex justify-center items-center space-x-4 mb-4">
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
                      
                      {/* Error Message */}
                      {showError && (
                        <div className="bg-orange-100 rounded-xl p-4 border-2 border-orange-300 animate-slideInUp">
                          <p className="text-orange-800 font-elvish font-bold text-center">
                            Essaye encore ! Regarde bien la devinette et l'illustration...
                          </p>
                        </div>
                      )}
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
                          onClick={() => setLocation("/journey-to-cross")}
                          className="bg-green-600 hover:bg-green-700 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-journey-to-cross"
                        >
                          Se rendre à l'étape finale
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