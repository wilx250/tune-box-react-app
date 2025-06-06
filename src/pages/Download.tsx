
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download as DownloadIcon, Music, Mail, MessageCircle, Instagram } from 'lucide-react';
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

      <div className="grid gap-6 mb-12">
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

      <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border-white/20">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300">Contact us through any of these channels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="mailto:nzabahimanawilson1@gmail.com"
              className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="bg-red-500 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-300 text-sm">Get in touch via email</p>
              </div>
            </a>

            <a 
              href="https://wa.me/250790101980"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="bg-green-500 p-3 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">WhatsApp</h3>
                <p className="text-gray-300 text-sm">Chat with us instantly</p>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/wilx_gram?igsh=ZTM2bmNlbGVkem4x"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Instagram</h3>
                <p className="text-gray-300 text-sm">Follow us for updates</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Download;
