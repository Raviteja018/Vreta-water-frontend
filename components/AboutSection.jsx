import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headings */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Who We Are
        </h2>
        <h3 className="text-xl md:text-2xl text-sky-400 font-semibold mb-6">
          Pioneers in Hydrogen Wellness
        </h3>

        {/* Description */}
        <p className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
          We are India’s first to deliver <span className="font-semibold text-blue-900">4000ppb hydrogen water technology</span>,
          setting new standards in wellness and hydration. With cutting-edge science and proven health benefits,
          we lead the way in transforming how the nation hydrates, heals, and lives better.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-4xl font-bold text-blue-900 mb-2">10+</h4>
            <p className="text-slate-600 font-medium">Years of Experience</p>
            <p className="text-sm text-slate-500 mt-1">
              We deliver science-backed hydration solutions trusted across India.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-4xl font-bold text-blue-900 mb-2">500+</h4>
            <p className="text-slate-600 font-medium">Studies</p>
            <p className="text-sm text-slate-500 mt-1">
              Our hydrogen water systems deliver proven health benefits you can trust.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-4xl font-bold text-blue-900 mb-2">1000+</h4>
            <p className="text-slate-600 font-medium">Users</p>
            <p className="text-sm text-slate-500 mt-1">
              Our hydrogen water systems are transforming health across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


















