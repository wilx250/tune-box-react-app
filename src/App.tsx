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
import Premium from "./pages/Premium";
import Login from "./pages/Login";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import MusicProvider from "./contexts/MusicContext";
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
                    <Route path="/library" element={<Library />} />
                    <Route path="/now-playing" element={<NowPlaying />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </MusicProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
