import { useState, useEffect } from "react";
import { ArrowLeft, Timer, MapPin, Mountain, Compass, Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useChronometer } from "@/hooks/use-chronometer";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

export default function OrientationTable() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const chronometer = useChronometer();
  
  // Content display states
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showTableFound, setShowTableFound] = useState(false);
  const [showClueChallenge, setShowClueChallenge] = useState(false);
  const [showMountainGame, setShowMountainGame] = useState(false);
  const [foundWord, setFoundWord] = useState("");
  const [selectedMountain, setSelectedMountain] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const storyText = "Tu as quitté l'ombre de la forêt. Devant toi, l'alpage s'ouvre et le sentier serpente vers le ciel. Là où les hommes ont dressé une pierre parlante, tourne-toi vers elle : elle montre du doigt les géants qui entourent le Petit Môle.";

  const forestClues = [
    { enigma: "Énigme des Arbres", clue: "BLANC" },
    { enigma: "Test Musical", clue: "OLYMPE" },
    { enigma: "Objet Secret", clue: "FUJI" }
  ];

  const mountains = [
    { name: "Mont Blanc", elevation: "4809m", direction: "Nord-Est" },
    { name: "Mont Fuji", elevation: "3776m", direction: "Est" },  
    { name: "Mont Olympe", elevation: "2917m", direction: "Sud-Est" },
    { name: "Mont Cervin", elevation: "4478m", direction: "Sud" },
    { name: "Mont Rose", elevation: "4634m", direction: "Sud-Ouest" },
    { name: "Jungfrau", elevation: "4158m", direction: "Ouest" }
  ];

  const handleTableFound = () => {
    setShowTableFound(true);
    setTimeout(() => {
      setShowClueChallenge(true);
    }, 2000);
  };

  const handleWordFound = () => {
    if (foundWord.toUpperCase() === "MONT") {
      setTimeout(() => {
        setShowMountainGame(true);
      }, 1000);
    }
  };

  const handleMountainSelection = (mountain: string) => {
    setSelectedMountain(mountain);
    // Check if it matches any of the forest clues
    const isCorrect = forestClues.some(clue => 
      mountain.toLowerCase().includes(clue.clue.toLowerCase())
    );
    
    if (isCorrect) {
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    // Start content display
    setTimeout(() => {
      setShowContent(true);
      
      // Typewriter effect
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < storyText.length) {
          setTypewriterText(storyText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            // Auto-trigger table found after story
            handleTableFound();
          }, 2000);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }, 1000);
  }, [storyText]);

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
          onClick={() => setLocation("/alpine-station")}
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
            {/* Story Card - Step 1 */}
            <div className="bg-blue-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-blue-300/50">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                  <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-blue-100 drop-shadow-sm">
                    Étape 1 — Trouver la table d'orientation
                  </h3>
                </div>
                
                {/* Typewriter Story Text */}
                <div className="relative mb-8">
                  <p className="text-lg leading-relaxed font-elvish text-blue-100 min-h-[100px] tracking-wide italic text-center">
                    {typewriterText}
                  </p>
                </div>

                {/* Table Found Alert */}
                {showTableFound && (
                  <div className="animate-slideInUp">
                    <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-6 text-center">
                      <div className="text-green-100 font-semibold mb-2">
                        🎯 Vous avez trouvé la table d'orientation !
                      </div>
                      <p className="text-green-200 text-sm italic">
                        L'app vibre... Vous êtes au bon endroit sur la crête du Petit Môle.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 - Clue Challenge */}
            {showClueChallenge && (
              <div className="animate-slideInUp">
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

                      {/* Forest Clues Display */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {forestClues.map((item, index) => (
                          <div key={index} className="bg-emerald-100 rounded-lg p-4 text-center border-2 border-emerald-300">
                            <h5 className="font-bold text-emerald-800 mb-2">{item.enigma}</h5>
                            <div className="text-xl font-elvish font-bold text-emerald-900">
                              {item.clue}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Word Input */}
                      <div className="text-center">
                        <p className="text-amber-800 font-elvish font-bold mb-4">
                          Quel mot unit ces trois noms ?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                          <input
                            type="text"
                            value={foundWord}
                            onChange={(e) => setFoundWord(e.target.value)}
                            placeholder="Tapez le mot de passe..."
                            className="px-4 py-2 border-2 border-amber-400 rounded-lg font-elvish text-lg focus:border-amber-600 focus:outline-none"
                            data-testid="input-password"
                          />
                          <button
                            onClick={handleWordFound}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-elvish font-bold py-2 px-6 rounded-lg transition-colors"
                            data-testid="button-submit-password"
                          >
                            Valider
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Mountain Selection Game */}
            {showMountainGame && (
              <div className="animate-slideInUp">
                <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-6 border-2 border-slate-300/50">
                  <div className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <Mountain className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-3xl sm:text-4xl font-elvish font-bold mb-3 text-slate-100 drop-shadow-sm">
                        Étape 3 — Choisir le bon mont
                      </h3>
                    </div>

                    <div className="bg-white/90 rounded-xl p-6 mb-6">
                      <p className="text-slate-800 font-elvish text-lg italic text-center mb-6">
                        "Parmi les sommets visibles depuis le Petit Môle, lequel correspond à l'un de tes indices de la forêt ?"
                      </p>

                      {/* Mountain Selection */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {mountains.map((mountain, index) => (
                          <button
                            key={index}
                            onClick={() => handleMountainSelection(mountain.name)}
                            className={`p-4 rounded-lg border-2 font-elvish transition-colors ${
                              selectedMountain === mountain.name
                                ? 'bg-blue-200 border-blue-500'
                                : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                            }`}
                            data-testid={`mountain-${mountain.name.toLowerCase().replace(' ', '-')}`}
                          >
                            <h5 className="font-bold text-slate-800 mb-2">{mountain.name}</h5>
                            <p className="text-sm text-slate-600">{mountain.elevation}</p>
                            <p className="text-xs text-slate-500">{mountain.direction}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Success Message */}
                    {isCompleted && (
                      <div className="bg-green-100/90 rounded-xl p-6 mb-6 border-2 border-green-300 animate-slideInUp">
                        <div className="text-center">
                          <Compass className="h-8 w-8 text-green-600 mx-auto mb-3" />
                          <h4 className="text-xl font-elvish font-bold text-green-800 mb-3">
                            Parfait ! Vous avez trouvé la connexion !
                          </h4>
                          <p className="text-green-700 font-elvish mb-4">
                            {selectedMountain} était effectivement l'un des indices récoltés dans la forêt. 
                            La table d'orientation révèle ses secrets...
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Continue Button */}
                    {isCompleted && (
                      <div className="text-center">
                        <button
                          onClick={() => setLocation("/final-dahu-encounter")}
                          className="bg-slate-700 hover:bg-slate-800 text-white font-elvish font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
                          data-testid="button-final-encounter"
                        >
                          Rencontrer le Dahu Blanc
                        </button>
                      </div>
                    )}
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
      `}</style>
    </div>
  );
}