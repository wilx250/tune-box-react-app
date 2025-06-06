
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, Music, Download, Zap } from 'lucide-react';

const Premium = () => {
  const features = [
    "HD Audio Quality (320kbps)",
    "Unlimited Downloads",
    "No Advertisements",
    "Exclusive Content",
    "Premium Playlists",
    "Early Access to New Features"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Upgrade to Premium</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Unlock the full TuneBox experience with premium features and high-quality streaming
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Free Plan */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <div className="text-3xl font-bold text-white">$0</div>
              <p className="text-gray-400">per month</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                Standard Audio Quality
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                Limited Downloads
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                Basic Playlists
              </li>
            </ul>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-purple-400/50 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
              <div className="text-3xl font-bold text-white">$9.99</div>
              <p className="text-gray-400">per month</p>
            </div>
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-400 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>

        {/* Family Plan */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Family</h3>
              <div className="text-3xl font-bold text-white">$14.99</div>
              <p className="text-gray-400">per month</p>
            </div>
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-400 mr-3" />
                  {feature}
                </li>
              ))}
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3" />
                Up to 6 Family Members
              </li>
            </ul>
            <Button variant="outline" className="w-full border-blue-400/50 text-blue-400 hover:bg-blue-400/10">
              Choose Family
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-gray-400 mb-4">
          Questions about Premium? Contact our support team for help.
        </p>
        <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Premium;
