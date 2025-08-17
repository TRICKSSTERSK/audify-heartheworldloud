import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Volume2, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
interface AudioControlsProps {
  isStreaming: boolean;
  gainNodeRef: React.RefObject<GainNode | null>;
  compressorNodeRef: React.RefObject<DynamicsCompressorNode | null>;
  highPassFilterRef: React.RefObject<BiquadFilterNode | null>;
  peakingFilterRef: React.RefObject<BiquadFilterNode | null>;
  bassFilterRef: React.RefObject<BiquadFilterNode | null>;
}
const AudioControls = ({
  isStreaming,
  gainNodeRef,
  compressorNodeRef,
  highPassFilterRef,
  peakingFilterRef,
  bassFilterRef
}: AudioControlsProps) => {
  const [volume, setVolume] = useState([3]);
  const [bassGain, setBassGain] = useState([0]);
  const [compressorThreshold, setCompressorThreshold] = useState([-24]);
  const [highPassFreq, setHighPassFreq] = useState([80]);
  const [peakingFreq, setPeakingFreq] = useState([1000]);
  const [peakingGain, setPeakingGain] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    toast
  } = useToast();
  const playTestSound = async () => {
    if (!isStreaming) {
      toast({
        variant: "destructive",
        title: "Not Active",
        description: "Please click Start Listening first to activate audio mirroring"
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
        description: "Playing whistle sound..."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not play test sound"
      });
    }
  };

  // Update audio parameters when streaming and values change
  useEffect(() => {
    if (isStreaming) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume[0];
      }
      if (bassFilterRef.current) {
        bassFilterRef.current.gain.value = bassGain[0];
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
  }, [isStreaming, volume, bassGain, compressorThreshold, highPassFreq, peakingFreq, peakingGain]);
  if (!isStreaming) {
    return null;
  }
  return <div className="bg-card p-4 sm:p-6 rounded-xl shadow-lg max-w-sm mx-auto lg:mx-0 border">
      <div className="space-y-4 sm:space-y-6">
        {/* Volume Control - Most Important */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-base sm:text-lg font-semibold text-foreground bg-amber-400">amplify</label>
            <span className={`text-sm font-medium ${volume[0] > 7 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {volume[0].toFixed(1)}x {volume[0] > 7 && '⚠️'}
            </span>
          </div>
          <Slider value={volume} onValueChange={setVolume} max={10} min={0} step={0.1} className="w-full h-6 sm:h-8" />
          {volume[0] > 7 && <p className="text-xs text-destructive">High volume - protect your hearing</p>}
        </div>

        {/* Bass Control - Second Most Important */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-base sm:text-lg font-semibold text-foreground">Bass</label>
            <span className="text-sm font-medium text-muted-foreground">
              {bassGain[0] > 0 ? '+' : ''}{bassGain[0]} dB
            </span>
          </div>
          <Slider value={bassGain} onValueChange={setBassGain} max={15} min={-15} step={1} className="w-full h-6 sm:h-8" />
        </div>

        {/* Advanced Controls Toggle */}
        <Button onClick={() => setShowAdvanced(!showAdvanced)} variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Controls
        </Button>

        {/* Advanced Controls */}
        {showAdvanced && <div className="space-y-4 border-t pt-4">
            {/* Compressor Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Compressor</label>
                <span className="text-xs text-muted-foreground">{compressorThreshold[0]} dB</span>
              </div>
              <Slider value={compressorThreshold} onValueChange={setCompressorThreshold} max={0} min={-100} step={1} className="w-full h-5" />
            </div>

            {/* High-Pass Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">High-Pass</label>
                <span className="text-xs text-muted-foreground">{highPassFreq[0]} Hz</span>
              </div>
              <Slider value={highPassFreq} onValueChange={setHighPassFreq} max={500} min={20} step={10} className="w-full h-5" />
            </div>

            {/* EQ Frequency */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">EQ Freq</label>
                <span className="text-xs text-muted-foreground">{peakingFreq[0]} Hz</span>
              </div>
              <Slider value={peakingFreq} onValueChange={setPeakingFreq} max={8000} min={200} step={100} className="w-full h-5" />
            </div>

            {/* EQ Gain */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">EQ Gain</label>
                <span className="text-xs text-muted-foreground">{peakingGain[0]} dB</span>
              </div>
              <Slider value={peakingGain} onValueChange={setPeakingGain} max={20} min={-20} step={1} className="w-full h-5" />
            </div>
          </div>}

        {/* Test Sound Button */}
        <Button onClick={playTestSound} className="w-full h-12 text-base font-medium" variant="secondary">
          <Volume2 className="mr-2 h-5 w-5" />
          Test Sound
        </Button>
      </div>
    </div>;
};
export default AudioControls;