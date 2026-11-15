// Web Audio API Synthesizer for Spacecraft Audio Telemetry & Alarms
class SoundTelemetry {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.emergencyOsc = null;
    this.isEmergencyPlaying = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isEmergencyPlaying) {
      this.stopEmergencyAlarm();
    }
    return this.isMuted;
  }

  playHeartBeep(isCritical = false) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isCritical ? 880 : 640, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isCritical ? 440 : 320, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Autoplay fallback
    }
  }

  playCautionChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [880, 1108].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0.06, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.28);
      });
    } catch {}
  }

  startEmergencyAlarm() {
    if (this.isMuted || this.isEmergencyPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.isEmergencyPlaying = true;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);

      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(2.5, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(250, now);
      lfo.connect(osc.frequency);

      gain.gain.setValueAtTime(0.08, now);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      lfo.start();
      osc.start();

      this.emergencyOsc = { osc, lfo, gain };
    } catch {}
  }

  stopEmergencyAlarm() {
    if (this.emergencyOsc) {
      try {
        this.emergencyOsc.osc.stop();
        this.emergencyOsc.lfo.stop();
        this.emergencyOsc.osc.disconnect();
      } catch {}
      this.emergencyOsc = null;
    }
    this.isEmergencyPlaying = false;
  }
}

export const soundTelemetry = new SoundTelemetry();
