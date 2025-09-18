import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  selectedMood: string;
}

const moodGradients = {
  excited: 'from-yellow-400 via-orange-500 to-red-500',
  calm: 'from-blue-400 via-teal-500 to-green-500',
  stressed: 'from-red-400 via-purple-500 to-pink-500',
  happy: 'from-pink-400 via-purple-500 to-indigo-500',
  sad: 'from-blue-600 via-indigo-700 to-purple-800',
  energetic: 'from-green-400 via-blue-500 to-purple-600',
};

const Hero: React.FC<HeroProps> = ({ selectedMood }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Dynamic Background Gradient */}
      <motion.div
        key={selectedMood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.0 }}
        transition={{ duration: 1.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${moodGradients[selectedMood] || moodGradients.excited}`}
      />
      


      {/* Main Content */}
{/* Main Content */}
<div className="relative z-10 text-center max-w-5xl">
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="mb-8"
  >
    <div className="flex items-center justify-center mb-6">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="p-4 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20"
      >
        <Music className="w-12 h-12" />
      </motion.div>
    </div>

<motion.h1
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
>
  <span className="text-white !invert-0 !text-white">
    MoodBeats
  </span>
</motion.h1>


    <motion.p
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-2xl md:text-3xl mb-8 font-light text-black/80 dark:text-blue-100"
    >
      Turn your emotions into music instantly
    </motion.p>
  </motion.div>
</div>


{/* Scroll Indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 2, duration: 1 }}
  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="flex justify-center"
  >
    {/* Down Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-black dark:text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </motion.div>
</motion.div>

    </section>
  );
};

export default Hero;