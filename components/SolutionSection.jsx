import React from 'react';

const SolutionsSection = () => {
  return (
    <section id="solutions" className="bg-slate-50 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          🔸 Our Hydrogen Solutions
        </h2>
        <h3 className="text-xl md:text-2xl text-sky-400 font-semibold mb-10">
          🔥 Engineered Wellness for Every Lifestyle
        </h3>
        <p className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
          💬 Experience science-backed hydrogen technology that delivers deep hydration, energy, and cellular rejuvenation — instantly and effectively.
        </p>

        {/* Grid of Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Solution 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold text-blue-900 mb-2">💧 Hydrogen Water Systems</h4>
            <p className="text-slate-600 mb-4">
              Experience the benefits of <strong>4000ppb molecular hydrogen water</strong>—better than alkaline or bottled water.
            </p>
            <a
              href="#book-demo"
              className="inline-block bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
            >
              Book a Demo
            </a>
          </div>

          {/* Solution 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold text-blue-900 mb-2">🔹 Wellness Integration Consulting</h4>
            <p className="text-slate-600 mb-4">
              Book a free consultation to discover how hydrogen technology can enhance your lifestyle or business.
            </p>
            <a
              href="#consultation"
              className="inline-block bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
            >
              Book a Free Consultation
            </a>
          </div>

          {/* Solution 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold text-blue-900 mb-2">🔧 After-Sales Support & Maintenance</h4>
            <p className="text-slate-600 mb-4">
              Facing an issue or need help with your module? We're here for you!
            </p>
            <a
              href="#support"
              className="inline-block bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
            >
              Request Support
            </a>
          </div>

          {/* Solution 4 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold text-blue-900 mb-2">🔬 Hydrogen + Oxygen Gas Generators</h4>
            <p className="text-slate-600 mb-4">
              Explore our advanced <strong>3-in-1 system</strong> designed for complete hydrogen wellness.
            </p>
            <a
              href="#three-in-one"
              className="inline-block bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
            >
              See 3-in-1 System
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
