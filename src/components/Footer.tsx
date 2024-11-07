import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Your trusted destination for quality products and exceptional shopping experiences.
            </p>
            <div className="flex space-x-4 pt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Shop', 'About Us', 'Contact', 'Blog', 'FAQs', 'Shipping Policy', 'Returns Policy', 'Terms & Conditions'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">123 Commerce St, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm">support@example.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 text-gray-900 rounded-l focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-4">
            <Truck className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="text-white font-medium">Free Shipping</h4>
              <p className="text-sm">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="text-white font-medium">Secure Payment</h4>
              <p className="text-sm">100% secure payment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CreditCard className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="text-white font-medium">Payment Methods</h4>
              <p className="text-sm">All major cards accepted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 Havebreak E-commerce. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;