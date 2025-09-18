import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MusicVisualizer: React.FC = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    setBars(Array.from({ length: 50 }, () => Math.random() * 100));

    const interval = setInterval(() => {
      setBars(prevBars => 
        prevBars.map(() => Math.random() * 100)
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 🌈 RAINBOW AUDIO BARS */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 opacity-10">
        {bars.map((height, index) => {
          const hue = (index * 137.5) % 360; // Unique hue per bar
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ 
                duration: 0.15,
                ease: "easeInOut"
              }}
              className="w-2 rounded-t-sm min-h-[4px]"
              style={{
                maxHeight: '60vh',
                background: `linear-gradient(to top, hsl(${hue}, 60%, 40%), hsl(${hue}, 80%, 70%))`,
              }}
            />
          );
        })}
      </div>
      
      {/* 🌈 RAINBOW UPWARD PARTICLES */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const hue = (i * 137.5) % 360;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: `hsl(${hue}, 85%, 65%)`,
                boxShadow: `0 0 6px 1px hsl(${hue}, 85%, 65%, 0.5)`,
                left: `${Math.random() * 100}%`,
                bottom: '0',
              }}
              initial={{ 
                y: window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: -window.innerHeight - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MusicVisualizer;