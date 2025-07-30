import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-slate-50 text-slate-900 py-16 px-4 md:px-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 leading-tight">
            India’s 1st{' '}
            <span className="text-sky-400">4000 - 6000 ppb Hydrogen Water</span> Enhancer Device
          </h1>
          <p className="text-lg mb-6">
            Pure health. Pure energy. Unlock cellular hydration with every sip.
          </p>
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition">
            Buy Now
          </button>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="md:w-1/2 w-full flex justify-center"
        >
          <img
            src="/images/water-enhancer.png"
            alt="Hydrogen Water Device"
            className="max-w-full h-auto rounded-xl shadow-xl object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
