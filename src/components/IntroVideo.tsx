import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play the video as soon as it mounts
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video autoplay failed:", err);
        // If autoplay completely fails (e.g. strict browser policies), we just move on
        setTimeout(onComplete, 1000);
      });
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      <motion.div
        key="video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="relative w-full h-full bg-black"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted
          preload="auto"
          onEnded={onComplete}
          onError={(e) => {
            console.error("Video error event:", e);
            setTimeout(onComplete, 1000);
          }}
        >
          <source src="/Video Project 7.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </motion.div>

      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-60" />
      </div>

      {/* Overlay Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-display text-white tracking-tight drop-shadow-2xl mb-6 text-center"
        >
          Hirushi <span className="italic font-light text-white/80 mx-2">&</span> Vishwa
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 sm:w-20 h-[1px] bg-white/60" />
          <p className="text-white/90 uppercase tracking-[0.4em] text-xs sm:text-sm font-serif drop-shadow-md">Wedding Invitation</p>
          <div className="w-12 sm:w-20 h-[1px] bg-white/60" />
        </motion.div>
      </motion.div>
    </div>
  );
};

