
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Music, Plus } from 'lucide-react';

const Library = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Your Library</h1>
        <p className="text-gray-300">Your favorite tracks, playlists, and more</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-lg border-white/20 p-6 cursor-pointer hover:bg-red-600/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Liked Songs</h3>
              <p className="text-gray-300 text-sm">42 songs</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-lg border-white/20 p-6 cursor-pointer hover:bg-blue-600/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Recently Played</h3>
              <p className="text-gray-300 text-sm">15 songs</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg border-white/20 p-6 cursor-pointer hover:bg-green-600/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Downloaded</h3>
              <p className="text-gray-300 text-sm">8 songs</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((playlist) => (
          <Card key={playlist} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 aspect-square rounded-lg mb-3 flex items-center justify-center">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-medium text-sm mb-1">Playlist #{playlist}</h3>
              <p className="text-gray-400 text-xs">{Math.floor(Math.random() * 20) + 5} songs</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Library;
