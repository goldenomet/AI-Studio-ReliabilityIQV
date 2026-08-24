export class AmbientSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;
  public isPlaying = false;

  async start() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);
    
    this.masterGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 3);

    // Create a calming ambient chord
    const frequencies = [110, 164.81, 220, 277.18]; // A2, E3, A3, C#4
    
    frequencies.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const pan = this.ctx!.createStereoPanner();
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.2; // Slow drift
      lfoGain.gain.value = 0.5;
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency); 
      
      pan.pan.value = (Math.random() * 2) - 1;
      
      osc.connect(pan);
      pan.connect(this.masterGain!);
      
      osc.start();
      lfo.start();
      
      this.oscillators.push(osc, lfo);
    });
  }

  async playClickSound() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    
    // Fade out smoothly
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
    
    setTimeout(() => {
      this.oscillators.forEach(osc => osc.stop());
      this.oscillators = [];
      this.isPlaying = false;
    }, 2000);
  }
}

export const ambientSynth = new AmbientSynth();
