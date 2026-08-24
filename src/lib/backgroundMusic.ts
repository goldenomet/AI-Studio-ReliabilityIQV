// Background Music Manager for ReliabilityIQ Ventures
export interface SongTrack {
  id: string;
  title: string;
  src: string;
}

export const PLAYLIST: SongTrack[] = [
  {
    id: 'oya-flex-1',
    title: 'Oya Flex (Part 1)',
    src: '/Oya Flex (1).mp3',
  },
  {
    id: 'oya-flex-sweet',
    title: 'Oya Flex Sweet',
    src: '/Oya Flex sweet.mp3',
  },
  {
    id: 'the-quiet-3',
    title: 'The Quiet (Part 3)',
    src: '/The Quiet (3).mp3',
  },
  {
    id: 'the-quiet-4',
    title: 'The Quiet (Part 4)',
    src: '/The Quiet (4).mp3',
  },
];

type AudioStateListener = (state: {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SongTrack;
  volume: number;
}) => void;

class BackgroundMusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  private isPlaying = false;
  private volume = 0.35;
  private listeners: Set<AudioStateListener> = new Set();
  private hasInitialized = false;
  private fadeInterval: any = null;

  constructor() {
    // Only init in browser
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;

    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = this.volume;

    this.audio.addEventListener('ended', () => {
      this.playNext();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Background audio error, skipping to next track:', e);
      // If a track fails, gracefully attempt next track after short pause
      setTimeout(() => {
        if (this.isPlaying) {
          this.playNext();
        }
      }, 1000);
    });
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    // Immediately emit current state
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: PLAYLIST[this.currentTrackIndex] || PLAYLIST[0],
      volume: this.volume,
    };
  }

  public async play(trackIndex?: number): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;

    if (trackIndex !== undefined && trackIndex >= 0 && trackIndex < PLAYLIST.length) {
      this.currentTrackIndex = trackIndex;
    }

    const currentTrack = PLAYLIST[this.currentTrackIndex];
    if (!currentTrack) return false;

    const targetSrc = encodeURI(currentTrack.src);
    // Check if source changed
    if (!this.audio.src.endsWith(targetSrc) && !this.audio.src.endsWith(currentTrack.src)) {
      this.audio.src = targetSrc;
      this.audio.load();
    }

    this.audio.volume = 0;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.fadeIn();
      this.notify();
      return true;
    } catch (err) {
      console.warn('Autoplay blocked or playback failed:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (!this.audio) return;
    this.fadeOut(() => {
      if (this.audio) {
        this.audio.pause();
      }
      this.isPlaying = false;
      this.notify();
    });
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve(false);
    } else {
      return this.play();
    }
  }

  public playNext() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.play(this.currentTrackIndex);
  }

  public playPrevious() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.play(this.currentTrackIndex);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  private fadeIn(targetVolume: number = this.volume, durationMs: number = 1000) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const stepMs = 50;
    const stepGain = targetVolume / (durationMs / stepMs);
    let currentVol = 0;
    this.audio.volume = 0;

    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        clearInterval(this.fadeInterval);
        return;
      }
      currentVol = Math.min(targetVolume, currentVol + stepGain);
      this.audio.volume = currentVol;
      if (currentVol >= targetVolume) {
        clearInterval(this.fadeInterval);
      }
    }, stepMs);
  }

  private fadeOut(callback?: () => void, durationMs: number = 600) {
    if (!this.audio) {
      if (callback) callback();
      return;
    }
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const startVolume = this.audio.volume;
    const stepMs = 50;
    const stepGain = startVolume / (durationMs / stepMs);
    let currentVol = startVolume;

    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        clearInterval(this.fadeInterval);
        if (callback) callback();
        return;
      }
      currentVol = Math.max(0, currentVol - stepGain);
      this.audio.volume = currentVol;
      if (currentVol <= 0) {
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, stepMs);
  }
}

export const bgMusic = new BackgroundMusicPlayer();
