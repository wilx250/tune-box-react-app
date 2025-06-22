
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search, 
  Library, 
  Heart, 
  User, 
  Music, 
  Play, 
  Download,
  BookOpen,
  MessageCircle,
  Upload
} from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentTrack, isPlaying } = useMusic();

  const navItems = [
    { name: 'Home', path: '/', icon: Music },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Library', path: '/library', icon: Library },
    { name: 'Artists', path: '/artists', icon: User },
    { name: 'Upload', path: '/upload', icon: Upload },
    { name: 'Download', path: '/download', icon: Download },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TuneBox
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                        isActivePath(item.path)
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Current Track Info */}
            {currentTrack && (
              <Link 
                to="/now-playing"
                className="hidden lg:flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
              >
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="text-sm">
                  <p className="text-white font-medium truncate max-w-32">{currentTrack.title}</p>
                  <p className="text-gray-400 truncate max-w-32">{currentTrack.artist}</p>
                </div>
                {isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-purple-400 animate-pulse"></div>
                    <div className="w-1 h-4 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActivePath(item.path)
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
