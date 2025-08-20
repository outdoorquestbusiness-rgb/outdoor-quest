// Audio utility functions for generating sounds
export function createIntriguingSound(duration: number = 2000): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create horror movie scene transition sound effect (like a "whoosh" or "sting")
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    
    // Connect nodes
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure oscillator for horror movie sting effect
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(40, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + duration / 1000);
    
    // Configure filter for dramatic effect
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, audioContext.currentTime);
    filterNode.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + duration / 1000);
    filterNode.Q.setValueAtTime(5, audioContext.currentTime);
    
    // Configure dramatic volume envelope (classic horror sting)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
    
    // Start and stop oscillator
    const startTime = audioContext.currentTime;
    const endTime = startTime + duration / 1000;
    
    oscillator.start(startTime);
    oscillator.stop(endTime);
    
  } catch (error) {
    console.log('Audio not available in this environment');
  }
}

export function playNotificationBeep(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log('Audio not available in this environment');
  }
}