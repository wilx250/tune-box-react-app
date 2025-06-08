
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Download, ArrowLeft } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const ArtistDetail = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const { tracks, setCurrentTrack, setIsPlaying, addToFavorites, userProfile, downloadTrack } = useMusic();
  
  const decodedArtistName = decodeURIComponent(artistName || '');
  const artistTracks = tracks.filter(track => track.artist === decodedArtistName);
  const artist = artistTracks[0];

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artist not found</h1>
          <Link to="/artists">
            <Button>Back to Artists</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const isFavorite = (trackId: number) => {
    return userProfile.favorites.some(fav => fav.id === trackId);
  };

  const genres = Array.from(new Set(artistTracks.map(track => track.genre)));
  const totalDuration = artistTracks.length * 4; // Approximate

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/artists" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Artists
      </Link>

      {/* Artist Header */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <img 
            src={artist.cover} 
            alt={decodedArtistName}
            className="w-full aspect-square object-cover rounded-xl shadow-2xl"
          />
        </div>
        
        <div className="md:col-span-2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">{decodedArtistName}</h1>
          <div className="flex items-center space-x-6 text-gray-300 mb-6">
            <span>{artistTracks.length} songs</span>
            <span>•</span>
            <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
            <span>•</span>
            <span>{genres.join(', ')}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => handlePlayTrack(artistTracks[0])}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 rounded-full px-8"
            >
              <Play size={20} className="mr-2" />
              Play
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
            >
              <Heart size={20} className="mr-2" />
              Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Tracks */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
        <div className="space-y-2">
          {artistTracks.map((track, index) => (
            <Card key={track.id} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                  
                  <div className="relative">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <Button
                      onClick={() => handlePlayTrack(track)}
                      size="icon"
                      variant="ghost"
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
                    >
                      <Play size={16} className="text-white" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{track.title}</h3>
                    <p className="text-gray-400 text-sm">{track.genre} • {track.mood}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`${isFavorite(track.id) ? 'text-red-400' : 'text-gray-400'} hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      onClick={() => addToFavorites(track)}
                    >
                      <Heart size={16} fill={isFavorite(track.id) ? 'currentColor' : 'none'} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => downloadTrack(track)}
                    >
                      <Download size={16} />
                    </Button>
                    <span className="text-gray-400 text-sm w-12 text-right">{track.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
