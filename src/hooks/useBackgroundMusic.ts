import { useState, useEffect } from 'react';
import { bgMusic, PLAYLIST, SongTrack } from '../lib/backgroundMusic';

export function useBackgroundMusic() {
  const [state, setState] = useState(() => bgMusic.getState());

  useEffect(() => {
    const unsubscribe = bgMusic.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return {
    isPlaying: state.isPlaying,
    currentTrackIndex: state.currentTrackIndex,
    currentTrack: state.currentTrack,
    volume: state.volume,
    playlist: PLAYLIST,
    play: (index?: number) => bgMusic.play(index),
    pause: () => bgMusic.pause(),
    toggle: () => bgMusic.toggle(),
    playNext: () => bgMusic.playNext(),
    playPrevious: () => bgMusic.playPrevious(),
    setVolume: (vol: number) => bgMusic.setVolume(vol),
  };
}
