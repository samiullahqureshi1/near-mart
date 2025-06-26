import React from "react";

const features = [
  {
    icon: "✅",
    text: "Professionally refurbished",
    href: "#",
  },
  {
    icon: "💰",
    text: "Cashback with Trade-in",
    href: "#",
  },
  {
    icon: "💳",
    text: "Pay-as-you-go",
    href: "#",
  },
  {
    icon: "📱",
    text: "App exclusive features",
    href: "#",
  },
];

const TechBetterBanner = () => {
  return (
    <div className="w-full bg-[#f8f9fb] py-12 px-4 md:px-10 lg:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">Tech better with us.</h2>
      <p className="text-lg text-gray-700 mb-10">
        Buy and sell tech that’s better for the planet.
      </p>

      <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
        {features.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[250px] justify-center"
          >
            <span className="text-xl bg-gray-100 p-2 rounded-full">{item.icon}</span>
            <span className="text-sm font-medium underline">{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TechBetterBanner;
