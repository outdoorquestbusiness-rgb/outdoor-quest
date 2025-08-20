// Audio utility functions for generating sounds
export function createIntriguingSound(duration: number = 1500): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a haunting, mysterious sound effect
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure first oscillator (low mysterious tone)
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + duration / 1000);
    
    // Configure second oscillator (higher eerie tone)
    oscillator2.type = 'triangle';
    oscillator2.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + duration / 1000);
    
    // Configure volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + duration / 2000);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
    
    // Start and stop oscillators
    const startTime = audioContext.currentTime;
    const endTime = startTime + duration / 1000;
    
    oscillator1.start(startTime);
    oscillator2.start(startTime);
    
    oscillator1.stop(endTime);
    oscillator2.stop(endTime);
    
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