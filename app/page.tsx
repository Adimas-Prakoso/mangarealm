'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import {
  Clock,
  Star,
  Eye,
  BookOpen,
  ArrowRight,
  Flame
} from 'lucide-react';

// Dynamic import untuk komponen yang tidak critical
const WelcomePopup = dynamic(() => import('@/components/WelcomePopup'), {
  ssr: false,
  loading: () => null
});
import { Series } from '@/types';

// Mock data for development - replace with Firebase data later
const mockPopularSeries: Series[] = [
  {
    id: '1',
    title: 'One Piece',
    description: 'Follow Monkey D. Luffy and his crew as they search for the ultimate treasure.',
    coverImage: '/logo.webp',
    type: 'manga',
    status: 'ongoing',
    genres: ['Adventure', 'Comedy', 'Drama'],
    author: 'Eiichiro Oda',
    releaseYear: 1997,
    rating: 4.9,
    totalChapters: 1095,
    views: 2500000,
    followers: 850000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  },
  {
    id: '2',
    title: 'Solo Leveling',
    description: 'The weakest hunter becomes the strongest through a mysterious system.',
    coverImage: '/logo.webp',
    type: 'manhwa',
    status: 'completed',
    genres: ['Action', 'Fantasy', 'Adventure'],
    author: 'Chugong',
    artist: 'DUBU',
    releaseYear: 2018,
    rating: 4.8,
    totalChapters: 179,
    views: 1800000,
    followers: 650000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  },
  {
    id: '3',
    title: 'Tower of God',
    description: 'A boy enters a mysterious tower to chase after his friend.',
    coverImage: '/logo.webp',
    type: 'manhwa',
    status: 'ongoing',
    genres: ['Action', 'Adventure', 'Mystery'],
    author: 'SIU',
    releaseYear: 2010,
    rating: 4.7,
    totalChapters: 595,
    views: 1200000,
    followers: 420000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  }
];

const mockRecentUpdates: Series[] = [
  {
    id: '4',
    title: 'Jujutsu Kaisen',
    description: 'A high school student joins a secret organization of Jujutsu Sorcerers.',
    coverImage: '/logo.webp',
    type: 'manga',
    status: 'ongoing',
    genres: ['Action', 'Supernatural', 'School'],
    author: 'Gege Akutami',
    releaseYear: 2018,
    rating: 4.6,
    totalChapters: 245,
    views: 980000,
    followers: 320000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  },
  {
    id: '5',
    title: 'The Beginning After The End',
    description: 'A king reincarnated in a world of magic and monsters.',
    coverImage: '/logo.webp',
    type: 'manhwa',
    status: 'ongoing',
    genres: ['Fantasy', 'Adventure', 'Magic'],
    author: 'TurtleMe',
    releaseYear: 2018,
    rating: 4.5,
    totalChapters: 185,
    views: 750000,
    followers: 280000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  }
];

function SeriesCard({ series, showLastUpdate = false }: { series: Series; showLastUpdate?: boolean }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link href={`/series/${series.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={series.coverImage}
            alt={series.title}
            width={200}
            height={280}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m1P9oj/9k="
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full capitalize">
              {series.type}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`text-xs px-2 py-1 rounded-full ${series.status === 'ongoing' ? 'bg-green-500 text-white' :
                series.status === 'completed' ? 'bg-blue-500 text-white' :
                  series.status === 'hiatus' ? 'bg-yellow-500 text-black' :
                    'bg-red-500 text-white'
              }`}>
              {series.status}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {series.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {series.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{series.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{(series.views / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{series.totalChapters} ch</span>
            </div>
          </div>
          {showLastUpdate && (
            <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Updated 2 hours ago</span>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomePopup />

      {/* Popular Series */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Popular Series</h2>
          </div>
          <Link href="/browse?sort=popular">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockPopularSeries.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </section>

      {/* Recent Updates */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Recent Updates</h2>
          </div>
          <Link href="/browse?sort=updated">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockRecentUpdates.map((series) => (
            <SeriesCard key={series.id} series={series} showLastUpdate />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Manga', href: '/browse?type=manga', color: 'bg-red-500' },
            { name: 'Manhwa', href: '/browse?type=manhwa', color: 'bg-blue-500' },
            { name: 'Manhua', href: '/browse?type=manhua', color: 'bg-green-500' },
            { name: 'Novels', href: '/browse?type=novel', color: 'bg-purple-500' },
          ].map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover interactive-hover">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-muted rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of readers and discover your next favorite series.
          No registration required to start reading!
        </p>
        <Link href="/browse">
          <Button size="lg">
            <BookOpen className="mr-2 h-5 w-5" />
            Explore Library
          </Button>
        </Link>
      </section>
    </div>
  );
}