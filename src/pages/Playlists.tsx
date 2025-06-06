
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Music, Play } from 'lucide-react';

const Playlists = () => {
  const playlists = [
    { id: 1, name: "Chill Vibes", songs: 23, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
    { id: 2, name: "Workout Hits", songs: 45, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
    { id: 3, name: "Late Night", songs: 18, image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" },
    { id: 4, name: "Road Trip", songs: 67, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Your Playlists</h1>
          <p className="text-gray-300">Create and manage your music collections</p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Create New Playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src={playlist.image} 
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                >
                  <Play size={20} className="text-white" />
                </Button>
              </div>
              
              <h3 className="text-white font-semibold mb-1">{playlist.name}</h3>
              <p className="text-gray-300 text-sm">{playlist.songs} songs</p>
            </CardContent>
          </Card>
        ))}
        
        {/* Create New Playlist Card */}
        <Card className="bg-white/5 border-2 border-dashed border-white/20 hover:border-purple-400 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-purple-500/20 p-4 rounded-full mb-4">
              <Plus size={32} className="text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Create Playlist</h3>
            <p className="text-gray-400 text-sm">Add your favorite tracks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Playlists;
