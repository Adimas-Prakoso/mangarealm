'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BookOpen, Heart, Search, History } from 'lucide-react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Vast Library',
      description: 'Access thousands of manga, manhwa, manhua, and novels'
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find exactly what you\'re looking for with powerful filters'
    },
    {
      icon: History,
      title: 'Reading History',
      description: 'Never lose track of where you left off'
    },
    {
      icon: Heart,
      title: 'Follow Series',
      description: 'Keep up with your favorite ongoing series'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.webp"
              alt="MangaRealm"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          <DialogTitle className="text-center text-2xl">
            Welcome to MangaRealm! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Your ultimate destination for reading manga, manhwa, manhua, and novels. 
            Discover amazing stories and immerse yourself in different worlds.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-shrink-0">
                <feature.icon className="h-5 w-5 text-primary mt-0.5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={handleClose} className="flex-1">
            Start Reading
          </Button>
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Browse Library
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          No account required to start reading! Create one to unlock additional features.
        </p>
      </DialogContent>
    </Dialog>
  );
}