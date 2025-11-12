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
      <div className="fixed bottom-8 right-6 z-50">
        <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse" />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-[88px] w-[88px] rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1 p-2"
          aria-label="Open chat support"
          title="Ask about my skills, projects & experience"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="text-[10px] font-semibold leading-tight">Support Chat</span>
        </Button>
      </div>

      <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
