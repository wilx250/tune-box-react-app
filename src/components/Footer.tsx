
import React from 'react';
import { Mail, MessageCircle, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              TuneBox
            </h3>
            <p className="text-gray-300 text-sm">
              Your ultimate music streaming platform. Discover, listen, and enjoy high-quality music.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/search" className="text-gray-300 hover:text-white transition-colors">Search</a></li>
              <li><a href="/library" className="text-gray-300 hover:text-white transition-colors">Library</a></li>
              <li><a href="/premium" className="text-gray-300 hover:text-white transition-colors">Premium</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/download" className="text-gray-300 hover:text-white transition-colors">Downloads</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="mailto:nzabahimanawilson1@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email</span>
              </a>
              <a 
                href="https://wa.me/250790101980"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a 
                href="https://www.instagram.com/wilx_gram?igsh=ZTM2bmNlbGVkem4x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by Wilson Nzabahimana © 2025 TuneBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
