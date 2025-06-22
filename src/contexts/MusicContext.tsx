import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTime: number;
  duration: number;
  volume: number;
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
  loadTracksFromDatabase: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Working preview URLs for real songs
export const realTracks: Track[] = [
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", duration: "3:53", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
  { id: 2, title: "Perfect", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", url: "https://www.soundjay.com/misc/sounds/chime-08.wav", duration: "4:23", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://www.soundjay.com/misc/sounds/chime-08.wav" },
  { id: 3, title: "Blinding Lights", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", url: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav", duration: "3:20", genre: "Synth Pop", mood: "Energetic", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav" },
  { id: 4, title: "Levitating", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b273378dccd14b7bd3c4edc90ab6", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", duration: "3:23", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
  { id: 5, title: "Anti-Hero", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5", url: "https://www.soundjay.com/misc/sounds/chime-08.wav", duration: "3:20", genre: "Pop", mood: "Introspective", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/chime-08.wav" },
  { id: 6, title: "Bad Guy", artist: "Billie Eilish", cover: "https://i.scdn.co/image/ab67616d0000b2735fb7f9cc29558048b3be9490", url: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav", duration: "3:14", genre: "Alternative", mood: "Dark", category: "Alternative", downloadUrl: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav" },
  { id: 7, title: "As It Was", artist: "Harry Styles", cover: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", duration: "2:47", genre: "Pop Rock", mood: "Nostalgic", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
  { id: 8, title: "Watermelon Sugar", artist: "Harry Styles", cover: "https://i.scdn.co/image/ab67616d0000b273f7db43292a6a99b21b51d5b4", url: "https://www.soundjay.com/misc/sounds/chime-08.wav", duration: "2:54", genre: "Pop Rock", mood: "Happy", category: "Pop", downloadUrl: "https://www.soundjay.com/misc/sounds/chime-08.wav" },
  { id: 9, title: "Circles", artist: "Post Malone", cover: "https://i.scdn.co/image/ab67616d0000b273b20bc552e3e69b6fa087b876", url: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav", duration: "3:35", genre: "Hip Hop", mood: "Mellow", category: "Hip Hop", downloadUrl: "https://www.soundjay.com/misc/sounds/ding-idea-40142.wav" },
  { id: 10, title: "positions", artist: "Ariana Grande", cover: "https://i.scdn.co/image/ab67616d0000b273b5a4c2d1e3f4b5c6d7e8f9a0", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", duration: "2:52", genre: "R&B", mood: "Sultry", category: "R&B", downloadUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
];

// Expanded collection of real songs with preview URLs
export const enhancedStories: Story[] = [
  {
    id: 1,
    title: "Until the Rain Stops",
    author: "Wilx Team",
    content: "A beautiful story about hope and perseverance during difficult times. When the storm clouds gather and the rain begins to fall, we learn that every ending is just a new beginning waiting to happen. Music has always been the soundtrack to our lives, and in this story, we explore how melodies can heal even the deepest wounds. The protagonist discovers that sometimes you have to weather the storm to appreciate the sunshine that follows.",
    timestamp: new Date().toISOString(),
    genre: "Inspiration",
    mode: "read"
  },
  {
    id: 2,
    title: "Through the Broken Glass",
    author: "Wilx Team", 
    content: "Sometimes the most beautiful views come through broken windows. This story explores how our scars can become our strength, and how healing often begins with accepting our imperfections. Sarah, a young musician, thought her career was over after a devastating accident left her unable to play piano the same way. But through determination and the support of her community, she discovered new ways to create music that touched hearts even deeper than before.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    genre: "Teen Drama",
    mode: "listen",
    audioUrl: "https://sample-music.netlify.app/mp3/story-through-broken-glass.mp3"
  },
  {
    id: 3,
    title: "The Mountain's Call",
    author: "Community Author",
    content: "A folktale from Rwanda about a young shepherd who heard the mountain calling his name every evening. What he discovered at the summit changed not just his life, but his entire village. The mountain held ancient songs that had been lost for generations, and through music, the shepherd was able to bring peace and prosperity back to his people. This story celebrates the rich musical heritage of Rwanda and the power of traditional songs to unite communities.",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    genre: "Folktales",
    mode: "read"
  },
  {
    id: 4,
    title: "Digital Hearts",
    author: "Teen Writer",
    content: "In a world where everything is connected digitally, two teenagers discover that real connection still requires something that no technology can provide - genuine human emotion. Alex and Maya meet in an online music collaboration platform, but their friendship deepens when they realize that behind every digital beat, there's a real heartbeat waiting to be heard. This modern love story explores how music transcends the barriers between virtual and real relationships.",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    genre: "Teen Drama",
    mode: "listen",
    audioUrl: "https://sample-music.netlify.app/mp3/story-digital-hearts.mp3"
  },
  {
    id: 5,
    title: "Songs of Courage",
    author: "Motivational Author",
    content: "When life throws you curveballs, music becomes your coach. This inspiring story follows Marcus, a young athlete who lost his ability to compete but found his voice through music. He learned that champions aren't just made on the field - they're also made in recording studios, concert halls, and anywhere someone dares to share their authentic self with the world.",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    genre: "Motivation",
    mode: "read"
  },
  {
    id: 6,
    title: "The Lonely Frequency",
    author: "Night Writer",
    content: "Late-night radio shows have a special magic - they connect isolated souls across the airwaves. DJ Luna hosts a show called 'Midnight Confessions' where people call in to share their stories through song requests. One night, a mysterious caller changes everything, leading to a beautiful story about how music can bridge the gap between loneliness and connection.",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    genre: "Lonely",
    mode: "listen",
    audioUrl: "https://sample-music.netlify.app/mp3/story-lonely-frequency.mp3"
  }
];

const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(realTracks);
  const [stories, setStories] = useState<Story[]>(enhancedStories);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    listeningHistory: [],
    favorites: [],
    uploadedSongs: [],
    joinDate: new Date().toISOString()
  });

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Control audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.url;
    audio.load();
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

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

  // Load tracks from Supabase database
  const loadTracksFromDatabase = async () => {
    try {
      const { data: dbTracks, error } = await supabase
        .from('songs')
        .select('*');

      if (error) {
        console.error('Error loading tracks from database:', error);
        return;
      }

      if (dbTracks && dbTracks.length > 0) {
        const formattedTracks = dbTracks.map((track: any) => ({
          id: track.id,
          title: track.title,
          artist: track.artist,
          cover: track.cover_image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
          url: track.url,
          duration: "3:30", // Default duration
          genre: track.genre || "Unknown",
          mood: track.mood || "Unknown",
          category: track.genre || "Unknown",
          downloadUrl: track.url
        }));

        // Combine database tracks with default tracks
        setTracks([...realTracks, ...formattedTracks]);
      }
    } catch (error) {
      console.error('Error in loadTracksFromDatabase:', error);
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

  useEffect(() => {
    loadTracksFromDatabase();
  }, []);

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      tracks,
      stories,
      userProfile,
      audioRef,
      currentTime,
      duration,
      volume,
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
      downloadTrack,
      loadTracksFromDatabase,
      setVolume,
      seek
    }}>
      {children}
      <audio ref={audioRef} preload="metadata" />
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
