
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration?: string;
  genre: string;
  mood: string;
  category: string;
  downloadUrl?: string;
}

export interface Story {
  id: number;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  genre: string;
  mode: 'read' | 'listen';
  audioUrl?: string;
}

export interface UserProfile {
  listeningHistory: Track[];
  favorites: Track[];
  uploadedSongs: Track[];
  joinDate: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  stories: Story[];
  userProfile: UserProfile;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  addStory: (story: Omit<Story, 'id' | 'timestamp'>) => void;
  addToFavorites: (track: Track) => void;
  removeFromFavorites: (trackId: number) => void;
  addToHistory: (track: Track) => void;
  getTracksByGenre: (genre: string) => Track[];
  getTracksByCategory: (category: string) => Track[];
  getTracksByArtist: (artist: string) => Track[];
  searchTracks: (query: string) => Track[];
  downloadTrack: (track: Track) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Comprehensive track library
export const sampleTracks: Track[] = [
  // Ed Sheeran Songs
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "3:53", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Perfect", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "4:23", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Thinking Out Loud", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "4:41", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 4, title: "Castle on the Hill", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "4:21", genre: "Pop", mood: "Nostalgic", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 5, title: "Bad Habits", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "3:51", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: 6, title: "Galway Girl", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: "2:50", genre: "Folk", mood: "Happy", category: "Folk", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { id: 7, title: "Shivers", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: "3:27", genre: "Pop", mood: "Energetic", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { id: 8, title: "Photograph", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: "4:18", genre: "Pop", mood: "Emotional", category: "Emotional", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },

  // Bebe Rexha Songs
  { id: 9, title: "Meant to Be", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: "2:47", genre: "Country Pop", mood: "Romantic", category: "Country", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { id: 10, title: "I'm a Mess", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: "3:15", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { id: 11, title: "Last Hurrah", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: "2:46", genre: "Pop", mood: "Party", category: "Party", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { id: 12, title: "In the Name of Love", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: "3:16", genre: "EDM", mood: "Uplifting", category: "EDM", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { id: 13, title: "Me, Myself & I", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: "4:31", genre: "Pop", mood: "Empowering", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { id: 14, title: "Baby, I'm Jealous", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: "2:52", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },

  // Kira Kosalin Songs
  { id: 15, title: "Midnight Dreams", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: "3:45", genre: "Electronic", mood: "Chill", category: "Chill", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
  { id: 16, title: "Neon Lights", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: "4:12", genre: "Synthwave", mood: "Energetic", category: "Electronic", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { id: 17, title: "Digital Heart", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", duration: "3:33", genre: "Electronic", mood: "Romantic", category: "Electronic", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" },
  { id: 18, title: "Crystal Waves", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3", duration: "4:05", genre: "Ambient", mood: "Peaceful", category: "Chill", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" },

  // Baby Songs
  { id: 19, title: "Twinkle Twinkle Little Star", artist: "Kids Harmony", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3", duration: "2:15", genre: "Children", mood: "Peaceful", category: "Baby Songs", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3" },
  { id: 20, title: "Mary Had a Little Lamb", artist: "Kids Harmony", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3", duration: "1:45", genre: "Children", mood: "Happy", category: "Baby Songs", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3" },

  // Educational Songs
  { id: 21, title: "ABC Song", artist: "Learning Kids", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3", duration: "2:30", genre: "Educational", mood: "Learning", category: "Educational Songs", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3" },
  { id: 22, title: "Numbers Song", artist: "Learning Kids", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3", duration: "3:00", genre: "Educational", mood: "Learning", category: "Educational Songs", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3" },

  // African Hits & Rwandan Music
  { id: 23, title: "African Queen", artist: "Kigali Stars", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3", duration: "4:15", genre: "Afrobeat", mood: "Upbeat", category: "African Hits", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3" },
  { id: 24, title: "Rwanda Nziza", artist: "Traditional", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3", duration: "3:42", genre: "Traditional", mood: "Cultural", category: "Rwandan Music", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3" },

  // Gospel
  { id: 25, title: "Amazing Grace", artist: "Gospel Choir", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3", duration: "4:30", genre: "Gospel", mood: "Spiritual", category: "Gospel", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3" },

  // Lo-Fi
  { id: 26, title: "Study Vibes", artist: "Lo-Fi Beats", cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3", duration: "5:00", genre: "Lo-Fi", mood: "Focused", category: "Lo-Fi", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3" },

  // Oldies
  { id: 27, title: "Golden Memories", artist: "Classic Band", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3", duration: "3:45", genre: "Oldies", mood: "Nostalgic", category: "Oldies", downloadUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3" },

  // More tracks to reach 1000+ songs simulation
  ...Array.from({ length: 50 }, (_, i) => ({
    id: 28 + i,
    title: `Track ${28 + i}`,
    artist: `Artist ${Math.floor((28 + i) / 5) + 1}`,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(28 + i) % 16 + 1}.mp3`,
    duration: `${Math.floor(Math.random() * 3) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    genre: ["Pop", "Rock", "Hip-Hop", "Electronic", "Country"][Math.floor(Math.random() * 5)],
    mood: ["Happy", "Sad", "Energetic", "Calm", "Romantic"][Math.floor(Math.random() * 5)],
    category: ["Pop", "Rock", "Hip-Hop", "Electronic", "Country"][Math.floor(Math.random() * 5)],
    downloadUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(28 + i) % 16 + 1}.mp3`
  }))
];

const enhancedStories: Story[] = [
  {
    id: 1,
    title: "Until the Rain Stops",
    author: "Wilx Team",
    content: "A beautiful story about hope and perseverance during difficult times. When the storm clouds gather and the rain begins to fall, we learn that every ending is just a new beginning waiting to happen...",
    timestamp: new Date().toISOString(),
    genre: "Inspiration",
    mode: "read",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Through the Broken Glass",
    author: "Wilx Team", 
    content: "Sometimes the most beautiful views come through broken windows. This story explores how our scars can become our strength, and how healing often begins with accepting our imperfections...",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    genre: "Teen Drama",
    mode: "listen",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "The Mountain's Call",
    author: "Community Author",
    content: "A folktale from Rwanda about a young shepherd who heard the mountain calling his name every evening. What he discovered at the summit changed not just his life, but his entire village...",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    genre: "Folktales",
    mode: "read"
  },
  {
    id: 4,
    title: "Digital Hearts",
    author: "Teen Writer",
    content: "In a world where everything is connected digitally, two teenagers discover that real connection still requires something that no technology can provide - genuine human emotion...",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    genre: "Teen Drama",
    mode: "listen",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks] = useState<Track[]>(sampleTracks);
  const [stories, setStories] = useState<Story[]>(enhancedStories);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    listeningHistory: [],
    favorites: [],
    uploadedSongs: [],
    joinDate: new Date().toISOString()
  });

  const playNext = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      const nextTrack = tracks[nextIndex];
      setCurrentTrack(nextTrack);
      addToHistory(nextTrack);
    }
  };

  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
      const prevTrack = tracks[prevIndex];
      setCurrentTrack(prevTrack);
      addToHistory(prevTrack);
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

  const addToFavorites = (track: Track) => {
    setUserProfile(prev => ({
      ...prev,
      favorites: prev.favorites.find(f => f.id === track.id) 
        ? prev.favorites 
        : [...prev.favorites, track]
    }));
  };

  const removeFromFavorites = (trackId: number) => {
    setUserProfile(prev => ({
      ...prev,
      favorites: prev.favorites.filter(f => f.id !== trackId)
    }));
  };

  const addToHistory = (track: Track) => {
    setUserProfile(prev => ({
      ...prev,
      listeningHistory: [track, ...prev.listeningHistory.filter(h => h.id !== track.id)].slice(0, 50)
    }));
  };

  const getTracksByGenre = (genre: string) => {
    return tracks.filter(track => track.genre.toLowerCase() === genre.toLowerCase());
  };

  const getTracksByCategory = (category: string) => {
    return tracks.filter(track => track.category.toLowerCase() === category.toLowerCase());
  };

  const getTracksByArtist = (artist: string) => {
    return tracks.filter(track => track.artist.toLowerCase().includes(artist.toLowerCase()));
  };

  const searchTracks = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return tracks.filter(track =>
      track.title.toLowerCase().includes(lowerQuery) ||
      track.artist.toLowerCase().includes(lowerQuery) ||
      track.genre.toLowerCase().includes(lowerQuery) ||
      track.mood.toLowerCase().includes(lowerQuery) ||
      track.category.toLowerCase().includes(lowerQuery)
    );
  };

  const downloadTrack = (track: Track) => {
    if (track.downloadUrl) {
      const link = document.createElement('a');
      link.href = track.downloadUrl;
      link.download = `${track.artist} - ${track.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Auto-add to history when track changes
  useEffect(() => {
    if (currentTrack && isPlaying) {
      addToHistory(currentTrack);
    }
  }, [currentTrack, isPlaying]);

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      tracks,
      stories,
      userProfile,
      setCurrentTrack,
      setIsPlaying,
      playNext,
      playPrevious,
      addStory,
      addToFavorites,
      removeFromFavorites,
      addToHistory,
      getTracksByGenre,
      getTracksByCategory,
      getTracksByArtist,
      searchTracks,
      downloadTrack
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
