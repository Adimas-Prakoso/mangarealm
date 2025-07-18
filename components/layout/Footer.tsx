'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Mail, MessageCircle } from 'lucide-react';

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { href: '/', label: 'Home' },
      { href: '/browse', label: 'Browse' },
      { href: '/history', label: 'History' },
      { href: '/about', label: 'About' },
    ],
    'Categories': [
      { href: '/browse?type=manga', label: 'Manga' },
      { href: '/browse?type=manhwa', label: 'Manhwa' },
      { href: '/browse?type=manhua', label: 'Manhua' },
      { href: '/browse?type=novel', label: 'Novels' },
    ],
    'Support': [
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  const socialLinks = [
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: MessageCircle, label: 'Discord' },
    { href: '#', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className={`bg-background border-t ${className || ''}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.webp"
                alt="MangaRealm"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">MangaRealm</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your ultimate destination for reading manga, manhwa, manhua, and novels. 
              Discover new stories and follow your favorite series with our modern reading experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} MangaRealm. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Made with ❤️ for manga lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}