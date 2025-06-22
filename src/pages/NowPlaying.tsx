
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, Repeat, Shuffle } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const NowPlaying = () => {
  const { 
    currentTrack, 
    isPlaying, 
    setIsPlaying, 
    playNext, 
    playPrevious, 
    tracks,
    currentTime,
    duration,
    volume,
    setVolume,
    seek
  } = useMusic();

  const track = currentTrack || tracks[0];

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number[]) => {
    seek(newTime[0]);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Now Playing</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <img 
                src={track.cover} 
                alt={track.title}
                className="w-full max-w-sm aspect-square object-cover rounded-xl mx-auto mb-6 shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">{track.title}</h2>
                <p className="text-xl text-gray-300">{track.artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  className="w-full"
                  onValueChange={handleSeek}
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-6">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Shuffle size={20} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-purple-400"
                  onClick={playPrevious}
                >
                  <SkipBack size={24} />
                </Button>

                <Button 
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600 rounded-full w-16 h-16"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-purple-400"
                  onClick={playNext}
                >
                  <SkipForward size={24} />
                </Button>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Repeat size={20} />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <Volume2 size={20} className="text-gray-400" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="flex-1"
                  onValueChange={handleVolumeChange}
                />
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                  <Heart size={20} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NowPlaying;
