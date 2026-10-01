import React from 'react';
import { Theme } from '../types';
import { Menu, Sun, Moon, Droplet, User } from './Icons';

interface TopNavProps {
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  currentChatTitle?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ theme, toggleTheme, toggleSidebar, currentChatTitle }) => {
  return (
    // FIXED HEIGHT HEADER: Explicitly set h-16 (64px) to prevent compression
    // position: sticky top-0 keeps header visible when ChatArea scrolls
    // flex-shrink-0 prevents Tailwind flex from shrinking this element
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-6 bg-pink-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/50 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 md:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm">
            <Droplet size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 hidden sm:block">
          Glo
          </span>
        </div>

        {currentChatTitle && (
          <>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate max-w-[200px] sm:max-w-xs">
              {currentChatTitle}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow flex-shrink-0">
          <User size={16} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
    </header>
  );
};
