'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Search, 
  History, 
  Heart,
  User,
  Settings
} from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      active: pathname === '/'
    },
    {
      href: '/browse',
      label: 'Browse',
      icon: Search,
      active: pathname === '/browse'
    },
    {
      href: '/history',
      label: 'History',
      icon: History,
      active: pathname === '/history'
    },
    ...(user ? [{
      href: '/followed',
      label: 'Followed',
      icon: Heart,
      active: pathname === '/followed'
    }] : []),
    {
      href: user ? '/profile' : '/login',
      label: user ? 'Profile' : 'Login',
      icon: user ? User : User,
      active: pathname === '/profile' || pathname === '/login'
    }
  ];

  // Don't show on reading pages for immersive experience
  if (pathname.includes('/read/')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bottom-nav mobile-tap">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item flex flex-col items-center justify-center p-3 rounded-xl min-w-0 flex-1 btn-mobile ${
              item.active
                ? 'active text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
            }`}
          >
            <item.icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${
              item.active ? 'scale-110' : ''
            }`} />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </Link>
        ))}
        
        {/* Admin button for admin users */}
        {user?.isAdmin && (
          <Link
            href="/admin"
            className={`bottom-nav-item flex flex-col items-center justify-center p-3 rounded-xl min-w-0 flex-1 btn-mobile ${
              pathname === '/admin'
                ? 'active text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
            }`}
          >
            <Settings className={`h-5 w-5 mb-1 transition-transform duration-200 ${
              pathname === '/admin' ? 'scale-110' : ''
            }`} />
            <span className="text-xs font-medium truncate">Admin</span>
          </Link>
        )}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}