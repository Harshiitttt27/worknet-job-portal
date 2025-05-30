import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Footer Content */}
        <div className="grid gap-12 row-gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <svg className="w-8 text-deep-purple-accent-400" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" fill="none">
                <rect x="3" y="1" width="7" height="12"></rect>
                <rect x="3" y="17" width="7" height="6"></rect>
                <rect x="14" y="1" width="7" height="6"></rect>
                <rect x="14" y="11" width="7" height="12"></rect>
              </svg>
              <span className="ml-2 text-3xl font-extrabold tracking-wide text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 uppercase shadow-lg">
                WorkNet
              </span>
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-300">
                Providing the best job opportunities to professionals worldwide. Join us and find your dream job today!
              </p>
             
            </div>
          </div>

          {/* Contacts Section */}
          <div>
            <p className="text-lg font-bold bg - white text-gray-200">Get in Touch</p>
            <div className="mt-4">
              <div className="flex items-center">
                <p className="mr-1 text-gray-300">Phone:</p>
                <a href="tel:7291886231" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">7291886231</a>
              </div>
              <div className="flex items-center mt-2">
                <p className="mr-1 text-gray-300">Email:</p>
                <a href="mailto:harrysethi52@gmail.com" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">harrysethi52@gmail.com</a>
              </div>
              <div className="flex items-center mt-2">
                <p className="mr-1 text-gray-300">Address:</p>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
               Delhi
                </a>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <p className="text-lg font-bold text-gray-200">Follow Us</p>
            <div className="flex items-center mt-4 space-x-4">
              <a href="https://x.com/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6C22.5,6.4,23.3,5.5,24,4.6z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx="15" cy="15" r="4"></circle>
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2V2C24,0.895,23.105,0,22,0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row mt-8">
          <p className="text-sm text-gray-300 font-medium tracking-wide text-center sm:text-left">
            © Copyright 2025 <span className="text-deep-purple-accent-400">WorkNet</span>. All rights reserved.
          </p>
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5">
            <li>
              <a href="/" className="text-lg text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline">F.A.Q</a>
            </li>
            <li>
              <a href="/" className="text-lg text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/" className="text-lg text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
