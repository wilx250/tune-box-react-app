
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, Play, Heart, Download, Filter } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { tracks, setCurrentTrack, setIsPlaying, addToFavorites, userProfile, downloadTrack } = useMusic();

  const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Country', 'Gospel', 'Lo-Fi', 'Oldies', 'Afrobeat', 'Traditional', 'Children', 'Educational', 'Synthwave', 'Ambient', 'Folk', 'EDM'];
  const moods = ['All', 'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Upbeat', 'Peaceful', 'Emotional', 'Nostalgic', 'Spiritual', 'Focused', 'Cultural', 'Learning', 'Uplifting', 'Empowering'];
  const categories = ['All', 'Pop', 'Country', 'Rock', 'Hip-Hop', 'Electronic', 'Gospel', 'Lo-Fi', 'Oldies', 'African Hits', 'Rwandan Music', 'Baby Songs', 'Educational Songs', 'Cartoon Songs', 'Romantic', 'Party', 'Chill', 'Teens'];

  const getFilteredTracks = () => {
    let filtered = tracks;

    if (searchQuery) {
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.mood.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(track => track.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    if (selectedMood !== 'all') {
      filtered = filtered.filter(track => track.mood.toLowerCase() === selectedMood.toLowerCase());
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(track => track.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    return filtered;
  };

  const filteredTracks = getFilteredTracks();

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const isFavorite = (trackId: number) => {
    return userProfile.favorites.some(fav => fav.id === trackId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedMood('all');
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Search Music</h1>
        <p className="text-gray-300">Find your favorite tracks from our library of 1000+ songs</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for tracks, artists, genres, or moods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map(genre => (
              <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMood} onValueChange={setSelectedMood}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Mood" />
          </SelectTrigger>
          <SelectContent>
            {moods.map(mood => (
              <SelectItem key={mood} value={mood.toLowerCase()}>{mood}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={clearFilters}
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          {searchQuery || selectedGenre !== 'all' || selectedMood !== 'all' || selectedCategory !== 'all' 
            ? `Search Results (${filteredTracks.length})` 
            : `All Tracks (${filteredTracks.length})`}
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
                <p className="text-gray-300 text-sm truncate mb-1">{track.artist}</p>
                <p className="text-gray-400 text-xs mb-2">{track.genre} • {track.mood}</p>
                <p className="text-gray-400 text-xs mb-3">{track.duration}</p>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`${isFavorite(track.id) ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
                    onClick={() => addToFavorites(track)}
                  >
                    <Heart size={16} fill={isFavorite(track.id) ? 'currentColor' : 'none'} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => downloadTrack(track)}
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No tracks found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
