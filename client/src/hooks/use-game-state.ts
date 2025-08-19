import { useState, useEffect } from "react";

export interface GameProgress {
  userId: string;
  missionId: string;
  currentChapter: number;
  currentRiddle: number;
  completedChapters: number[];
  score: number;
  timeSpent: number;
  hintsUsed: number;
  startTime?: number;
  isCompleted: boolean;
}

const defaultProgress: GameProgress = {
  userId: "demo-user",
  missionId: "panique-au-mole",
  currentChapter: 1,
  currentRiddle: 1,
  completedChapters: [],
  score: 0,
  timeSpent: 0,
  hintsUsed: 0,
  isCompleted: false,
};

export function useGameState() {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem("trail-quest-progress");
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("trail-quest-progress", JSON.stringify(progress));
  }, [progress]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => {
    setProgress(prev => ({ ...prev, startTime: Date.now() }));
    setTimer(0);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setProgress(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + timer,
    }));
  };

  const updateProgress = (updates: Partial<GameProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const completeChapter = (chapterNum: number) => {
    setProgress(prev => ({
      ...prev,
      completedChapters: [...prev.completedChapters, chapterNum],
      currentChapter: chapterNum + 1,
      currentRiddle: 1,
    }));
  };

  const addScore = (points: number) => {
    setProgress(prev => ({ ...prev, score: prev.score + points }));
  };

  const useHint = () => {
    setProgress(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      score: Math.max(0, prev.score - 25),
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isChapterUnlocked = (chapterNum: number): boolean => {
    return chapterNum === 1 || progress.completedChapters.includes(chapterNum - 1);
  };

  const getProgressPercentage = (): number => {
    const totalChapters = 2;
    return (progress.completedChapters.length / totalChapters) * 100;
  };

  return {
    progress,
    timer,
    isTimerRunning,
    startTimer,
    stopTimer,
    updateProgress,
    completeChapter,
    addScore,
    useHint,
    resetProgress,
    formatTime,
    isChapterUnlocked,
    getProgressPercentage,
  };
}
