'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  X,
  BookOpen,
  History,
  Heart
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: BookOpen },
    { href: '/browse', label: 'Browse', icon: Search },
    { href: '/history', label: 'History', icon: History },
    ...(user ? [{ href: '/followed', label: 'Followed', icon: Heart }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.webp"
              alt="MangaRealm"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">MangaRealm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search manga, manhwa, novels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle - Always visible */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Desktop User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Search</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search manga, manhwa, novels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-base"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Search
                </Button>
              </form>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/browse?type=manga"
                    className="p-3 rounded-lg border text-center hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-sm font-medium">Manga</div>
                  </Link>
                  <Link
                    href="/browse?type=manhwa"
                    className="p-3 rounded-lg border text-center hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-sm font-medium">Manhwa</div>
                  </Link>
                  <Link
                    href="/browse?type=manhua"
                    className="p-3 rounded-lg border text-center hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-sm font-medium">Manhua</div>
                  </Link>
                  <Link
                    href="/browse?type=novel"
                    className="p-3 rounded-lg border text-center hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-sm font-medium">Novels</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}