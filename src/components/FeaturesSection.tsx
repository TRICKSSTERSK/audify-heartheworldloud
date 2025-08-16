
import React from 'react';
import { Volume2, Headphones, Sparkles, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Volume2,
      title: "Real-time Amplification",
      description: "Experience instant voice boosting without any delay.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: Headphones,
      title: "Universal Compatibility",
      description: "Works seamlessly with both Bluetooth and wired earphones.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Sparkles,
      title: "AI Noise Filtering",
      description: "Intelligent algorithms filter out background noise for clearer audio.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Globe,
      title: "Browser-Based",
      description: "No downloads, no installations. Just open your browser and go!",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center transform hover:-translate-y-2">
              <div className={`w-20 h-20 mx-auto mb-6 ${feature.bgColor} rounded-full flex items-center justify-center shadow-inner`}>
                <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
