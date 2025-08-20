import { useState, useEffect, useRef } from 'react';

export function useChronometer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    const savedStartTime = localStorage.getItem('missionStartTime');
    if (savedStartTime && !isRunning) {
      const savedTime = parseInt(savedStartTime);
      setStartTime(savedTime);
      setIsRunning(true);
    }
  }, []);

  const start = () => {
    if (!isRunning) {
      const savedStartTime = localStorage.getItem('missionStartTime');
      const now = savedStartTime ? parseInt(savedStartTime) : Date.now();
      
      if (!savedStartTime) {
        localStorage.setItem('missionStartTime', now.toString());
      }
      
      setStartTime(now);
      setIsRunning(true);
    }
  };

  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setStartTime(null);
    setElapsedTime(0);
  };

  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100); // Update every 100ms for smooth display
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return {
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    isRunning,
    start,
    stop,
    reset
  };
}