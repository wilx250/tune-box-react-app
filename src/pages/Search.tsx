
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Play } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { tracks, setCurrentTrack, setIsPlaying } = useMusic();

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Search Music</h1>
        <p className="text-gray-300">Find your favorite tracks and artists</p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for tracks, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
          />
        </div>
      </div>

      {searchQuery ? (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Search Results ({filteredTracks.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map((track) => (
              <Card key={track.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <Button
                      onClick={() => handlePlayTrack(track)}
                      size="icon"
                      className="absolute bottom-2 right-2 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    >
                      <Play size={20} className="text-white" />
                    </Button>
                  </div>
                  <h3 className="text-white font-semibold mb-1 truncate">{track.title}</h3>
                  <p className="text-gray-300 text-sm truncate">{track.artist}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredTracks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No tracks found matching your search.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Start Searching</h3>
          <p className="text-gray-400">Enter a track name or artist to find music</p>
        </div>
      )}
    </div>
  );
};

export default Search;
