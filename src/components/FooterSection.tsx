
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FooterSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <footer className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full bg-blue-800 border-blue-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-blue-800 border-blue-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your message here..."
                className="w-full p-3 rounded-md bg-blue-800 border border-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 transform hover:scale-105"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end">
          <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
          <nav className="flex flex-col space-y-3">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">How It Works</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">About Us</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a>
          </nav>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-16 pt-8 border-t border-blue-800">
        &copy; 2024 Hear the World. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
