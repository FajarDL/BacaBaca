import { useState, useEffect, useRef, useCallback } from 'react';
import type { AmbientSoundType } from '../types';

export function useAmbientSound() {
  const [currentSound, setCurrentSound] = useState<AmbientSoundType>('off');
  const [volume, setVolume] = useState<number>(0.35); // 0 to 1
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ stop: () => void } | null>(null);

  // Initialize or get AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Update volume smoothly
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  // Clean up existing sound generator
  const stopCurrentSound = useCallback(() => {
    if (activeNodesRef.current) {
      try {
        activeNodesRef.current.stop();
      } catch {
        // ignore if already stopped
      }
      activeNodesRef.current = null;
    }
  }, []);

  // Generate Rain (Filtered Pink Noise with gentle lowpass)
  const createRain = useCallback((ctx: AudioContext, destination: AudioNode) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime);

    noise.connect(filter);
    filter.connect(destination);
    noise.start();

    return {
      stop: () => {
        try {
          noise.stop();
          noise.disconnect();
          filter.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Generate Campfire (Warm low rumble + periodic crackles)
  const createCampfire = useCallback((ctx: AudioContext, destination: AudioNode) => {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise for warm fire rumble
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 0.6;

      // Add random fire crackles
      if (Math.random() < 0.0006) {
        data[i] += (Math.random() * 2 - 1) * 0.7;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    noise.connect(filter);
    filter.connect(destination);
    noise.start();

    return {
      stop: () => {
        try {
          noise.stop();
          noise.disconnect();
          filter.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Generate Ocean Waves (Pink noise with rhythmic LFO amplitude swell)
  const createWaves = useCallback((ctx: AudioContext, destination: AudioNode) => {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    const waveGain = ctx.createGain();
    waveGain.gain.setValueAtTime(0.1, ctx.currentTime);

    // LFO for periodic wave motion (every ~6 seconds)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.35, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(waveGain.gain);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(destination);

    noise.start();
    lfo.start();

    return {
      stop: () => {
        try {
          noise.stop();
          lfo.stop();
          noise.disconnect();
          lfo.disconnect();
          filter.disconnect();
          waveGain.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Play a specific ambient sound
  const playSound = useCallback((type: AmbientSoundType) => {
    stopCurrentSound();

    if (type === 'off') {
      setCurrentSound('off');
      return;
    }

    try {
      const ctx = getAudioContext();
      if (!gainNodeRef.current) {
        gainNodeRef.current = ctx.createGain();
        gainNodeRef.current.gain.setValueAtTime(volume, ctx.currentTime);
        gainNodeRef.current.connect(ctx.destination);
      }

      let nodes: { stop: () => void } | null = null;
      if (type === 'rain') {
        nodes = createRain(ctx, gainNodeRef.current);
      } else if (type === 'campfire') {
        nodes = createCampfire(ctx, gainNodeRef.current);
      } else if (type === 'waves') {
        nodes = createWaves(ctx, gainNodeRef.current);
      } else if (type === 'cafe') {
        nodes = createRain(ctx, gainNodeRef.current); // Soft rain/cafe-like murmur
      }

      activeNodesRef.current = nodes;
      setCurrentSound(type);
    } catch (e) {
      console.error('Failed to play ambient sound:', e);
      setCurrentSound('off');
    }
  }, [stopCurrentSound, getAudioContext, volume, createRain, createCampfire, createWaves]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCurrentSound();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopCurrentSound]);

  return {
    currentSound,
    volume,
    setVolume,
    playSound,
    stopSound: () => playSound('off')
  };
}
