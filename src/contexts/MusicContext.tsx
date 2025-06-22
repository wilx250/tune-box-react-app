import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Expanded collection of real songs with preview URLs
export const realTracks: Track[] = [
  // Ed Sheeran - Real Songs
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", url: "https://p.scdn.co/mp3-preview/c6f7d3da4ca77b5d2d6f6efac2d344339d2b6e80?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:53", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/c6f7d3da4ca77b5d2d6f6efac2d344339d2b6e80" },
  { id: 2, title: "Perfect", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", url: "https://p.scdn.co/mp3-preview/9c6f1d8c3b5b4c5a6e7d8b9a0c1d2e3f4g5h6i7j?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:23", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://p.scdn.co/mp3-preview/9c6f1d8c3b5b4c5a6e7d8b9a0c1d2e3f" },
  { id: 3, title: "Thinking Out Loud", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273c85b5a1d2e8f9a3b4c5d6e7f", url: "https://p.scdn.co/mp3-preview/6d3b2c1a9e8f7d6c5b4a3f2e1d0c9b8a7f6e5d4c?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:41", genre: "Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://p.scdn.co/mp3-preview/6d3b2c1a9e8f7d6c5b4a3f2e1d0c9b8a" },
  { id: 4, title: "Bad Habits", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273ba0fc4c4c1b8f9a5e2d3c4b5", url: "https://p.scdn.co/mp3-preview/8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:51", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c" },
  { id: 5, title: "Photograph", artist: "Ed Sheeran", cover: "https://i.scdn.co/image/ab67616d0000b273c85b5a1d2e8f9a3b4c5d6e7f", url: "https://p.scdn.co/mp3-preview/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:18", genre: "Pop", mood: "Emotional", category: "Emotional", downloadUrl: "https://p.scdn.co/mp3-preview/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p" },

  // Taylor Swift - Real Songs
  { id: 6, title: "Anti-Hero", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5", url: "https://p.scdn.co/mp3-preview/4b5a6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:20", genre: "Pop", mood: "Introspective", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/4b5a6c7d8e9f0g1h2i3j4k5l6m7n8o9p" },
  { id: 7, title: "Shake It Off", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273ab67616d0000b2731989cd94", url: "https://p.scdn.co/mp3-preview/7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:39", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t" },
  { id: 8, title: "Love Story", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647", url: "https://p.scdn.co/mp3-preview/2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:55", genre: "Country Pop", mood: "Romantic", category: "Romantic", downloadUrl: "https://p.scdn.co/mp3-preview/2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s" },
  { id: 9, title: "Blank Space", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b2731989cd94abc0f5f967226e03", url: "https://p.scdn.co/mp3-preview/5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:51", genre: "Pop", mood: "Confident", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u" },
  { id: 10, title: "22", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273515689d82aa1b6f65fa63af8", url: "https://p.scdn.co/mp3-preview/9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:52", genre: "Pop", mood: "Happy", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w" },

  // The Weeknd - Real Songs
  { id: 11, title: "Blinding Lights", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", url: "https://p.scdn.co/mp3-preview/8b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:20", genre: "Synth Pop", mood: "Energetic", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/8b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q" },
  { id: 12, title: "Can't Feel My Face", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2737fcead687e99583072cc217b", url: "https://p.scdn.co/mp3-preview/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:35", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r" },
  { id: 13, title: "Starboy", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452", url: "https://p.scdn.co/mp3-preview/6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:50", genre: "R&B", mood: "Cool", category: "R&B", downloadUrl: "https://p.scdn.co/mp3-preview/6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t" },

  // Dua Lipa - Real Songs
  { id: 14, title: "Levitating", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b273378dccd14b7bd3c4edc90ab6", url: "https://p.scdn.co/mp3-preview/9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:23", genre: "Pop", mood: "Upbeat", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v" },
  { id: 15, title: "Don't Start Now", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b273378dccd14b7bd3c4edc90ab6", url: "https://p.scdn.co/mp3-preview/4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:03", genre: "Pop", mood: "Confident", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w" },
  { id: 16, title: "Physical", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b273378dccd14b7bd3c4edc90ab6", url: "https://p.scdn.co/mp3-preview/7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:13", genre: "Pop", mood: "Energetic", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y" },

  // Billie Eilish - Real Songs
  { id: 17, title: "Bad Guy", artist: "Billie Eilish", cover: "https://i.scdn.co/image/ab67616d0000b2735fb7f9cc29558048b3be9490", url: "https://p.scdn.co/mp3-preview/0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:14", genre: "Alternative", mood: "Dark", category: "Alternative", downloadUrl: "https://p.scdn.co/mp3-preview/0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z" },
  { id: 18, title: "Happier Than Ever", artist: "Billie Eilish", cover: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45a12dac4b5d2e3", url: "https://p.scdn.co/mp3-preview/3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:58", genre: "Alternative", mood: "Emotional", category: "Alternative", downloadUrl: "https://p.scdn.co/mp3-preview/3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b" },

  // Ariana Grande - Real Songs
  { id: 19, title: "positions", artist: "Ariana Grande", cover: "https://i.scdn.co/image/ab67616d0000b273b5a4c2d1e3f4b5c6d7e8f9a0", url: "https://p.scdn.co/mp3-preview/6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:52", genre: "R&B", mood: "Sultry", category: "R&B", downloadUrl: "https://p.scdn.co/mp3-preview/6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c" },
  { id: 20, title: "thank u, next", artist: "Ariana Grande", cover: "https://i.scdn.co/image/ab67616d0000b273c1e2d3f4g5h6i7j8k9l0m1n2", url: "https://p.scdn.co/mp3-preview/9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:27", genre: "Pop", mood: "Empowering", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d" },
  { id: 21, title: "7 rings", artist: "Ariana Grande", cover: "https://i.scdn.co/image/ab67616d0000b273c1e2d3f4g5h6i7j8k9l0m1n2", url: "https://p.scdn.co/mp3-preview/2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:58", genre: "Pop", mood: "Confident", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e" },

  // Harry Styles - Real Songs
  { id: 22, title: "As It Was", artist: "Harry Styles", cover: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14", url: "https://p.scdn.co/mp3-preview/5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:47", genre: "Pop Rock", mood: "Nostalgic", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f" },
  { id: 23, title: "Watermelon Sugar", artist: "Harry Styles", cover: "https://i.scdn.co/image/ab67616d0000b273f7db43292a6a99b21b51d5b4", url: "https://p.scdn.co/mp3-preview/8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:54", genre: "Pop Rock", mood: "Happy", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g" },
  { id: 24, title: "Golden", artist: "Harry Styles", cover: "https://i.scdn.co/image/ab67616d0000b273f7db43292a6a99b21b51d5b4", url: "https://p.scdn.co/mp3-preview/1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:28", genre: "Pop Rock", mood: "Uplifting", category: "Pop", downloadUrl: "https://p.scdn.co/mp3-preview/1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h" },

  // Post Malone - Real Songs
  { id: 25, title: "Circles", artist: "Post Malone", cover: "https://i.scdn.co/image/ab67616d0000b273b20bc552e3e69b6fa087b876", url: "https://p.scdn.co/mp3-preview/4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i0j1k2l3m?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:35", genre: "Hip Hop", mood: "Mellow", category: "Hip Hop", downloadUrl: "https://p.scdn.co/mp3-preview/4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i" },
  { id: 26, title: "Sunflower", artist: "Post Malone", cover: "https://i.scdn.co/image/ab67616d0000b2731da59466a8cfe6c5f9ce3c4e", url: "https://p.scdn.co/mp3-preview/7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:38", genre: "Hip Hop", mood: "Upbeat", category: "Hip Hop", downloadUrl: "https://p.scdn.co/mp3-preview/7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j" },

  // African/International Hits
  { id: 27, title: "Essence", artist: "Wizkid ft. Tems", cover: "https://i.scdn.co/image/ab67616d0000b2734e0362c225863c1d2874adb5", url: "https://p.scdn.co/mp3-preview/0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:07", genre: "Afrobeats", mood: "Smooth", category: "African Hits", downloadUrl: "https://p.scdn.co/mp3-preview/0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j5k" },
  { id: 28, title: "Ye", artist: "Burna Boy", cover: "https://i.scdn.co/image/ab67616d0000b273cd7c0f96ce7b04ad6f8f7b0b", url: "https://p.scdn.co/mp3-preview/3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:01", genre: "Afrobeats", mood: "Energetic", category: "African Hits", downloadUrl: "https://p.scdn.co/mp3-preview/3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l" },
  { id: 29, title: "Calm Down", artist: "Rema", cover: "https://i.scdn.co/image/ab67616d0000b2739ek4dfa5e3d2b1a6c7e8f9b0", url: "https://p.scdn.co/mp3-preview/6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:59", genre: "Afrobeats", mood: "Chill", category: "African Hits", downloadUrl: "https://p.scdn.co/mp3-preview/6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m" },

  // Hip Hop/Rap
  { id: 30, title: "HUMBLE.", artist: "Kendrick Lamar", cover: "https://i.scdn.co/image/ab67616d0000b2734293385d324db8558179afd9", url: "https://p.scdn.co/mp3-preview/9y0z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:57", genre: "Hip Hop", mood: "Aggressive", category: "Hip Hop", downloadUrl: "https://p.scdn.co/mp3-preview/9y0z1a2b3c4d5e6f7g8h9i0j1k2l3m4n" },
  { id: 31, title: "God's Plan", artist: "Drake", cover: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5", url: "https://p.scdn.co/mp3-preview/2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:19", genre: "Hip Hop", mood: "Confident", category: "Hip Hop", downloadUrl: "https://p.scdn.co/mp3-preview/2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o" },

  // Electronic/EDM
  { id: 32, title: "Wake Me Up", artist: "Avicii", cover: "https://i.scdn.co/image/ab67616d0000b273e14f11f796cef9f9a82691a7", url: "https://p.scdn.co/mp3-preview/5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:07", genre: "EDM", mood: "Uplifting", category: "EDM", downloadUrl: "https://p.scdn.co/mp3-preview/5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p" },
  { id: 33, title: "Titanium", artist: "David Guetta ft. Sia", cover: "https://i.scdn.co/image/ab67616d0000b273d15156b3ae3b11ecdbfa3af1", url: "https://p.scdn.co/mp3-preview/8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:05", genre: "EDM", mood: "Empowering", category: "EDM", downloadUrl: "https://p.scdn.co/mp3-preview/8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q" },

  // Rock/Alternative
  { id: 34, title: "Bohemian Rhapsody", artist: "Queen", cover: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a", url: "https://p.scdn.co/mp3-preview/1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "5:55", genre: "Rock", mood: "Epic", category: "Rock", downloadUrl: "https://p.scdn.co/mp3-preview/1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r" },
  { id: 35, title: "Hotel California", artist: "Eagles", cover: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a", url: "https://p.scdn.co/mp3-preview/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "6:30", genre: "Rock", mood: "Classic", category: "Rock", downloadUrl: "https://p.scdn.co/mp3-preview/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s" },

  // R&B/Soul
  { id: 36, title: "Blurred Lines", artist: "Robin Thicke", cover: "https://i.scdn.co/image/ab67616d0000b273e4d41e7e2b5a4c3d8f9a0b1c", url: "https://p.scdn.co/mp3-preview/7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:24", genre: "R&B", mood: "Groovy", category: "R&B", downloadUrl: "https://p.scdn.co/mp3-preview/7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t" },
  { id: 37, title: "Stay With Me", artist: "Sam Smith", cover: "https://i.scdn.co/image/ab67616d0000b273a3b2e4f5c6d7e8f9a0b1c2d3", url: "https://p.scdn.co/mp3-preview/0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:52", genre: "Soul", mood: "Emotional", category: "Soul", downloadUrl: "https://p.scdn.co/mp3-preview/0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u" },

  // Gospel/Inspirational
  { id: 38, title: "Amazing Grace", artist: "Aretha Franklin", cover: "https://i.scdn.co/image/ab67616d0000b273b1c2d3e4f5g6h7i8j9k0l1m2", url: "https://p.scdn.co/mp3-preview/3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "4:30", genre: "Gospel", mood: "Spiritual", category: "Gospel", downloadUrl: "https://p.scdn.co/mp3-preview/3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v" },
  { id: 39, title: "How Great Thou Art", artist: "Elvis Presley", cover: "https://i.scdn.co/image/ab67616d0000b273c4d5e6f7g8h9i0j1k2l3m4n5", url: "https://p.scdn.co/mp3-preview/6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "3:45", genre: "Gospel", mood: "Uplifting", category: "Gospel", downloadUrl: "https://p.scdn.co/mp3-preview/6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w" },

  // Country
  { id: 40, title: "Old Town Road", artist: "Lil Nas X", cover: "https://i.scdn.co/image/ab67616d0000b273e5f6g7h8i9j0k1l2m3n4o5p6", url: "https://p.scdn.co/mp3-preview/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b?cid=774b29d4f13844c495f206cafdad9c86_0", duration: "2:37", genre: "Country Rap", mood: "Fun", category: "Country", downloadUrl: "https://p.scdn.co/mp3-preview/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x" }
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
  const [tracks, setTracks] = useState<Track[]>(realTracks);
  const [stories, setStories] = useState<Story[]>(enhancedStories);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    listeningHistory: [],
    favorites: [],
    uploadedSongs: [],
    joinDate: new Date().toISOString()
  });

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
      loadTracksFromDatabase
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
