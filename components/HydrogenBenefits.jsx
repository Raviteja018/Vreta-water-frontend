import React from "react";

const benefits = [
  {
    id: 1,
    icon: "🧪",
    title: "Powerful Antioxidant Support",
    description: "Neutralizes harmful free radicals and reduces oxidative stress — one of the root causes of aging and chronic illness.",
    image: "/images/benefits/antioxidant.jpg",
  },
  {
    id: 2,
    icon: "💧",
    title: "Improves Cellular Hydration",
    description: "Hydrogen water penetrates cells faster than regular water, boosting hydration efficiency by up to 63%.",
    image: "/images/benefits/hydration.jpg",
  },
  {
    id: 3,
    icon: "⚡",
    title: "Boosts Energy & Reduces Fatigue",
    description: "Enhances mitochondrial energy production by 27%, helping you feel more energized and focused.",
    image: "/images/benefits/energy.jpg",
  },
  {
    id: 4,
    icon: "❤️",
    title: "Supports Heart Health",
    description: "Helps reduce LDL cholesterol and supports healthy blood pressure levels in as little as 4 weeks.",
    image: "/images/benefits/heart.jpg",
  },
  {
    id: 5,
    icon: "🔥",
    title: "Enhances Metabolism",
    description: "Improves fat metabolism by 15–20%, supporting healthy weight management.",
    image: "/images/benefits/metabolism.jpg",
  },
  {
    id: 6,
    icon: "🧠",
    title: "Sharpens Mental Clarity",
    description: "Reduces brain fog and improves cognitive function — ideal for students, professionals, and the elderly.",
    image: "/images/benefits/clarity.jpg",
  },
  {
    id: 7,
    icon: "🌿",
    title: "Reduces Inflammation",
    description: "Lowers inflammation markers by up to 35%, supporting joint, muscle, and immune health.",
    image: "/images/benefits/inflammation.jpg",
  },
  {
    id: 8,
    icon: "🌟",
    title: "Improves Skin Health",
    description: "Hydrogen-rich water enhances skin elasticity, hydration, and reduces visible signs of aging.",
    image: "/images/benefits/skin.jpg",
  },
  {
    id: 9,
    icon: "💪",
    title: "Strengthens Immunity",
    description: "Supports your immune system by combating oxidative stress and promoting cellular repair.",
    image: "/images/benefits/immunity.jpg",
  },
  {
    id: 10,
    icon: "🛡️",
    title: "Acts Quickly — Works at the Cellular Level",
    description: "Unlike alkaline water, hydrogen water works deeply within your body — delivering benefits within minutes of drinking.",
    image: "/images/benefits/cellular.jpg",
  },
];

export default function HydrogenBenefits() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#035AA6]">Benefits of Hydrogen Water</h2>
        <p className="text-lg text-gray-600 mb-10">Proven benefits based on science and real-world use</p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ id, icon, title, description, image }) => (
            <div key={id} className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-2xl p-5 border border-gray-200">
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="text-xl font-semibold text-[#02539B] mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
              <button className="mt-4 inline-block text-[#0070C0] hover:underline text-sm">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
