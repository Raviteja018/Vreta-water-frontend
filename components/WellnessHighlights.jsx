import React from 'react';
import { FaTint, FaFlask, FaSpa } from 'react-icons/fa';

const highlights = [
  {
    id: '01',
    title: 'Hydrogen That Heals',
    icon: <FaTint className="text-blue-400 text-3xl" />,
    category: 'Hydration',
    subtitle: '💧 Hydrogen Water Modules',
    description:
      'Experience 4000+ ppb hydrogen water, freshly generated on demand—designed to hydrate, detoxify, and restore at a cellular level.',
    action: 'Explore Modules',
  },
  {
    id: '02',
    title: 'Powered by Proven Science',
    icon: <FaFlask className="text-blue-400 text-3xl" />,
    category: 'Science',
    subtitle: '🌍 Scientifically Proven',
    description:
      'Backed by 500+ global studies, our hydrogen systems outperform alkaline water—offering 43% more antioxidant protection and faster absorption.',
    action: 'See Health Benefits',
  },
  {
    id: '03',
    title: 'Wellness That Works for You',
    icon: <FaSpa className="text-blue-400 text-3xl" />,
    category: 'Wellness',
    subtitle: '🌿 Versatile Wellness Systems',
    description:
      "Whether you're at home, in a spa, or running a wellness brand—our systems deliver customized hydrogen and oxygen solutions to fit your needs.",
    action: 'See 3-in-1 System',
  },
];

const WhyHydrogenSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10"
          data-aos="zoom-in"
        >
          Why Choose Our Hydrogen Systems?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {highlights.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <div>
                  <p className="text-xs text-gray-500">{item.id}</p>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600">{item.subtitle}</p>
              <p className="text-gray-600 text-sm my-4">{item.description}</p>
              <button className="mt-auto text-blue-600 hover:underline text-sm font-semibold">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHydrogenSection;
