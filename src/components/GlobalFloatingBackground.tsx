import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart } from 'lucide-react';

const GlobalFloatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const hue = (i * 137.5) % 360;
          const Icon = 
            i % 3 === 0 ? Music :
            i % 3 === 1 ? Sparkles :
            Heart;

          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              <Icon 
                className="w-6 h-6 md:w-8 md:h-8"
                style={{
                  color: `hsl(${hue}, 85%, 65%)`,
                  filter: `drop-shadow(0 0 8px hsl(${hue}, 85%, 65%, 0.6))`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalFloatingBackground;