// Audio utility functions for generating forest sounds
export function createIntriguingSound(duration: number = 2000): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create forest ambiance with wind, tree creaking, and subtle animal sounds
    const oscillators: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];
    const filterNodes: BiquadFilterNode[] = [];
    
    // Wind sound - low frequency noise
    const windOsc = audioContext.createOscillator();
    const windGain = audioContext.createGain();
    const windFilter = audioContext.createBiquadFilter();
    
    windOsc.type = 'sawtooth';
    windOsc.frequency.setValueAtTime(40, audioContext.currentTime);
    windOsc.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + duration / 1000);
    
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(200, audioContext.currentTime);
    windFilter.Q.setValueAtTime(1, audioContext.currentTime);
    
    windOsc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(audioContext.destination);
    
    windGain.gain.setValueAtTime(0, audioContext.currentTime);
    windGain.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 0.2);
    windGain.gain.exponentialRampToValueAtTime(0.02, audioContext.currentTime + duration / 2000);
    windGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
    
    // Tree creaking sounds - periodic mid frequency
    for (let i = 0; i < 3; i++) {
      const creakOsc = audioContext.createOscillator();
      const creakGain = audioContext.createGain();
      const creakFilter = audioContext.createBiquadFilter();
      
      creakOsc.type = 'square';
      creakOsc.frequency.setValueAtTime(150 + i * 50, audioContext.currentTime);
      
      creakFilter.type = 'bandpass';
      creakFilter.frequency.setValueAtTime(300 + i * 100, audioContext.currentTime);
      creakFilter.Q.setValueAtTime(3, audioContext.currentTime);
      
      creakOsc.connect(creakFilter);
      creakFilter.connect(creakGain);
      creakGain.connect(audioContext.destination);
      
      const startDelay = 0.3 + i * 0.4;
      const creakDuration = 0.3;
      
      creakGain.gain.setValueAtTime(0, audioContext.currentTime + startDelay);
      creakGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startDelay + 0.05);
      creakGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + startDelay + creakDuration);
      
      creakOsc.start(audioContext.currentTime + startDelay);
      creakOsc.stop(audioContext.currentTime + startDelay + creakDuration);
    }
    
    // Subtle bird call - high frequency
    const birdOsc = audioContext.createOscillator();
    const birdGain = audioContext.createGain();
    
    birdOsc.type = 'sine';
    birdOsc.frequency.setValueAtTime(800, audioContext.currentTime + 1.2);
    birdOsc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 1.4);
    birdOsc.frequency.exponentialRampToValueAtTime(700, audioContext.currentTime + 1.6);
    
    birdOsc.connect(birdGain);
    birdGain.connect(audioContext.destination);
    
    birdGain.gain.setValueAtTime(0, audioContext.currentTime + 1.2);
    birdGain.gain.exponentialRampToValueAtTime(0.008, audioContext.currentTime + 1.25);
    birdGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.6);
    
    windOsc.start(audioContext.currentTime);
    windOsc.stop(audioContext.currentTime + duration / 1000);
    
    birdOsc.start(audioContext.currentTime + 1.2);
    birdOsc.stop(audioContext.currentTime + 1.6);
    
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