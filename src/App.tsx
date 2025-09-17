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

function App() {
  const [selectedMood, setSelectedMood] = useState('excited');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-x-hidden">
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