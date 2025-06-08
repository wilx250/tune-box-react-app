
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Library from "./pages/Library";
import NowPlaying from "./pages/NowPlaying";
import Playlists from "./pages/Playlists";
import Stories from "./pages/Stories";
import Chat from "./pages/Chat";
import Premium from "./pages/Premium";
import Login from "./pages/Login";
import Download from "./pages/Download";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MusicProvider from "./contexts/MusicContext";
import AuthProvider from "./contexts/AuthContext";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#0f0f23" : "#ffffff";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <MusicProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
                  <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                  <main>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/artists" element={<Artists />} />
                      <Route path="/artist/:artistName" element={<ArtistDetail />} />
                      <Route path="/library" element={
                        <ProtectedRoute>
                          <Library />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/now-playing" element={<NowPlaying />} />
                      <Route path="/playlists" element={
                        <ProtectedRoute>
                          <Playlists />
                        </ProtectedRoute>
                      } />
                      <Route path="/stories" element={<Stories />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/premium" element={<Premium />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/download" element={
                        <ProtectedRoute>
                          <Download />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>
            </BrowserRouter>
          </MusicProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
