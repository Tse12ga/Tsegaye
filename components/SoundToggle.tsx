"use client";
import { useState, useEffect } from "react";
import { audioEngine } from "@/utils/audioEngine";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-mute on load until user interacts, but for portfolio we can default to unmuted 
    // and rely on browser auto-play policies (Web Audio API suspends until interaction).
    if (audioEngine) {
      setIsMuted(audioEngine.isMuted);
    }
  }, []);

  if (!mounted) return null;

  const toggleSound = () => {
    if (audioEngine) {
      const muted = audioEngine.toggleMute();
      setIsMuted(muted);
      if (!muted) audioEngine.playClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-[999] text-xs font-sans font-light uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 mix-blend-difference flex items-center gap-2"
    >
      SOUND [{isMuted ? "OFF" : "ON"}]
    </button>
  );
}
