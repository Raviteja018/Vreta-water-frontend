import React from 'react';

const ProductCard = ({ title, image, features, price, bestFor }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full lg:w-[48%] transition-transform hover:scale-[1.01]">
    <h3 className="text-2xl font-bold text-indigo-700 mb-4">{title}</h3>
    <img src={image} alt={title} className="rounded-xl w-full h-64 object-cover mb-6 border" />
    <ul className="space-y-2 mb-4 text-gray-700">
      {features.map((item, idx) => (
        <li key={idx}>
          <span className="font-semibold text-gray-800">{item.label}:</span> {item.value}
        </li>
      ))}
    </ul>
    <p className="text-xl font-semibold text-green-700 mb-2">Price: {price}</p>
    <p className="text-md text-gray-600">Best For: <span className="font-medium text-black">{bestFor}</span></p>
  </div>
);

const HydrogenModulesSection = () => {
  const v1Features = [
    { label: 'Function', value: 'Produces fresh hydrogen-rich water' },
    { label: 'Hydrogen Concentration', value: '4000+ ppb (very high & stable)' },
    { label: 'Freshness & Potency', value: 'Real-time generation — full benefit preserved' },
    { label: 'Use Case', value: 'Personal wellness, daily hydration' },
    { label: 'Bottling Suitability', value: '❌ Not recommended — hydrogen escapes in seconds' },
    { label: 'Output Types', value: 'Hydrogen Water' },
    { label: 'Flow Rate', value: 'Standard personal use' },
  ];

  const v2Features = [
    { label: 'Function', value: 'Produces hydrogen water + hydrogen gas + oxygen' },
    { label: 'Hydrogen Concentration', value: 'High output with additional gas therapy options' },
    { label: 'Freshness & Potency', value: 'Real-time generation — ideal for therapy & multi-use' },
    { label: 'Use Case', value: 'Personal + Commercial (clinics, spas, etc.)' },
    { label: 'Bottling Suitability', value: '❌ Same — hydrogen must be consumed fresh' },
    { label: 'Output Types', value: 'Hydrogen Water + Hydrogen Gas + Oxygen' },
    { label: 'Flow Rate', value: '500ml/min — supports multiple users' },
  ];

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Hydrogen Module Difference
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Real Hydrogen, Real Results. Unlike typical bottled hydrogen water that loses potency within minutes, our modules generate high-concentration hydrogen water fresh on demand—ensuring maximum absorption, effectiveness, and scientifically proven health benefits.
      </p>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <ProductCard
          title="V1 Hydrogen Module"
          image='/images/v1.png'
          features={v1Features}
          price="₹5,51,815"
          bestFor="Individuals & Home Users"
        />
        <ProductCard
          title="V2 Hydrogen Module"
          image='/images/v2.jpg'
          features={v2Features}
          price="₹3,93,025"
          bestFor="Clinics, Wellness Centers, Premium Use Cases"
        />
      </div>
    </section>
  );
};

export default HydrogenModulesSection;









