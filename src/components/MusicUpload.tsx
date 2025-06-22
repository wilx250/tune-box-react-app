
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Music } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMusic } from '@/contexts/MusicContext';

const MusicUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    url: '',
    genre: '',
    mood: '',
    coverImage: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { loadTracksFromDatabase } = useMusic();

  const genres = [
    'Pop', 'Hip Hop', 'Rock', 'R&B', 'Country', 'Electronic', 'Jazz', 
    'Classical', 'Folk', 'Reggae', 'Blues', 'Gospel', 'Afrobeats', 'EDM'
  ];

  const moods = [
    'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Angry', 'Nostalgic',
    'Uplifting', 'Melancholic', 'Peaceful', 'Aggressive', 'Fun', 'Dreamy'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.artist || !formData.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Title, Artist, URL)",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const { error } = await supabase
        .from('songs')
        .insert({
          title: formData.title,
          artist: formData.artist,
          url: formData.url,
          genre: formData.genre || 'Unknown',
          mood: formData.mood || 'Unknown',
          cover_image: formData.coverImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Song Added Successfully!",
        description: `${formData.title} by ${formData.artist} has been added to the library.`
      });

      // Reset form
      setFormData({
        title: '',
        artist: '',
        url: '',
        genre: '',
        mood: '',
        coverImage: ''
      });

      // Reload tracks from database
      loadTracksFromDatabase();

    } catch (error: any) {
      console.error('Error uploading song:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to add song to library",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Music className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Add Music</h1>
        <p className="text-gray-300">Share your favorite songs with the community</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-white">Song Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter song title"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="artist" className="text-white">Artist *</Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) => handleInputChange('artist', e.target.value)}
                  placeholder="Enter artist name"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="url" className="text-white">Music URL *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="Enter music URL (YouTube, SoundCloud, etc.)"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="coverImage" className="text-white">Cover Image URL</Label>
              <Input
                id="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                placeholder="Enter cover image URL (optional)"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="genre" className="text-white">Genre</Label>
                <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mood" className="text-white">Mood</Label>
                <Select value={formData.mood} onValueChange={(value) => handleInputChange('mood', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Adding Song...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Add Song to Library
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-white font-semibold mb-4">💡 Tips for Adding Music:</h3>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• Use high-quality audio URLs for the best listening experience</li>
          <li>• Make sure the music URL is publicly accessible</li>
          <li>• Add accurate genre and mood tags to help others discover your music</li>
          <li>• Use square album cover images (400x400px) for best results</li>
          <li>• Double-check artist and song title spelling</li>
        </ul>
      </div>
    </div>
  );
};

export default MusicUpload;
