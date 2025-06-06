import React from 'react';
import LaunchCountdown from './LaunchCountdown';
import UserCount from './UserCount'; 

interface HeroSectionProps {
  onNotifyClick: () => void;
  refreshSignal: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNotifyClick, refreshSignal }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Something Amazing Is
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 py-6">
            Coming Soon
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We're working hard to bring you something extraordinary. Sign up now to be the first to know when we launch.
        </p>
        
        <LaunchCountdown />
          <div className="mt-8">
        <UserCount refreshSignal={refreshSignal} />
      </div>

        <button
          onClick={onNotifyClick}
          className="mt-10 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
        >
          Notify Me
        </button>
      </div>
    </section>
  );
};

export default HeroSection;