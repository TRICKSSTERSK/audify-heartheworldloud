import React from 'react';
import { Mic } from 'lucide-react';
import AudioControls from './AudioControls';
interface HeroSectionProps {
  onStartListening: () => void;
  onHowItWorks: () => void;
  isStreaming: boolean;
  audioStatus: string;
  gainNodeRef: React.RefObject<GainNode | null>;
  compressorNodeRef: React.RefObject<DynamicsCompressorNode | null>;
  highPassFilterRef: React.RefObject<BiquadFilterNode | null>;
  peakingFilterRef: React.RefObject<BiquadFilterNode | null>;
  bassFilterRef: React.RefObject<BiquadFilterNode | null>;
}
const HeroSection = ({
  onStartListening,
  onHowItWorks,
  isStreaming,
  audioStatus,
  gainNodeRef,
  compressorNodeRef,
  highPassFilterRef,
  peakingFilterRef,
  bassFilterRef
}: HeroSectionProps) => {
  return <section className="relative min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pb-32 sm:pb-40 lg:pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0H0v20L20 0zm0 20H0v20L20 20zm0 20H0v20L20 40zm0 20H0v20L20 60zm0 20H0v20L20 80zm20-80h-20v20L40 0zm0 20h-20v20L40 20zm0 20h-20v20L40 40zm0 20h-20v20L40 60zm0 20h-20v20L40 80zm20-80h-20v20L60 0zm0 20h-20v20L60 20zm0 20h-20v20L60 40zm0 20h-20v20L60 60zm0 20h-20v20L60 80zm20-80h-20v20L80 0zm0 20h-20v20L80 20zm0 20h-20v20L80 40zm0 20h-20v20L80 60zm0 20h-20v20L80 80zM100 0h-20v20L100 0zM100 20h-20v20L100 20zM100 40h-20v20L100 40zM100 60h-20v20L100 60zM100 80h-20v20L100 80z" fill="%23a0aec0" fill-opacity="0.2" /%3E%3C/svg%3E')`,
      backgroundSize: '100px 100px'
    }} />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10 px-4 sm:px-0">
        {/* Left Side: Illustration */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start mb-12 lg:mb-0">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-200 rounded-full flex items-center justify-center shadow-xl mx-auto lg:mx-0">
            {/* AUDIFY Logo */}
            <div className="w-2/3 h-2/3 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full shadow-lg flex items-center justify-center p-4">
              <img 
                src="/lovable-uploads/7b9d1ba4-f364-4b2d-a071-4f05301f8402.png" 
                alt="AUDIFY hearing solutions logo" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Animated Microphone with Sound Waves */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 bg-gray-700 rounded-full flex items-center justify-center p-2 shadow-inner">
              <Mic className="text-white w-12 h-12" />

              {/* Sound Waves Animation */}
              {isStreaming && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="sound-wave-circle w-20 h-20 bg-cyan-400 rounded-full opacity-0"></div>
                  <div className="sound-wave-circle w-24 h-24 bg-cyan-400 rounded-full opacity-0 delay-1"></div>
                  <div className="sound-wave-circle w-28 h-28 bg-cyan-400 rounded-full opacity-0 delay-2"></div>
                </div>}
            </div>
          </div>
          
          {/* Made by credit */}
          <div className="text-center lg:text-left mt-4">
            <p className="text-sm text-gray-500 font-medium">AUDIFY</p>
          </div>
        </div>

        {/* Right Side: Headline and Controls */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Hear the World, <span className="text-cyan-600">Loud and Clear</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg lg:max-w-xl mx-auto lg:mx-0">
            AI-powered real-time voice booster for the hearing impaired, bringing clarity to every conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
            <button onClick={onStartListening} className={`font-semibold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${isStreaming ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300' : 'bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-300'}`}>
              {isStreaming ? 'Stop Listening' : 'Start Listening'}
            </button>
            <button onClick={onHowItWorks} className="border border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 font-semibold py-4 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-200">
              How It Works
            </button>
          </div>

          <AudioControls isStreaming={isStreaming} gainNodeRef={gainNodeRef} compressorNodeRef={compressorNodeRef} highPassFilterRef={highPassFilterRef} peakingFilterRef={peakingFilterRef} bassFilterRef={bassFilterRef} />
          
          <p className="text-sm text-gray-500 mt-4 text-center lg:text-left">
            {audioStatus}
          </p>
        </div>
      </div>
    </section>;
};
export default HeroSection;