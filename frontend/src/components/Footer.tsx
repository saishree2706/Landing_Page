import React from 'react';
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 shadow-inner">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Location Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Our Location</h3>
            <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400" />
              <p>
                123 Innovation Way<br />
                Tech District<br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <a href="mailto:info@yourbrand.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  info@yourbrand.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
          
          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;