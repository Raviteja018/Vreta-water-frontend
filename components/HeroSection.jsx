import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-slate-50 text-slate-900 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            India’s 1st <span className="text-sky-400">4000 - 6000 ppb Hydrogen Water</span> Enhancer Device
          </h1>
          <p className="text-lg mb-6">
            Pure health. Pure energy. Unlock cellular hydration with every sip.
          </p>
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition">
            Buy Now
          </button>
        </div>

        <div className="md:w-1/2">
          <img
            src="/images/water-enhancer.png"
            alt="Hydrogen Water Device"
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
