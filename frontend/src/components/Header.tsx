import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          YourBrand
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-800" />
          ) : (
            <Sun className="h-5 w-5 text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;