
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download as DownloadIcon } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const Download = () => {
  const { tracks } = useMusic();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <DownloadIcon className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Download Tracks</h1>
        <p className="text-gray-300">Download your favorite music for offline listening</p>
      </div>

      <div className="grid gap-6">
        {tracks.map((track) => (
          <Card key={track.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <img 
                  src={track.cover} 
                  alt={track.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{track.title}</h3>
                  <p className="text-gray-300 mb-2">{track.artist}</p>
                  <p className="text-gray-400 text-sm">{track.duration}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                    <span className="text-purple-300 text-sm font-medium">MP3</span>
                  </div>
                  <Button 
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => {
                      // In a real app, this would trigger a download
                      window.open(track.url, '_blank');
                    }}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Download;
