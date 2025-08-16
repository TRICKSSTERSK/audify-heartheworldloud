
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import FooterSection from './FooterSection';
import ScrollToTop from './ScrollToTop';

const AudioMirror = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [audioStatus, setAudioStatus] = useState('Microphone inactive. Click "Start Listening" to begin.');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const highPassFilterRef = useRef<BiquadFilterNode | null>(null);
  const peakingFilterRef = useRef<BiquadFilterNode | null>(null);

  const { toast } = useToast();

  const startAudioMirror = async () => {
    if (isStreaming) {
      stopAudioMirror();
      return;
    }

    try {
      if (!hasMicPermission) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicPermission(true);
        streamRef.current = stream;
      }

      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContext();
      }

      if (streamRef.current && audioContextRef.current) {
        // Create audio nodes
        sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(streamRef.current);
        
        // Create effects chain
        compressorNodeRef.current = audioContextRef.current.createDynamicsCompressor();
        compressorNodeRef.current.threshold.value = -24;
        compressorNodeRef.current.knee.value = 30;
        compressorNodeRef.current.ratio.value = 12;
        compressorNodeRef.current.attack.value = 0.003;
        compressorNodeRef.current.release.value = 0.25;

        highPassFilterRef.current = audioContextRef.current.createBiquadFilter();
        highPassFilterRef.current.type = 'highpass';
        highPassFilterRef.current.frequency.value = 80;
        highPassFilterRef.current.Q.value = 1;

        peakingFilterRef.current = audioContextRef.current.createBiquadFilter();
        peakingFilterRef.current.type = 'peaking';
        peakingFilterRef.current.frequency.value = 1000;
        peakingFilterRef.current.gain.value = 0;
        peakingFilterRef.current.Q.value = 1;

        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 1;

        // Connect the audio graph
        sourceNodeRef.current.connect(compressorNodeRef.current);
        compressorNodeRef.current.connect(highPassFilterRef.current);
        highPassFilterRef.current.connect(peakingFilterRef.current);
        peakingFilterRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        setIsStreaming(true);
        setAudioStatus('Microphone active. Adjust effects and volume in the controls below.');
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        toast({
          title: "Audio Mirror Started",
          description: "You should now hear your microphone input with enhanced audio processing",
        });
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setAudioStatus(`Error: Could not access microphone. Please allow microphone access and ensure headphones are connected.`);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check permissions and try again.",
      });
    }
  };

  const stopAudioMirror = () => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Reset refs
    sourceNodeRef.current = null;
    gainNodeRef.current = null;
    compressorNodeRef.current = null;
    highPassFilterRef.current = null;
    peakingFilterRef.current = null;

    setIsStreaming(false);
    setAudioStatus('Microphone inactive. Click "Start Listening" to begin.');
    
    toast({
      title: "Audio Mirror Stopped",
      description: "Audio mirroring has been stopped",
    });
  };

  const handleHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        onStartListening={startAudioMirror}
        onHowItWorks={handleHowItWorks}
        isStreaming={isStreaming}
        audioStatus={audioStatus}
      />
      <HowItWorksSection />
      <FeaturesSection />
      <AboutSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default AudioMirror;
