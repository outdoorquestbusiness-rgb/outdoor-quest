import { useState, useEffect } from "react";
import { ArrowLeft, List, Check, Lightbulb, Flag, Timer } from "lucide-react";
import { useLocation } from "wouter";
import { useGameState } from "@/hooks/use-game-state";
import { getCurrentRiddle, chapters } from "@/data/riddles";
import { Modal, ModalContent, ModalActions } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import moleMountainImage from "@assets/generated_images/Mont_Môle_mountain_background_c0472772.png";

interface RiddlePageProps {
  chapterNumber: number;
  riddleNumber: number;
}

export default function RiddlePage({
  chapterNumber,
  riddleNumber,
}: RiddlePageProps) {
  const [, setLocation] = useLocation();
  const [answer, setAnswer] = useState("");
  const [showHintModal, setShowHintModal] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);

  const {
    progress,
    timer,
    formatTime,
    addScore,
    useHint,
    updateProgress,
    completeChapter,
  } = useGameState();
  const { toast } = useToast();

  const currentRiddle = getCurrentRiddle(chapterNumber, riddleNumber);
  const chapter = chapters.find((c) => c.number === chapterNumber);

  useEffect(() => {
    // Update current progress when component loads
    updateProgress({
      currentChapter: chapterNumber,
      currentRiddle: riddleNumber,
    });
  }, [chapterNumber, riddleNumber]); // Removed updateProgress from dependencies to prevent infinite loop

  const { t } = useLanguage();

  // Auto-start timer when riddle loads
  useEffect(() => {
    // Import the game state hook properly
  }, [chapterNumber, riddleNumber]);

  if (!currentRiddle || !chapter) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})`,
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Riddle Not Found
          </h2>
          <button
            onClick={() => setLocation("/mission-intro")}
            className="bg-forest text-white px-6 py-3 rounded-xl hover:bg-forest/90 transition-colors"
          >
            Back to Mission
          </button>
        </div>
      </div>
    );
  }

  const checkAnswer = () => {
    const userAnswer =
      typeof currentRiddle.answer === "number"
        ? parseInt(answer)
        : answer.toLowerCase().trim();

    const correctAnswer =
      typeof currentRiddle.answer === "number"
        ? currentRiddle.answer
        : currentRiddle.answer.toLowerCase().trim();

    if (userAnswer === correctAnswer) {
      // Calculate bonus points for speed (under 60 seconds gets bonus)
      const bonusPoints = timer < 60 ? 50 : 0;
      const totalPoints = currentRiddle.points + bonusPoints;

      addScore(totalPoints);

      toast({
        title: "🎉 Excellent !",
        description: `+${totalPoints} points${bonusPoints ? " (bonus vitesse inclus!)" : ""} • Énigme résolue !`,
      });

      // Progress to next riddle or complete chapter
      setTimeout(() => {
        if (riddleNumber < chapter.riddleCount) {
          // Next riddle in same chapter with transition message
          toast({
            title: "✨ Énigme suivante",
            description: `Progression vers énigme ${riddleNumber + 1}/${chapter.riddleCount}`,
          });
          setLocation(
            `/riddle/chapter/${chapterNumber}/riddle/${riddleNumber + 1}`,
          );
        } else {
          // Chapter completed with accomplishment feeling
          completeChapter(chapterNumber);

          if (chapterNumber < chapters.length) {
            // More chapters available - go to next chapter directly
            toast({
              title: "🏆 Chapitre terminé !",
              description: `Bravo ! Passage au chapitre ${chapterNumber + 1}`,
            });
            setLocation(`/riddle/chapter/${chapterNumber + 1}/riddle/1`);
          } else {
            // Game complete
            updateProgress({ isCompleted: true });
            toast({
              title: "🎉 Mission accomplie !",
              description:
                "Félicitations ! Vous avez terminé toute l'aventure !",
            });
            setLocation("/game-end");
          }
        }
      }, 2000);
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  const handleHint = () => {
    useHint();
    setShowHintModal(true);
  };

  const handleGiveUp = () => {
    setShowGiveUpModal(true);
  };

  const continueAfterGiveUp = () => {
    setShowGiveUpModal(false);
    setTimeout(() => {
      if (riddleNumber < chapter.riddleCount) {
        setLocation(
          `/riddle/chapter/${chapterNumber}/riddle/${riddleNumber + 1}`,
        );
      } else {
        /*
        completeChapter(chapterNumber);
        if (chapterNumber < chapters.length) {
          setLocation("/chapter-summary");
        } else {
          updateProgress({ isCompleted: true });
          setLocation("/game-end");
        }*/
        updateProgress({ isCompleted: true });
        setLocation("/game-end");
      }
    }, 500);
  };

  const progressPercentage = ((riddleNumber - 1) / chapter.riddleCount) * 100;

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      tree: <i className="fas fa-tree text-white text-2xl"></i>,
      mountain: <i className="fas fa-mountain text-white text-2xl"></i>,
      feather: <i className="fas fa-feather text-white text-2xl"></i>,
      "volume-2": <i className="fas fa-volume-up text-white text-2xl"></i>,
      gem: <i className="fas fa-gem text-white text-2xl"></i>,
      "scroll-text": <i className="fas fa-scroll text-white text-2xl"></i>,
      crown: <i className="fas fa-crown text-white text-2xl"></i>,
    };
    return (
      iconMap[iconName] || (
        <i className="fas fa-question text-white text-2xl"></i>
      )
    );
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${moleMountainImage})`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={() => setLocation("/mission-intro")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-white drop-shadow-lg">
            Chapitre {chapterNumber}
          </h2>
          <p className="text-xs text-white/80">
            Énigme {riddleNumber}/{chapter.riddleCount}
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="progress-bar h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Riddle Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/50">
          {/* Riddle Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-forest to-mountain rounded-full flex items-center justify-center mx-auto mb-4">
              {getIcon(currentRiddle.icon)}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {currentRiddle.title}
            </h3>
            <p className="text-slate-600 text-sm">
              {currentRiddle.description}
            </p>
          </div>

          {/* Riddle Text */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <i className="fas fa-question-circle text-3xl text-forest mb-4"></i>
              <p className="text-slate-700 leading-relaxed">
                {currentRiddle.question}
              </p>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Votre réponse
            </label>
            <input
              type={
                typeof currentRiddle.answer === "number" ? "number" : "text"
              }
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-forest/20 focus:border-forest text-center text-xl font-semibold"
              placeholder="?"
              onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={checkAnswer}
              disabled={!answer.trim()}
              className="w-full bg-forest hover:bg-forest/90 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              data-testid="button-check"
            >
              <Check className="h-4 w-4 mr-2 inline" />
              {t("check")}
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleHint}
                disabled={progress.hintsUsed >= 1}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all duration-200"
                data-testid="button-hint"
              >
                <Lightbulb className="h-4 w-4 mr-2 inline" />
                {t("hint")} (-25 pts)
              </button>
              <button
                onClick={handleGiveUp}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all duration-200"
                data-testid="button-solution"
              >
                <Flag className="h-4 w-4 mr-2 inline" />
                {t("give.up")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center">
          <Timer className="h-4 w-4 text-slate-600 mr-2" />
          <span className="font-mono text-sm">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Hint Modal */}
      <Modal
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        title="Indice"
      >
        <ModalContent>
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-slate-700 text-center">{currentRiddle.hint}</p>
          </div>
        </ModalContent>
        <ModalActions>
          <button
            onClick={() => setShowHintModal(false)}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Fermer
          </button>
        </ModalActions>
      </Modal>

      {/* Give Up Modal */}
      <Modal
        isOpen={showGiveUpModal}
        onClose={() => setShowGiveUpModal(false)}
        title={t("give.up")}
      >
        <ModalContent>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-slate-700 text-center mb-2">
              La réponse était :
            </p>
            <div className="text-2xl font-bold text-red-600 text-center">
              {currentRiddle.answer}
            </div>
          </div>
        </ModalContent>
        <ModalActions>
          <button
            onClick={() => setShowGiveUpModal(false)}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={continueAfterGiveUp}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Continuer
          </button>
        </ModalActions>
      </Modal>
    </div>
  );
}
