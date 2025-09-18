import React from 'react';
import { motion } from 'framer-motion';

const DemoSection: React.FC = () => {
  return (
<section className="flex justify-center items-center min-h-screen bg-transparent p-4">      
  <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
<div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center">         
<h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-pink-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg mb-12">
  App Features
</h3>
          <div className="space-y-5 text-left mx-auto max-w-2xl"> 
            {[
              'Real-time mood analysis from text input',
              'AI-powered music recommendation engine',
              'Seamless Spotify playlist integration',
              'Personalized learning and adaptation',
              'Beautiful, intuitive user interface'
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 text-blue-100"
              >
                <div className="flex items-start space-x-5">
  {/* GIANT bullet — now 8px circle, glowing gradient, more presence */}
  <div className="w-3 h-3 mt-3 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-full flex-shrink-0 shadow-lg" />

  {/* MASSIVE feature text — up to 2xl on desktop, bold weight */}
  <span className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-white">
    {feature}
  </span>
</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DemoSection;