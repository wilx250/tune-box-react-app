
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const AudioPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    setIsPlaying, 
    playNext, 
    playPrevious 
  } = useMusic();

  if (!currentTrack) return null;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/20 p-4 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-white font-medium text-sm">{currentTrack.title}</p>
            <p className="text-gray-400 text-xs">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={playPrevious}
            className="text-white hover:text-purple-400"
          >
            <SkipBack size={20} />
          </Button>
          
          <Button 
            size="sm"
            onClick={togglePlayPause}
            className="bg-purple-500 hover:bg-purple-600 rounded-full w-10 h-10"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={playNext}
            className="text-white hover:text-purple-400"
          >
            <SkipForward size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
