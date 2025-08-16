
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-lg h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-xl flex items-center justify-center text-green-700 text-6xl">
            🌍🎧
          </div>
        </div>
        {/* Text Block */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Empowering Connections</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
            This innovative tool is meticulously built to empower individuals with partial hearing loss, enabling them to effortlessly reconnect with the world around them. With just your web browser and a pair of headphones, you can enjoy clearer conversations and experience a fuller, more engaging auditory environment. We believe in technology that bridges gaps and fosters inclusion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
