
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Heart, Clock, Upload, Play, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMusic } from '@/contexts/MusicContext';

const Profile = () => {
  const { user } = useAuth();
  const { userProfile, setCurrentTrack, setIsPlaying, removeFromFavorites, downloadTrack } = useMusic();

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
        <CardContent className="p-8">
          <div className="flex items-center space-x-6">
            <div className="bg-purple-500 p-6 rounded-full">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-300 mb-1">{user.email}</p>
              <p className="text-gray-400 text-sm">Member since {formatDate(userProfile.joinDate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-lg border-white/20">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userProfile.favorites.length}</h3>
            <p className="text-gray-300">Favorite Songs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-lg border-white/20">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userProfile.listeningHistory.length}</h3>
            <p className="text-gray-300">Songs Played</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg border-white/20">
          <CardContent className="p-6 text-center">
            <Upload className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userProfile.uploadedSongs.length}</h3>
            <p className="text-gray-300">Uploaded Songs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Favorite Songs */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-400" />
              Favorite Songs ({userProfile.favorites.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {userProfile.favorites.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No favorite songs yet</p>
            ) : (
              <div className="space-y-3">
                {userProfile.favorites.slice(0, 10).map((track) => (
                  <div key={track.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
                      <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <Play size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-red-400"
                        onClick={() => removeFromFavorites(track.id)}
                      >
                        <Heart size={14} fill="currentColor" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => downloadTrack(track)}
                      >
                        <Download size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Listening History */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Recently Played ({userProfile.listeningHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {userProfile.listeningHistory.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No listening history yet</p>
            ) : (
              <div className="space-y-3">
                {userProfile.listeningHistory.slice(0, 10).map((track, index) => (
                  <div key={`${track.id}-${index}`} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
                      <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <Play size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
