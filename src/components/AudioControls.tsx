
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AudioControlsProps {
  isStreaming: boolean;
}

const AudioControls = ({ isStreaming }: AudioControlsProps) => {
  const [volume, setVolume] = useState([1]);
  const [compressorThreshold, setCompressorThreshold] = useState([-24]);
  const [highPassFreq, setHighPassFreq] = useState([80]);
  const [peakingFreq, setPeakingFreq] = useState([1000]);
  const [peakingGain, setPeakingGain] = useState([0]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const highPassFilterRef = useRef<BiquadFilterNode | null>(null);
  const peakingFilterRef = useRef<BiquadFilterNode | null>(null);

  const { toast } = useToast();

  const playTestSound = async () => {
    if (!isStreaming) {
      toast({
        variant: "destructive",
        title: "Not Active",
        description: "Please click Start Listening first to activate audio mirroring",
      });
      return;
    }
    
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(volume[0], audioContext.currentTime);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 500);

      toast({
        title: "Sound Check",
        description: "Playing whistle sound...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not play test sound",
      });
    }
  };

  // Update audio parameters when streaming and values change
  useEffect(() => {
    if (isStreaming) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume[0];
      }
      if (compressorNodeRef.current) {
        compressorNodeRef.current.threshold.value = compressorThreshold[0];
      }
      if (highPassFilterRef.current) {
        highPassFilterRef.current.frequency.value = highPassFreq[0];
      }
      if (peakingFilterRef.current) {
        peakingFilterRef.current.frequency.value = peakingFreq[0];
        peakingFilterRef.current.gain.value = peakingGain[0];
      }
    }
  }, [isStreaming, volume, compressorThreshold, highPassFreq, peakingFreq, peakingGain]);

  if (!isStreaming) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto lg:mx-0">
      <div className="space-y-6">
        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Volume</label>
            <span className="text-sm text-gray-600">{volume[0].toFixed(1)}x</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={4}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Compressor Threshold */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Compressor</label>
            <span className="text-sm text-gray-600">{compressorThreshold[0]} dB</span>
          </div>
          <Slider
            value={compressorThreshold}
            onValueChange={setCompressorThreshold}
            max={0}
            min={-100}
            step={1}
            className="w-full"
          />
        </div>

        {/* High-Pass Filter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">High-Pass Filter</label>
            <span className="text-sm text-gray-600">{highPassFreq[0]} Hz</span>
          </div>
          <Slider
            value={highPassFreq}
            onValueChange={setHighPassFreq}
            max={500}
            min={20}
            step={10}
            className="w-full"
          />
        </div>

        {/* EQ Frequency */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">EQ Frequency</label>
            <span className="text-sm text-gray-600">{peakingFreq[0]} Hz</span>
          </div>
          <Slider
            value={peakingFreq}
            onValueChange={setPeakingFreq}
            max={8000}
            min={200}
            step={100}
            className="w-full"
          />
        </div>

        {/* EQ Gain */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">EQ Gain</label>
            <span className="text-sm text-gray-600">{peakingGain[0]} dB</span>
          </div>
          <Slider
            value={peakingGain}
            onValueChange={setPeakingGain}
            max={20}
            min={-20}
            step={1}
            className="w-full"
          />
        </div>

        {/* Test Sound Button */}
        <Button
          onClick={playTestSound}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Volume2 className="mr-2 h-4 w-4" />
          Test Sound
        </Button>

        <div className="text-xs text-gray-500 text-center border-t pt-4">
          *Advanced real-time pitch shifting requires specialized libraries for optimal performance
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
