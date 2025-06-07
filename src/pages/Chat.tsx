
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm your AI music assistant. I can help you discover new music, create playlists, or answer questions about your favorite tracks. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('recommend') || message.includes('suggest')) {
      return "Based on your listening history, I'd recommend checking out some synthwave and electronic tracks. Have you tried 'Neon Nights' or 'Cosmic Journey' from your collection?";
    }
    
    if (message.includes('playlist')) {
      return "I can help you create playlists! Try grouping songs by mood, genre, or energy level. For a chill vibe, combine tracks like 'Dreams' and 'Ocean Waves'.";
    }
    
    if (message.includes('artist') || message.includes('band')) {
      return "Your music library has some great artists like Luna Shadows, Apollo, and Stellar Beats. Each brings a unique sound to electronic and ambient music.";
    }
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! Great to see you in TuneBox. What music are you in the mood for today?";
    }
    
    return "That's an interesting question! While I'm still learning about music, I can help you explore your current library or suggest ways to organize your tracks. What specific aspect of music interests you?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <MessageCircle className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">AI Music Assistant</h1>
        <p className="text-gray-300">Chat with AI about music, get recommendations, and discover new tracks</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-white">Music Chat</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.isUser && (
                  <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/20 text-white p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about music..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
