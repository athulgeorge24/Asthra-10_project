import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import MoodSelector from './components/MoodSelector';
import DemoSection from './components/DemoSection';
import HowItWorks from './components/HowItWorks';
import SpotifySection from './components/SpotifySection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import MusicVisualizer from './components/MusicVisualizer';
import ThemeToggle from './components/ThemeToggle';
import BackgroundMusic from "./components/BackgroundMusic";
import GlobalFloatingBackground from './components/GlobalFloatingBackground';


function App() {
  const [selectedMood, setSelectedMood] = useState('excited');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="
      min-h-screen 
      overflow-x-hidden 
      flex flex-col items-center justify-center
      bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800
      text-white dark:text-gray-100
    ">
       {/* 🎵 Background Music */}
      <BackgroundMusic />
      {/* ✅ FLOATING MAGIC — ADD THIS LINE */}
      <GlobalFloatingBackground />
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Music Visualizer */}
      <MusicVisualizer />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero selectedMood={selectedMood} />
            <MoodSelector 
              selectedMood={selectedMood} 
              setSelectedMood={setSelectedMood} 
            />
            <DemoSection />
            <HowItWorks />
            <SpotifySection />
            <TeamSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default App;