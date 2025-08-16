
import React from 'react';
import { Mic, Brain, Headphones, ArrowRight, ArrowDown } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="how-it-works">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">

          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-1/3 text-center transform hover:-translate-y-2">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
              <Mic className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Speak Normally</h3>
            <p className="text-gray-600">Your device's microphone captures the sound as usual.</p>
          </div>

          {/* Arrow for desktop */}
          <div className="hidden md:block text-cyan-500">
            <ArrowRight className="w-12 h-12" />
          </div>
          {/* Arrow for mobile */}
          <div className="block md:hidden text-cyan-500">
            <ArrowDown className="w-12 h-12" />
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-1/3 text-center transform hover:-translate-y-2">
            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-100 rounded-full flex items-center justify-center shadow-inner">
              <Brain className="w-10 h-10 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Boosts Volume</h3>
            <p className="text-gray-600">Our intelligent AI algorithms amplify and clarify the voice in real-time.</p>
          </div>

          {/* Arrow for desktop */}
          <div className="hidden md:block text-cyan-500">
            <ArrowRight className="w-12 h-12" />
          </div>
          {/* Arrow for mobile */}
          <div className="block md:hidden text-cyan-500">
            <ArrowDown className="w-12 h-12" />
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-1/3 text-center transform hover:-translate-y-2">
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center shadow-inner">
              <Headphones className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Output to Your Device</h3>
            <p className="text-gray-600">The enhanced audio is sent directly to your Bluetooth or wired headphones.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
