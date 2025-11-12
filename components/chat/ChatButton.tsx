'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWidget } from './ChatWidget';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Pulse animation wrapper */}
      <div className="fixed bottom-32 right-6 z-50">
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-2xl animate-pulse" />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-[90px] w-[90px] rounded-2xl shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 p-2 border-2 border-blue-500/20"
          aria-label="Open chat support"
          title="Ask about my skills, projects & experience"
        >
          <MessageCircle className="h-9 w-9" />
          <span className="text-[11px] font-bold leading-tight tracking-wide">Support Chat</span>
        </Button>
      </div>

      <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
