import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Copy, Check } from 'lucide-react';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const CONTACT_EMAIL = 'audify725@gmail.com';

const FooterSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast({
        title: "Email copied!",
        description: "Contact email has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the email manually.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      // Validate form data
      contactSchema.parse(data);

      // Create mailto link with encoded data
      const subject = encodeURIComponent('Contact from Audify');
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n\n` +
        `Message:\n${data.message}`
      );
      
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      toast({
        title: "Opening email client",
        description: "Your default email application will open shortly.",
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <footer className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* Contact Form */}
        <div className="w-full max-w-2xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Get in Touch</h3>
          
          {/* Email Display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Mail className="w-5 h-5 text-cyan-400" />
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-cyan-400 hover:text-cyan-300 transition duration-300 text-lg font-medium"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 hover:bg-blue-800 rounded-md transition duration-300"
              aria-label="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                maxLength={100}
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
                required
                maxLength={255}
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
                required
                maxLength={1000}
                className="w-full p-3 rounded-md bg-blue-800 border border-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 transform hover:scale-105"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-16 pt-8 border-t border-blue-800">
        &copy; 2024 Hear the World. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
