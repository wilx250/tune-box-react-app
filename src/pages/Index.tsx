
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Download } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const Index = () => {
  const { tracks, setCurrentTrack, setIsPlaying, currentTrack } = useMusic();

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          Welcome to TuneBox
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover amazing music, create playlists, and enjoy high-quality streaming
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tracks.map((track) => (
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
                <p className="text-gray-300 text-sm mb-3 truncate">{track.artist}</p>
                <p className="text-gray-400 text-xs mb-3">{track.duration}</p>
                
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                    <Heart size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Download size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-white/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Create Playlists</h3>
          <p className="text-gray-300 mb-6">Organize your favorite tracks and discover new music based on your taste.</p>
          <Button className="bg-purple-500 hover:bg-purple-600">Get Started</Button>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-lg border-white/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Premium Features</h3>
          <p className="text-gray-300 mb-6">Unlock HD streaming, offline downloads, and exclusive content.</p>
          <Button className="bg-blue-500 hover:bg-blue-600">Upgrade Now</Button>
        </Card>
      </section>
    </div>
  );
};

export default Index;
