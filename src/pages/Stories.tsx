
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMusic } from '@/contexts/MusicContext';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Plus, User, Clock, Play, Book, Headphones } from 'lucide-react';

const Stories = () => {
  const { stories, addStory } = useMusic();
  const { isAuthenticated, user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', content: '', genre: 'Inspiration', mode: 'read' as 'read' | 'listen' });
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  const genres = ['Inspiration', 'Lonely', 'Teen Drama', 'Motivation', 'Folktales'];
  const modes = ['read', 'listen'];

  const handleCreateStory = () => {
    if (newStory.title && newStory.content) {
      addStory({
        title: newStory.title,
        author: user?.name || 'Anonymous',
        content: newStory.content,
        genre: newStory.genre,
        mode: newStory.mode,
        audioUrl: newStory.mode === 'listen' ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' : undefined
      });
      setNewStory({ title: '', content: '', genre: 'Inspiration', mode: 'read' });
      setIsCreating(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredStories = stories.filter(story => {
    const genreMatch = selectedGenre === 'all' || story.genre === selectedGenre;
    const modeMatch = selectedMode === 'all' || story.mode === selectedMode;
    return genreMatch && modeMatch;
  });

  const featuredStories = stories.filter(story => 
    story.title === "Until the Rain Stops" || story.title === "Through the Broken Glass"
  );

  const playStoryAudio = (story: any) => {
    if (story.audioUrl) {
      const audio = new Audio(story.audioUrl);
      audio.play();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Music Stories</h1>
        <p className="text-gray-300">Share your musical experiences and discover others' journeys</p>
        <p className="text-purple-300 mt-2">Powered & Designed by Wilx Team 🇷🇼</p>
      </div>

      {/* Featured Stories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredStories.map((story) => (
            <Card key={story.id} className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-white/20 hover:bg-purple-600/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{story.title}</span>
                  <div className="flex items-center space-x-2">
                    {story.mode === 'listen' ? (
                      <Headphones className="h-5 w-5 text-purple-300" />
                    ) : (
                      <Book className="h-5 w-5 text-purple-300" />
                    )}
                    <span className="text-sm bg-purple-500/30 px-2 py-1 rounded">{story.genre}</span>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="h-4 w-4" />
                  <span>by {story.author}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">{story.content.substring(0, 200)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(story.timestamp)}</span>
                  </div>
                  {story.mode === 'listen' && story.audioUrl && (
                    <Button 
                      onClick={() => playStoryAudio(story)}
                      size="sm"
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Story Section */}
      {isAuthenticated && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Share Your Story
              {!isCreating && (
                <Button onClick={() => setIsCreating(true)} className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Story
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          {isCreating && (
            <CardContent className="space-y-4">
              <Input
                placeholder="Story title..."
                value={newStory.title}
                onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select value={newStory.genre} onValueChange={(value) => setNewStory(prev => ({ ...prev, genre: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={newStory.mode} onValueChange={(value: 'read' | 'listen') => setNewStory(prev => ({ ...prev, mode: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="listen">Listen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Tell us about your musical experience..."
                value={newStory.content}
                onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
              />
              <div className="flex space-x-3">
                <Button onClick={handleCreateStory} className="bg-purple-500 hover:bg-purple-600">
                  Publish Story
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)} className="border-white/20 text-white hover:bg-white/10">
                  Cancel
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map(genre => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMode} onValueChange={setSelectedMode}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
            <SelectValue placeholder="All Modes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="listen">Listen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stories Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">All Stories ({filteredStories.length})</h2>
        {filteredStories.map((story) => (
          <Card key={story.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-start justify-between">
                <span>{story.title}</span>
                <div className="flex items-center space-x-2">
                  {story.mode === 'listen' ? (
                    <Headphones className="h-5 w-5 text-blue-300" />
                  ) : (
                    <Book className="h-5 w-5 text-green-300" />
                  )}
                  <span className="text-sm bg-gray-600/30 px-2 py-1 rounded">{story.genre}</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(story.timestamp)}</span>
                  </div>
                </div>
              </CardTitle>
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="h-4 w-4" />
                <span>by {story.author}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{story.content}</p>
              {story.mode === 'listen' && story.audioUrl && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button 
                    onClick={() => playStoryAudio(story)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Listen to Story
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stories;
