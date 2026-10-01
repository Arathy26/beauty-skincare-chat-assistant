import React, { useState, useRef } from 'react';
import { X, User, Palette, Shield, Droplet } from './Icons';
import { useChatActions } from '../context/ChatContext';
import { useUIState } from '../hooks/useUIState';
import { useFocusTrap } from '../utils/focusTrap';
import { SettingToggle } from './SettingToggle';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

type TabId = 'account' | 'appearance' | 'privacy';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, theme, toggleTheme }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const { handleClearHistory } = useChatActions();
  const { compactMode, toggleCompactMode, chatHistory, toggleChatHistory } = useUIState();

  // Trap focus within the modal when open
  useFocusTrap(modalRef);

  const handleClearHistoryWithConfirmation = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all your chat history? This cannot be undone.'
    );
    if (confirmed) {
      handleClearHistory();
      onClose();
    }
  };

  // Close on Escape key — standard modal accessibility behaviour
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div ref={modalRef} className="w-full max-w-5xl h-[85vh] max-h-[800px] bg-pink-50 dark:bg-gray-900 rounded-3xl shadow-2xl flex overflow-hidden animate-fade-in-up relative border border-gray-200 dark:border-gray-800">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Left Sidebar */}
        <div className="w-64 bg-pink-50/50 dark:bg-gray-950/50 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 px-2">Settings</h2>
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? 'bg-pink-50 dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-sm border border-gray-200 dark:border-gray-700'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-pink-500 dark:text-pink-400' : 'text-gray-400 dark:text-gray-500'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-pink-50 dark:bg-gray-900">
          <div className="max-w-2xl">
            {activeTab === 'account' && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Account</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">About this assistant.</p>
                </div>

                <div className="flex items-center gap-6 p-6 bg-pink-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Droplet size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Glo — Beauty &amp; Skincare Assistant</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No sign-in is required to use Glo. It runs locally and doesn't store your account anywhere.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Appearance</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Customize how Glo looks on your device.</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Theme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {(['light', 'dark'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => { if (theme !== t) toggleTheme(); }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${theme === t ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white mb-1 capitalize">{t}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Use {t} theme</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Chat Density</h4>
                  <SettingToggle
                    label="Compact Mode"
                    description="Reduce spacing between messages"
                    checked={compactMode}
                    onToggle={toggleCompactMode}
                  />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Privacy & Security</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Control your data and privacy preferences.</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Data Controls</h4>

                  <SettingToggle
                    label="Chat History"
                    description="Save new chats to your history."
                    checked={chatHistory}
                    onToggle={toggleChatHistory}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Danger Zone</h4>
                  <button
                    onClick={handleClearHistoryWithConfirmation}
                    className="px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    Clear all chat history
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
