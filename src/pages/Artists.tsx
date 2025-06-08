
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Search, User, Music } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { tracks, setCurrentTrack, setIsPlaying } = useMusic();
  const navigate = useNavigate();

  // Get unique artists
  const artists = Array.from(new Set(tracks.map(track => track.artist)))
    .map(artistName => {
      const artistTracks = tracks.filter(track => track.artist === artistName);
      return {
        name: artistName,
        trackCount: artistTracks.length,
        cover: artistTracks[0].cover,
        topTrack: artistTracks[0],
        genres: Array.from(new Set(artistTracks.map(track => track.genre)))
      };
    });

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayArtist = (artist: any) => {
    setCurrentTrack(artist.topTrack);
    setIsPlaying(true);
  };

  const viewArtistPage = (artistName: string) => {
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <User className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Artists</h1>
        <p className="text-gray-300">Discover amazing artists and their music</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
          />
        </div>
      </div>

      {/* Featured Artists */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Ed Sheeran', 'Bebe Rexha', 'Kira Kosalin'].map(artistName => {
            const artist = artists.find(a => a.name === artistName);
            if (!artist) return null;
            
            return (
              <Card key={artist.name} className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-white/20 hover:bg-purple-600/30 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={artist.cover} 
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <Button
                      onClick={() => handlePlayArtist(artist)}
                      size="icon"
                      className="absolute bottom-2 right-2 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    >
                      <Play size={20} className="text-white" />
                    </Button>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{artist.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{artist.trackCount} songs</p>
                  <p className="text-gray-400 text-xs mb-4">{artist.genres.join(', ')}</p>
                  <Button 
                    onClick={() => viewArtistPage(artist.name)}
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    View Artist
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Artists */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">All Artists ({filteredArtists.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <Card key={artist.name} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={artist.cover} 
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => handlePlayArtist(artist)}
                    size="icon"
                    className="absolute bottom-2 right-2 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  >
                    <Play size={20} className="text-white" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold mb-1 truncate">{artist.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{artist.trackCount} songs</p>
                <p className="text-gray-400 text-xs truncate">{artist.genres.join(', ')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;
