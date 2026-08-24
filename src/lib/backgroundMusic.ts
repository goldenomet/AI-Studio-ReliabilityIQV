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
  private preloadAudio: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  private isPlaying = false;
  private volume = 0.35;
  private listeners: Set<AudioStateListener> = new Set();
  private hasInitialized = false;
  private fadeInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;

    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.volume = this.volume;

    // Instant seamless next track on track end (0 wait time)
    this.audio.addEventListener('ended', () => {
      this.playNext(true);
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Background audio error, skipping to next track immediately:', e);
      if (this.isPlaying) {
        this.playNext(true);
      }
    });

    // Hidden preload audio element to buffer next track in advance
    this.preloadAudio = new Audio();
    this.preloadAudio.preload = 'auto';
    this.preloadAudio.volume = 0;
  }

  private preloadUpcomingTrack() {
    if (!this.preloadAudio || PLAYLIST.length <= 1) return;
    const nextIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    const nextTrack = PLAYLIST[nextIndex];
    if (nextTrack) {
      this.preloadAudio.src = encodeURI(nextTrack.src);
      this.preloadAudio.load();
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
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

  public async play(trackIndex?: number, immediate: boolean = false): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (trackIndex !== undefined && trackIndex >= 0 && trackIndex < PLAYLIST.length) {
      this.currentTrackIndex = trackIndex;
    }

    const currentTrack = PLAYLIST[this.currentTrackIndex];
    if (!currentTrack) return false;

    const targetSrc = encodeURI(currentTrack.src);
    if (!this.audio.src.endsWith(targetSrc) && !this.audio.src.endsWith(currentTrack.src)) {
      this.audio.src = targetSrc;
      this.audio.load();
    }

    // Set volume immediately for seamless continuous music playback
    this.audio.volume = this.volume;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      // Pre-buffer next track in the background for zero-delay transition
      this.preloadUpcomingTrack();
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
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve(false);
    } else {
      return this.play(this.currentTrackIndex, true);
    }
  }

  public playNext(immediate: boolean = true) {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.play(this.currentTrackIndex, immediate);
  }

  public playPrevious(immediate: boolean = true) {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.play(this.currentTrackIndex, immediate);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }
}

export const bgMusic = new BackgroundMusicPlayer();
