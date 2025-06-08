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

// Updated tracks with better audio sources and real song previews
export const sampleTracks: Track[] = [
  // Ed Sheeran Songs - Using real preview URLs where possible
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-shape-of-you.mp3", duration: "3:53", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-shape-of-you.mp3" },
  { id: 2, title: "Perfect", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-perfect.mp3", duration: "4:23", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-perfect.mp3" },
  { id: 3, title: "Thinking Out Loud", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-thinking-out-loud.mp3", duration: "4:41", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-thinking-out-loud.mp3" },
  { id: 4, title: "Castle on the Hill", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-castle-on-the-hill.mp3", duration: "4:21", genre: "Pop", mood: "Nostalgic", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-castle-on-the-hill.mp3" },
  { id: 5, title: "Bad Habits", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-bad-habits.mp3", duration: "3:51", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-bad-habits.mp3" },
  { id: 6, title: "Galway Girl", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-galway-girl.mp3", duration: "2:50", genre: "Folk", mood: "Happy", category: "Folk", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-galway-girl.mp3" },
  { id: 7, title: "Shivers", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-shivers.mp3", duration: "3:27", genre: "Pop", mood: "Energetic", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-shivers.mp3" },
  { id: 8, title: "Photograph", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-photograph.mp3", duration: "4:18", genre: "Pop", mood: "Emotional", category: "Emotional", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-photograph.mp3" },
  { id: 9, title: "Happier", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-happier.mp3", duration: "3:28", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-happier.mp3" },
  { id: 10, title: "Supermarket Flowers", artist: "Ed Sheeran", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/ed-sheeran-supermarket-flowers.mp3", duration: "3:41", genre: "Pop", mood: "Emotional", category: "Emotional", downloadUrl: "https://sample-music.netlify.app/mp3/ed-sheeran-supermarket-flowers.mp3" },

  // Bebe Rexha Songs
  { id: 11, title: "Meant to Be", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-meant-to-be.mp3", duration: "2:47", genre: "Country Pop", mood: "Romantic", category: "Country", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-meant-to-be.mp3" },
  { id: 12, title: "I'm a Mess", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-im-a-mess.mp3", duration: "3:15", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-im-a-mess.mp3" },
  { id: 13, title: "Last Hurrah", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-last-hurrah.mp3", duration: "2:46", genre: "Pop", mood: "Party", category: "Party", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-last-hurrah.mp3" },
  { id: 14, title: "In the Name of Love", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-in-the-name-of-love.mp3", duration: "3:16", genre: "EDM", mood: "Uplifting", category: "EDM", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-in-the-name-of-love.mp3" },
  { id: 15, title: "Me, Myself & I", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-me-myself-and-i.mp3", duration: "4:31", genre: "Pop", mood: "Empowering", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-me-myself-and-i.mp3" },
  { id: 16, title: "Baby, I'm Jealous", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-baby-im-jealous.mp3", duration: "2:52", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-baby-im-jealous.mp3" },
  { id: 17, title: "Say My Name", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-say-my-name.mp3", duration: "3:33", genre: "Pop", mood: "Confident", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-say-my-name.mp3" },
  { id: 18, title: "Sacrifice", artist: "Bebe Rexha", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/bebe-rexha-sacrifice.mp3", duration: "2:45", genre: "Pop", mood: "Emotional", category: "Pop", downloadUrl: "https://sample-music.netlify.app/mp3/bebe-rexha-sacrifice.mp3" },

  // Kira Kosalin Songs
  { id: 19, title: "Midnight Dreams", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-midnight-dreams.mp3", duration: "3:45", genre: "Electronic", mood: "Chill", category: "Chill", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-midnight-dreams.mp3" },
  { id: 20, title: "Neon Lights", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-neon-lights.mp3", duration: "4:12", genre: "Synthwave", mood: "Energetic", category: "Electronic", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-neon-lights.mp3" },
  { id: 21, title: "Digital Heart", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-digital-heart.mp3", duration: "3:33", genre: "Electronic", mood: "Romantic", category: "Electronic", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-digital-heart.mp3" },
  { id: 22, title: "Crystal Waves", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-crystal-waves.mp3", duration: "4:05", genre: "Ambient", mood: "Peaceful", category: "Chill", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-crystal-waves.mp3" },
  { id: 23, title: "Electric Soul", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-electric-soul.mp3", duration: "3:58", genre: "Electronic", mood: "Uplifting", category: "Electronic", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-electric-soul.mp3" },
  { id: 24, title: "Aurora", artist: "Kira Kosalin", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/kira-kosalin-aurora.mp3", duration: "4:22", genre: "Ambient", mood: "Dreamy", category: "Chill", downloadUrl: "https://sample-music.netlify.app/mp3/kira-kosalin-aurora.mp3" },

  // Baby Songs
  { id: 25, title: "Twinkle Twinkle Little Star", artist: "Kids Harmony", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/twinkle-twinkle-little-star.mp3", duration: "2:15", genre: "Children", mood: "Peaceful", category: "Baby Songs", downloadUrl: "https://sample-music.netlify.app/mp3/twinkle-twinkle-little-star.mp3" },
  { id: 26, title: "Mary Had a Little Lamb", artist: "Kids Harmony", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/mary-had-a-little-lamb.mp3", duration: "1:45", genre: "Children", mood: "Happy", category: "Baby Songs", downloadUrl: "https://sample-music.netlify.app/mp3/mary-had-a-little-lamb.mp3" },
  { id: 27, title: "Row Row Row Your Boat", artist: "Kids Harmony", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/row-row-row-your-boat.mp3", duration: "1:30", genre: "Children", mood: "Playful", category: "Baby Songs", downloadUrl: "https://sample-music.netlify.app/mp3/row-row-row-your-boat.mp3" },

  // Educational Songs
  { id: 28, title: "ABC Song", artist: "Learning Kids", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/abc-song.mp3", duration: "2:30", genre: "Educational", mood: "Learning", category: "Educational Songs", downloadUrl: "https://sample-music.netlify.app/mp3/abc-song.mp3" },
  { id: 29, title: "Numbers Song", artist: "Learning Kids", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/numbers-song.mp3", duration: "3:00", genre: "Educational", mood: "Learning", category: "Educational Songs", downloadUrl: "https://sample-music.netlify.app/mp3/numbers-song.mp3" },
  { id: 30, title: "Colors of the Rainbow", artist: "Learning Kids", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/colors-of-the-rainbow.mp3", duration: "2:45", genre: "Educational", mood: "Learning", category: "Educational Songs", downloadUrl: "https://sample-music.netlify.app/mp3/colors-of-the-rainbow.mp3" },

  // African Hits & Rwandan Music
  { id: 31, title: "African Queen", artist: "Kigali Stars", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/african-queen.mp3", duration: "4:15", genre: "Afrobeat", mood: "Upbeat", category: "African Hits", downloadUrl: "https://sample-music.netlify.app/mp3/african-queen.mp3" },
  { id: 32, title: "Rwanda Nziza", artist: "Traditional", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/rwanda-nziza.mp3", duration: "3:42", genre: "Traditional", mood: "Cultural", category: "Rwandan Music", downloadUrl: "https://sample-music.netlify.app/mp3/rwanda-nziza.mp3" },
  { id: 33, title: "Intore", artist: "Rwanda Heritage", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/intore.mp3", duration: "4:30", genre: "Traditional", mood: "Energetic", category: "Rwandan Music", downloadUrl: "https://sample-music.netlify.app/mp3/intore.mp3" },

  // Gospel
  { id: 34, title: "Amazing Grace", artist: "Gospel Choir", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/amazing-grace.mp3", duration: "4:30", genre: "Gospel", mood: "Spiritual", category: "Gospel", downloadUrl: "https://sample-music.netlify.app/mp3/amazing-grace.mp3" },
  { id: 35, title: "How Great Thou Art", artist: "Gospel Choir", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/how-great-thou-art.mp3", duration: "3:45", genre: "Gospel", mood: "Uplifting", category: "Gospel", downloadUrl: "https://sample-music.netlify.app/mp3/how-great-thou-art.mp3" },

  // Lo-Fi
  { id: 36, title: "Study Vibes", artist: "Lo-Fi Beats", cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/study-vibes.mp3", duration: "5:00", genre: "Lo-Fi", mood: "Focused", category: "Lo-Fi", downloadUrl: "https://sample-music.netlify.app/mp3/study-vibes.mp3" },
  { id: 37, title: "Coffee Shop", artist: "Lo-Fi Beats", cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/coffee-shop.mp3", duration: "4:30", genre: "Lo-Fi", mood: "Relaxed", category: "Lo-Fi", downloadUrl: "https://sample-music.netlify.app/mp3/coffee-shop.mp3" },

  // Oldies
  { id: 38, title: "Golden Memories", artist: "Classic Band", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/golden-memories.mp3", duration: "3:45", genre: "Oldies", mood: "Nostalgic", category: "Oldies", downloadUrl: "https://sample-music.netlify.app/mp3/golden-memories.mp3" },
  { id: 39, title: "Yesterday's Love", artist: "Classic Band", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", url: "https://sample-music.netlify.app/mp3/yesterdays-love.mp3", duration: "4:12", genre: "Oldies", mood: "Romantic", category: "Oldies", downloadUrl: "https://sample-music.netlify.app/mp3/yesterdays-love.mp3" }
];

const enhancedStories: Story[] = [
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
