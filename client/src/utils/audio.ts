// Audio utility functions for generating sounds
export function createIntriguingSound(duration: number = 2000): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create mysterious polyphonic melody
    const oscillators: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];
    
    // Mysterious chord progression (minor keys for mystical feeling)
    const frequencies = [
      [220, 261.63, 329.63], // A minor chord
      [246.94, 293.66, 369.99], // B minor chord  
      [196, 246.94, 293.66] // G minor chord
    ];
    
    frequencies.forEach((chord, chordIndex) => {
      chord.forEach((freq, noteIndex) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillators.push(oscillator);
        gainNodes.push(gainNode);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        const startDelay = chordIndex * 0.6;
        const noteDuration = 0.8;
        
        // Soft envelope for ethereal sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + startDelay);
        gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + startDelay + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + startDelay + noteDuration * 0.7);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + startDelay + noteDuration);
        
        oscillator.start(audioContext.currentTime + startDelay);
        oscillator.stop(audioContext.currentTime + startDelay + noteDuration);
      });
    });
    
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