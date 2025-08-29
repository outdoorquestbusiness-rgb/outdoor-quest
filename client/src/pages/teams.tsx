import { useState } from "react";
import { ArrowLeft, Users, Plus, X, Lock, LockOpen } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

export default function Teams() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Team creation states
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleCreateTeam = () => {
    setShowCreateTeam(true);
  };

  const handleAddParticipant = () => {
    if (currentParticipant.trim() && !participants.includes(currentParticipant.trim())) {
      setParticipants([...participants, currentParticipant.trim()]);
      setCurrentParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  const handleValidateTeam = () => {
    if (teamName.trim() && participants.length > 0) {
      setIsValidating(true);
      
      // Animation effect before redirect
      setTimeout(() => {
        setLocation("/rules");
      }, 2000);
    }
  };

  const canValidate = teamName.trim() && participants.length > 0;

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${mountainBgImage})` 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => setLocation("/missions")}
          className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-elvish font-bold text-white drop-shadow-lg">
          Formation d'Équipe
        </h1>
        
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {/* Immersive Introduction */}
        <div className="bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 border-2 border-purple-400/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-purple-400/50">
              <Users className="h-10 w-10 text-purple-300" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-elvish font-bold text-purple-100 mb-4">
              L'aventure commence...
            </h2>
            
            <div className="bg-purple-800/30 rounded-xl p-4 border border-purple-400/30 mb-6">
              <p className="text-purple-200 font-elvish text-lg italic leading-relaxed">
                "Nul ne s'échappe seul de cette mystérieuse montagne ! 
                Assemble ton équipe d'aventuriers avant d'entrer dans la salle des règles. 
                Chaque membre apportera ses compétences uniques pour résoudre les énigmes du Dahu Blanc."
              </p>
            </div>

            {!showCreateTeam && (
              <button
                onClick={handleCreateTeam}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-elvish font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                data-testid="button-create-team"
              >
                <Plus className="h-6 w-6 mr-3 inline-block" />
                Créer une équipe
              </button>
            )}
          </div>
        </div>

        {/* Team Creation Form */}
        {showCreateTeam && (
          <div className="animate-slideInUp">
            <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-amber-300/50">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-elvish font-bold text-amber-800 mb-2">
                  📜 Parchemin d'Inscription
                </h3>
                <p className="text-amber-700 italic">
                  Inscris le nom de ton équipe sur ce parchemin mystique
                </p>
              </div>

              {/* Team Name Input */}
              <div className="mb-8">
                <label className="block text-amber-800 font-elvish font-bold mb-3 text-lg">
                  Nom de l'équipe :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Les Chasseurs de Dahu..."
                    className="w-full px-4 py-3 bg-amber-100/80 border-2 border-amber-400 rounded-xl font-elvish text-lg text-amber-900 placeholder-amber-600 focus:border-amber-600 focus:outline-none shadow-inner"
                    style={{
                      backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(184, 134, 11, 0.1) 50%, transparent 60%)`,
                      backgroundSize: '20px 20px'
                    }}
                    data-testid="input-team-name"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-xl" 
                       style={{
                         backgroundImage: `radial-gradient(circle at 20% 30%, rgba(184, 134, 11, 0.1) 0%, transparent 50%), 
                                          radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)`
                       }}>
                  </div>
                </div>
              </div>

              {/* Participants Section */}
              <div className="mb-8">
                <label className="block text-amber-800 font-elvish font-bold mb-3 text-lg">
                  Membres de l'équipe :
                </label>
                
                {/* Add Participant Input */}
                <div className="flex space-x-3 mb-4">
                  <input
                    type="text"
                    value={currentParticipant}
                    onChange={(e) => setCurrentParticipant(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nom de l'aventurier..."
                    className="flex-1 px-4 py-2 bg-white/80 border-2 border-amber-300 rounded-lg font-elvish text-amber-900 placeholder-amber-600 focus:border-amber-500 focus:outline-none"
                    data-testid="input-participant-name"
                  />
                  <button
                    onClick={handleAddParticipant}
                    disabled={!currentParticipant.trim()}
                    className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    data-testid="button-add-participant"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Participants List */}
                {participants.length > 0 && (
                  <div className="bg-white/70 rounded-xl p-4 border-2 border-amber-300/50">
                    <p className="text-amber-800 font-elvish font-bold mb-3 text-sm">
                      🥾 Aventuriers inscrits :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {participants.map((participant, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full shadow-lg animate-slideInUp"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="font-elvish mr-2">🧗‍♂️ {participant}</span>
                          <button
                            onClick={() => handleRemoveParticipant(index)}
                            className="hover:bg-white/20 rounded-full p-1 transition-colors"
                            data-testid={`button-remove-participant-${index}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Button */}
              <div className="text-center">
                {!isValidating ? (
                  <button
                    onClick={handleValidateTeam}
                    disabled={!canValidate}
                    className={`font-elvish font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 ${
                      canValidate
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white hover:scale-105'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                    data-testid="button-validate-team"
                  >
                    <Lock className="h-6 w-6 mr-3 inline-block" />
                    {canValidate ? 'Verrouiller l\'équipe' : 'Équipe incomplète'}
                  </button>
                ) : (
                  <div className="bg-green-100 rounded-xl p-6 border-2 border-green-400 animate-pulse">
                    <div className="text-center">
                      <LockOpen className="h-12 w-12 text-green-600 mx-auto mb-3 animate-bounce" />
                      <h4 className="text-xl font-elvish font-bold text-green-800 mb-2">
                        🔓 Équipe verrouillée !
                      </h4>
                      <p className="text-green-700 font-elvish">
                        Les portes de la salle des règles s'ouvrent...
                      </p>
                      <div className="mt-4 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      </div>
                    </div>
                  </div>
                )}

                {canValidate && !isValidating && (
                  <p className="text-amber-700 font-elvish text-sm mt-3 italic">
                    ✨ Votre équipe de {participants.length} aventurier{participants.length > 1 ? 's' : ''} est prête !
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
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