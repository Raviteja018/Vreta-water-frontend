import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SolutionsSection = () => {
  const solutions = [
    {
      title: '💧 Hydrogen Water Systems',
      desc: 'Experience the benefits of 4000ppb molecular hydrogen water—better than alkaline or bottled water.',
      btn: 'Book a Demo',
      href: '#book-demo',
    },
    {
      title: '🔹 Wellness Integration Consulting',
      desc: 'Book a free consultation to discover how hydrogen technology can enhance your lifestyle or business.',
      btn: 'Book a Free Consultation',
      href: '#consultation',
    },
    {
      title: '🔧 After-Sales Support & Maintenance',
      desc: "Facing an issue or need help with your module? We're here for you!",
      btn: 'Request Support',
      href: '#support',
    },
    {
      title: '🔬 Hydrogen + Oxygen Gas Generators',
      desc: 'Explore our advanced 3-in-1 system designed for complete hydrogen wellness.',
      btn: 'See 3-in-1 System',
      href: '#three-in-one',
    },
  ];

  return (
    <section id="solutions" className="bg-slate-50 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          🔸 Our Hydrogen Solutions
        </h2>
        <h3 className="text-xl md:text-2xl text-sky-400 font-semibold mb-6">
          🔥 Engineered Wellness for Every Lifestyle
        </h3>
        <p className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
          💬 Experience science-backed hydrogen technology that delivers deep hydration, energy,
          and cellular rejuvenation — instantly and effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              layout
            >
              <h4 className="text-2xl font-semibold text-blue-900 mb-2">{item.title}</h4>
              <p className="text-slate-600 mb-4">{item.desc}</p>
              <a
                href={item.href}
                className="inline-block bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
              >
                {item.btn}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
