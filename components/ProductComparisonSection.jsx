import React from "react";

const ProductCard = ({ title, image, features, originalPrice, discountedPrice, bestFor }) => (
  <div className="bg-white shadow-2xl rounded-3xl p-6 w-full lg:w-[48%] hover:scale-[1.02] transition-all duration-300 border border-gray-100">
    <h3 className="text-2xl font-extrabold text-indigo-800 mb-4 text-center">{title}</h3>

    <img
      src={image}
      alt={title}
      className="rounded-xl w-full h-64 object-contain mb-6 border bg-gray-50 p-2"
    />

    <ul className="space-y-2 mb-6 text-gray-700 text-sm md:text-base">
      {features.map((item, idx) => (
        <li key={idx}>
          <span className="font-semibold text-gray-900">{item.label}:</span> {item.value}
        </li>
      ))}
    </ul>

    <div className="mb-4">
      <p className="text-sm text-gray-500 line-through">Original: {originalPrice}</p>
      <p className="text-xl md:text-2xl font-bold text-green-600">Now: {discountedPrice}</p>
    </div>

    <p className="text-sm text-gray-600 italic">
      <span className="font-medium text-black">Best For:</span> {bestFor}
    </p>
  </div>
);

const HydrogenModulesSection = () => {
  const v1Features = [
    { label: "Function", value: "Produces hydrogen water + hydrogen gas + oxygen" },
    { label: "Hydrogen Concentration", value: "High output with additional gas therapy options" },
    { label: "Freshness", value: "Real-time generation — ideal for therapy & multi-use" },
    { label: "Use Case", value: "Personal + Commercial (clinics, spas, etc.)" },
    { label: "Bottling Suitability", value: "❌ Hydrogen must be consumed fresh" },
    { label: "Output Types", value: "Hydrogen Water + Hydrogen Gas + Oxygen" },
    { label: "Flow Rate", value: "500ml/min — supports multiple users" },
  ];

  const v1ProFeatures = [
    { label: "Function", value: "Produces fresh hydrogen-rich water" },
    { label: "Hydrogen Concentration", value: "4000+ ppb (very high & stable)" },
    { label: "Freshness", value: "Real-time generation — full benefit preserved" },
    { label: "Use Case", value: "Personal wellness, daily hydration" },
    { label: "Bottling Suitability", value: "❌ Not recommended — hydrogen escapes in seconds" },
    { label: "Output Types", value: "Hydrogen Water" },
    { label: "Flow Rate", value: "Standard personal use" },
  ];

  return (
    <section className="px-4 md:px-10 py-12 bg-gradient-to-br from-[#f7faff] to-[#e4ecf9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          Hydrogen Module Difference
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-sm md:text-base">
          Real Hydrogen, Real Results. Our modules generate high-concentration hydrogen water
          fresh on demand—ensuring maximum absorption and scientifically proven health benefits.
        </p>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <ProductCard
            title="V1 Pro Hydrogen Module"
            image="/images/v1-pro.png"
            features={v1ProFeatures}
            originalPrice="₹6,65,000"
            discountedPrice="₹5,52,825"
            bestFor="Individuals & Home Users"
          />
          <ProductCard
            title="V1 Hydrogen Module"
            image="/images/v1.png"
            features={v1Features}
            originalPrice="₹4,45,000"
            discountedPrice="₹3,93,025"
            bestFor="Clinics, Wellness Centers, Premium Use Cases"
          />
        </div>
      </div>
    </section>
  );
};

export default HydrogenModulesSection;
