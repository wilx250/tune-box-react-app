import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "@/contexts/AuthContext";
import MusicProvider from "@/contexts/MusicContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import NowPlaying from "./pages/NowPlaying";
import Download from "./pages/Download";
import Stories from "./pages/Stories";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MusicUpload from "./components/MusicUpload";
import AudioPlayer from "./components/AudioPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MusicProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
              <Navbar />
              <main className="pb-20">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/artist/:artistName" element={<ArtistDetail />} />
                  <Route path="/now-playing" element={<NowPlaying />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/upload" element={<MusicUpload />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <AudioPlayer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </MusicProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
