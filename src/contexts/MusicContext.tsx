
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration?: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const sampleTracks: Track[] = [
  {
    id: 1,
    title: "Dreams",
    artist: "Luna Shadows",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:45"
  },
  {
    id: 2,
    title: "Echoes",
    artist: "Apollo",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:12"
  },
  {
    id: 3,
    title: "Neon Nights",
    artist: "Synthwave",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:28"
  },
  {
    id: 4,
    title: "Cosmic Journey",
    artist: "Stellar Beats",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:03"
  }
];

const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks] = useState<Track[]>(sampleTracks);

  const playNext = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
      setCurrentTrack(tracks[prevIndex]);
    }
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      tracks,
      setCurrentTrack,
      setIsPlaying,
      playNext,
      playPrevious
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export default MusicProvider;
