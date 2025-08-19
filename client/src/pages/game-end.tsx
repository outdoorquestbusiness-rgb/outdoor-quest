import { Trophy, RotateCcw, Home, Medal } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useGameState } from "@/hooks/use-game-state";

export default function GameEnd() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { progress, resetProgress, formatTime } = useGameState();

  const totalTime = progress.timeSpent;
  const averageTimePerRiddle = Math.round(totalTime / 7); // 7 total riddles
  const rank = Math.floor(Math.random() * 50) + 3; // Random rank between 3-52
  const totalPlayers = 127;

  const handlePlayAgain = () => {
    resetProgress();
    setLocation("/chapter-summary");
  };

  const handleBackToMissions = () => {
    resetProgress();
    setLocation("/missions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest/5 to-mountain/5 p-6 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Celebration Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-forest to-mountain p-6 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-yellow-300" />
            </div>
            <h2 className="text-2xl font-merriweather font-black mb-2">
              {t("congratulations")}
            </h2>
            <p className="text-white/90">{t("mystery.solved")}</p>
          </div>

          <div className="p-6">
            {/* Score Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                {t("your.performance")}
              </h3>

              <div className="space-y-4">
                {/* Total Score */}
                <div className="bg-gradient-to-r from-forest/10 to-mountain/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-forest mb-1">
                    {progress.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    {t("total.points")}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-slate-800">
                      {formatTime(totalTime)}
                    </div>
                    <div className="text-xs text-slate-600">
                      {t("total.time")}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-slate-800">
                      {formatTime(averageTimePerRiddle)}
                    </div>
                    <div className="text-xs text-slate-600">
                      {t("average.riddle")}
                    </div>
                  </div>
                </div>

                {/* Ranking */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                        <Medal className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {t("rank")}
                        </div>
                        <div className="text-xs text-slate-600">
                          {t("this.month")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-700">
                        #{rank}
                      </div>
                      <div className="text-xs text-slate-600">
                        sur {totalPlayers}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePlayAgain}
                className="w-full bg-gradient-to-r from-forest to-mountain text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="h-5 w-5 mr-2 inline" />
                {t("play.again")}
              </button>

              <button
                onClick={handleBackToMissions}
                className="w-full bg-white border-2 border-forest text-forest font-semibold py-4 px-6 rounded-xl hover:bg-forest hover:text-white transition-all duration-200"
              >
                <Home className="h-5 w-5 mr-2 inline" />
                {t("back.to.missions")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
