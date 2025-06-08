
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Library, Music, Crown, Download, User, Sun, Moon, BookOpen, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/artists', icon: User, label: 'Artists' },
    { path: '/library', icon: Library, label: 'Library' },
    { path: '/now-playing', icon: Music, label: 'Now Playing' },
    { path: '/playlists', icon: Music, label: 'Playlists' },
    { path: '/stories', icon: BookOpen, label: 'Stories' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/premium', icon: Crown, label: 'Premium' },
    { path: '/download', icon: Download, label: 'Download' },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TuneBox
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="text-sm text-gray-300 hover:text-white hidden sm:block">
                  Hi, {user?.name}
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                    <User size={20} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                  title="Logout"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <User size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-4 gap-2">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
