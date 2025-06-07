
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration?: string;
}

export interface Story {
  id: number;
  title: string;
  author: string;
  content: string;
  timestamp: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  stories: Story[];
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  addStory: (story: Omit<Story, 'id' | 'timestamp'>) => void;
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
  },
  {
    id: 5,
    title: "Ocean Waves",
    artist: "Deep Blue",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:33"
  },
  {
    id: 6,
    title: "Electric Storm",
    artist: "Thunder Collective",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "3:57"
  },
  {
    id: 7,
    title: "Midnight Drive",
    artist: "Neon City",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "4:21"
  },
  {
    id: 8,
    title: "Starlight",
    artist: "Cosmic Dreams",
    cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: "3:16"
  },
  {
    id: 9,
    title: "City Lights",
    artist: "Urban Pulse",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: "4:44"
  },
  {
    id: 10,
    title: "Digital Love",
    artist: "Cyber Hearts",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "3:39"
  },
  {
    id: 11,
    title: "Sunset Boulevard",
    artist: "Golden Hour",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: "4:18"
  },
  {
    id: 12,
    title: "Rhythm & Soul",
    artist: "Groove Masters",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: "3:52"
  }
];

const sampleStories: Story[] = [
  {
    id: 1,
    title: "My Musical Journey",
    author: "You",
    content: "Started my music collection with these amazing tracks. The sound quality and variety keep me coming back for more!",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    title: "Discovering New Beats",
    author: "Music Lover",
    content: "Found some incredible synthwave tracks today. The atmospheric sounds transport you to another dimension.",
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks] = useState<Track[]>(sampleTracks);
  const [stories, setStories] = useState<Story[]>(sampleStories);

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

  const addStory = (newStory: Omit<Story, 'id' | 'timestamp'>) => {
    const story: Story = {
      ...newStory,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setStories(prev => [story, ...prev]);
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      tracks,
      stories,
      setCurrentTrack,
      setIsPlaying,
      playNext,
      playPrevious,
      addStory
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
