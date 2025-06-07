
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useMusic } from '@/contexts/MusicContext';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Plus, User, Clock } from 'lucide-react';

const Stories = () => {
  const { stories, addStory } = useMusic();
  const { isAuthenticated, user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', content: '' });

  const handleCreateStory = () => {
    if (newStory.title && newStory.content) {
      addStory({
        title: newStory.title,
        author: user?.name || 'Anonymous',
        content: newStory.content
      });
      setNewStory({ title: '', content: '' });
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Music Stories</h1>
        <p className="text-gray-300">Share your musical experiences and discover others' journeys</p>
      </div>

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

      <div className="space-y-6">
        {stories.map((story) => (
          <Card key={story.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-start justify-between">
                <span>{story.title}</span>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(story.timestamp)}</span>
                </div>
              </CardTitle>
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="h-4 w-4" />
                <span>by {story.author}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{story.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stories;
