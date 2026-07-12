class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggle(force?: boolean) {
    this.enabled = force !== undefined ? force : !this.enabled;
    if (this.enabled) {
      this.init();
    }
    return this.enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  private playTone(freqs: number[], duration: number, type: OscillatorType = "sine", delay = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const context = this.ctx;
    setTimeout(() => {
      try {
        const osc = context.createOscillator();
        const gainNode = context.createGain();

        osc.type = type;
        osc.connect(gainNode);
        gainNode.connect(context.destination);

        const now = context.currentTime;
        
        if (freqs.length === 1) {
          osc.frequency.setValueAtTime(freqs[0], now);
        } else if (freqs.length > 1) {
          osc.frequency.setValueAtTime(freqs[0], now);
          const step = duration / (freqs.length - 1);
          for (let i = 1; i < freqs.length; i++) {
            osc.frequency.exponentialRampToValueAtTime(freqs[i], now + i * step);
          }
        }

        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.start(now);
        osc.stop(now + duration + 0.05);
      } catch (e) {
        console.warn("Audio play issue:", e);
      }
    }, delay * 1000);
  }

  public click() {
    this.playTone([600, 800], 0.08, "triangle");
  }

  public select() {
    this.playTone([400, 900], 0.15, "sine");
  }

  public nodeUnlock() {
    this.playTone([440, 554, 659, 880], 0.3, "sine");
  }

  public levelUp() {
    const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, index) => {
      this.playTone([freq, freq * 1.5], 0.4, "sine", index * 0.06);
    });
  }

  public achievement() {
    this.playTone([523.25, 783.99, 1046.50, 1318.51], 0.4, "triangle");
  }

  public error() {
    this.playTone([180, 120], 0.25, "sawtooth");
  }

  public questComplete() {
    this.playTone([440, 554, 659, 880, 1109], 0.35, "sine");
  }

  public transmit() {
    // Pulse beep
    this.playTone([1000, 1500, 1200], 0.2, "sine");
    this.playTone([1500, 2000, 1800], 0.2, "sine", 0.15);
  }
}

export const sound = new SoundManager();
