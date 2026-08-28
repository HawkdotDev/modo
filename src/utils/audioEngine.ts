// Web Audio Synthesized Chimes & Ambient Focus Soundscape Engine

export type ChimeStyle = 'zen' | 'digital' | 'marimba' | 'bowl';
export type SoundscapeType = 'none' | 'rain' | 'waves' | 'brown' | 'binaural';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private soundscapeGain: GainNode | null = null;
  private activeSoundscapeType: SoundscapeType = 'none';
  private soundscapeNodes: (AudioNode | number)[] = [];
  private masterVolume: number = 0.7;
  private soundscapeVolume: number = 0.5;
  private suspendTimeout: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.suspendTimeout !== null) {
      clearTimeout(this.suspendTimeout);
      this.suspendTimeout = null;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private scheduleAutoSuspend(delayMs: number = 4000) {
    if (this.suspendTimeout !== null) {
      clearTimeout(this.suspendTimeout);
    }
    this.suspendTimeout = window.setTimeout(() => {
      if (this.ctx && this.ctx.state === 'running' && this.activeSoundscapeType === 'none') {
        this.ctx.suspend().catch(() => {});
      }
      this.suspendTimeout = null;
    }, delayMs);
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  public setSoundscapeVolume(vol: number) {
    this.soundscapeVolume = Math.max(0, Math.min(1, vol));
    if (this.soundscapeGain && this.ctx) {
      this.soundscapeGain.gain.setValueAtTime(this.soundscapeVolume * 0.4, this.ctx.currentTime);
    }
  }

  // Audio Ducking: Temporarily lowers background music & ambient audio when chimes play
  public duckAudio(durationMs: number = 2800) {
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('modo-audio-duck', { detail: { durationMs } }));
      }

      if (this.soundscapeGain && this.ctx) {
        const now = this.ctx.currentTime;
        const targetVol = this.soundscapeVolume * 0.4;
        const duckedVol = targetVol * 0.15;

        this.soundscapeGain.gain.cancelScheduledValues(now);
        this.soundscapeGain.gain.setValueAtTime(this.soundscapeGain.gain.value, now);
        this.soundscapeGain.gain.linearRampToValueAtTime(duckedVol, now + 0.15);
        this.soundscapeGain.gain.setValueAtTime(duckedVol, now + durationMs / 1000 - 0.4);
        this.soundscapeGain.gain.linearRampToValueAtTime(targetVol, now + durationMs / 1000);
      }
    } catch (err) {
      console.warn('Audio ducking error:', err);
    }
  }

  // Synthesized Completion Chimes
  public playChime(
    style: ChimeStyle = 'zen',
    type: 'work' | 'break' | 'session' | 'test' = 'test',
    volume: number = this.masterVolume
  ) {
    try {
      // Duck background audio automatically
      this.duckAudio(type === 'session' ? 3500 : 2500);

      const ctx = this.getContext();
      const vol = Math.max(0.01, volume * 0.4);

      if (style === 'digital') {
        const freqs = type === 'work' ? [440, 554.37, 659.25] : type === 'break' ? [659.25, 554.37, 440] : [440, 554.37, 659.25, 880];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
          gain.gain.linearRampToValueAtTime(vol * 0.8, ctx.currentTime + i * 0.1 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.1 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.1);
          osc.stop(ctx.currentTime + i * 0.1 + 0.25);
        });
      } else if (style === 'marimba') {
        const freqs = type === 'work' ? [523.25, 659.25, 783.99] : type === 'break' ? [783.99, 659.25, 523.25] : [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(vol, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
      } else if (style === 'bowl') {
        // Singing Bowl resonance with warm beating
        const root = type === 'work' ? 432 : type === 'break' ? 384 : 528;
        [root, root + 1.5, root * 2].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(vol * (i === 0 ? 0.7 : 0.3), ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 2.5);
        });
      } else {
        // Default Zen Bell Chime
        const notes = type === 'work' 
          ? [523.25, 659.25, 783.99] 
          : type === 'break' 
          ? [783.99, 659.25, 523.25] 
          : [523.25, 659.25, 783.99, 1046.5];

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
          gain.gain.linearRampToValueAtTime(vol * 0.7, ctx.currentTime + idx * 0.15 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.15 + 2.0);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 2.0);
        });
      }

      this.scheduleAutoSuspend(style === 'bowl' ? 3500 : 2500);
    } catch (err) {
      console.warn('Chime generation error:', err);
    }
  }

  // Focus Ambient Soundscapes
  public startSoundscape(type: SoundscapeType) {
    this.stopSoundscape();
    if (type === 'none') {
      return;
    }

    try {
      const ctx = this.getContext();
      this.activeSoundscapeType = type;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(this.soundscapeVolume * 0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      this.soundscapeGain = masterGain;

      if (type === 'brown') {
        // Brownian Deep Focus Noise
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start(0);
        this.soundscapeNodes = [whiteNoise, filter];
      } else if (type === 'rain') {
        // Gentle Rain Sound Generator
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const rainSource = ctx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.Q.setValueAtTime(0.6, ctx.currentTime);

        rainSource.connect(filter);
        filter.connect(masterGain);
        rainSource.start(0);
        this.soundscapeNodes = [rainSource, filter];
      } else if (type === 'waves') {
        // Ocean Swell Waves Generator (LFO Modulated Pink Noise)
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.0;
        }

        const waveNoise = ctx.createBufferSource();
        waveNoise.buffer = noiseBuffer;
        waveNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        // LFO for wave swelling
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave period

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        waveNoise.connect(filter);
        filter.connect(masterGain);

        waveNoise.start(0);
        lfo.start(0);
        this.soundscapeNodes = [waveNoise, filter, lfo, lfoGain];
      } else if (type === 'binaural') {
        // 432Hz Carrier with 10Hz Alpha Focus Binaural Beat (Left & Right Split)
        const leftOsc = ctx.createOscillator();
        const rightOsc = ctx.createOscillator();

        leftOsc.type = 'sine';
        leftOsc.frequency.setValueAtTime(216, ctx.currentTime); // 216Hz Left

        rightOsc.type = 'sine';
        rightOsc.frequency.setValueAtTime(226, ctx.currentTime); // 226Hz Right -> 10Hz Alpha Difference

        const merger = ctx.createChannelMerger(2);
        leftOsc.connect(merger, 0, 0);
        rightOsc.connect(merger, 0, 1);

        merger.connect(masterGain);
        leftOsc.start(0);
        rightOsc.start(0);
        this.soundscapeNodes = [leftOsc, rightOsc, merger];
      }
    } catch (err) {
      console.warn('Soundscape startup error:', err);
    }
  }

  public stopSoundscape() {
    this.soundscapeNodes.forEach((node) => {
      if (typeof node === 'object' && node !== null) {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try {
            (node as AudioScheduledSourceNode).stop();
          } catch (e) {
            console.debug('Node stop notice:', e);
          }
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          try {
            node.disconnect();
          } catch (e) {
            console.debug('Node disconnect notice:', e);
          }
        }
      }
    });
    this.soundscapeNodes = [];
    this.activeSoundscapeType = 'none';
    this.scheduleAutoSuspend(1500);
  }

  public getActiveSoundscape(): SoundscapeType {
    return this.activeSoundscapeType;
  }
}

export const audioEngine = new AudioEngine();
