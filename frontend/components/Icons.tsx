import React from 'react';
import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  MessageSquare,
  Sparkles,
  Droplet,
  Pin,
  Plus,
  Settings,
  Sun,
  Moon,
  Send,
  Menu,
  MoreHorizontal,
  Bot,
  X,
  User,
  Palette,
  Shield,
  Copy,
  Pencil,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ColorfulIconProps {
  icon: FC<LucideProps>;
  colorClass: string;
  size?: number;
  className?: string;
}

// Wrapper to easily apply colorful gradients or specific colors to icons
export const ColorfulIcon = ({ icon: Icon, colorClass, size = 20, className = '' }: ColorfulIconProps) => (
  <div className={`${colorClass} ${className} flex items-center justify-center`}>
    <Icon size={size} strokeWidth={2.5} />
  </div>
);

// Custom brand mark: a simple side-profile face outline (beauty/skincare theme).
// Built to match lucide's icon API so it can be used anywhere Droplet was.
export const FaceProfile: FC<LucideProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Forehead, nose, lips, chin */}
    <path d="M8 21c0-2 .3-3.2 1-4.2M8 21H6.5M8 21c-1.6-.3-2.5-1-2.5-2.3" />
    <path d="M6 18.7C4.7 17.8 4 16.3 4 14.2 4 9.1 7.6 4 13 4c3.9 0 7 3.4 7 7.3 0 1-.2 1.8-.6 2.5" />
    <path d="M13 4c-1 1.6-1.3 3-.9 4.4.3 1 .9 1.7 1.9 2.1.9.4 1.3 1 1.1 1.9-.2.8-.9 1.2-1.8 1.2h-.8c-.7 0-1 .5-.7 1.1l.6 1.1c.3.6 0 1.1-.7 1.1h-1.1" />
    {/* Simple hair sweep */}
    <path d="M13 4c2.2-.2 4 .9 4.6 2.7" />
    {/* Eye */}
    <path d="M9.6 9.2h.9" />
  </svg>
);

export {
  MessageSquare,
  Sparkles,
  Droplet,
  Pin,
  Plus,
  Settings,
  Sun,
  Moon,
  Send,
  Menu,
  MoreHorizontal,
  Bot,
  X,
  User,
  Palette,
  Shield,
  Copy,
  Pencil,
  Trash2,
  RefreshCw
};
