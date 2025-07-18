'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Star, 
  Eye, 
  BookOpen, 
  Heart,
  Calendar,
  User,
  Palette,
  Play,
  ArrowLeft,
  Share2,
  Download,
  Flag
} from 'lucide-react';
import { Series, Chapter } from '@/types';
import { formatDate } from '@/lib/utils';

// Mock data for development
const mockSeries: Series = {
  id: '1',
  title: 'One Piece',
  description: 'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.',
  coverImage: '/logo.webp',
  type: 'manga',
  status: 'ongoing',
  genres: ['Adventure', 'Comedy', 'Drama', 'Shounen', 'Action'],
  author: 'Eiichiro Oda',
  releaseYear: 1997,
  rating: 4.9,
  totalChapters: 1095,
  views: 2500000,
  followers: 850000,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastChapterDate: new Date()
};

const mockChapters: Chapter[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ch${i + 1}`,
  seriesId: '1',
  title: `Chapter ${i + 1}: ${i === 0 ? 'Romance Dawn' : `Adventure ${i + 1}`}`,
  chapterNumber: i + 1,
  pages: Array.from({ length: 20 }, () => `/logo.webp`),
  releaseDate: new Date(Date.now() - (19 - i) * 24 * 60 * 60 * 1000),
  views: Math.floor(Math.random() * 100000) + 50000,
  createdAt: new Date(),
  updatedAt: new Date()
}));

export default function SeriesDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [series, setSeries] = useState<Series | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    // In a real app, fetch series data from Firebase
    setSeries(mockSeries);
    setChapters(mockChapters);
    setLoading(false);
  }, [params.id]);

  const handleFollow = async () => {
    if (!user) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return;
    }
    
    setIsFollowing(!isFollowing);
    // In a real app, update Firebase
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: series?.title,
          text: series?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-80 h-96 bg-muted rounded"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Series not found</h1>
        <Link href="/browse">
          <Button>Browse Series</Button>
        </Link>
      </div>
    );
  }

  const displayedChapters = showAllChapters ? chapters : chapters.slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/browse" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Link>
      </div>

      {/* Series Info */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Cover Image */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="relative">
            <Image
              src={series.coverImage}
              alt={series.title}
              width={320}
              height={480}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full capitalize">
                {series.type}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className={`text-sm px-3 py-1 rounded-full ${
                series.status === 'ongoing' ? 'bg-green-500 text-white' :
                series.status === 'completed' ? 'bg-blue-500 text-white' :
                series.status === 'hiatus' ? 'bg-yellow-500 text-black' :
                'bg-red-500 text-white'
              }`}>
                {series.status}
              </span>
            </div>
          </div>
        </div>

        {/* Series Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{series.title}</h1>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{series.rating}</span>
              <span className="text-muted-foreground">(4.2k reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <span>{(series.views / 1000000).toFixed(1)}M views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <span>{(series.followers / 1000).toFixed(0)}k followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span>{series.totalChapters} chapters</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Link href={`/read/${series.id}/${chapters[0]?.id}`}>
              <Button size="lg" className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Reading</span>
              </Button>
            </Link>
            {chapters.length > 0 && (
              <Link href={`/read/${series.id}/${chapters[chapters.length - 1]?.id}`}>
                <Button variant="outline" size="lg">
                  Latest Chapter
                </Button>
              </Link>
            )}
            <Button
              variant={isFollowing ? "default" : "outline"}
              size="lg"
              onClick={handleFollow}
              className="flex items-center space-x-2"
            >
              <Heart className={`h-5 w-5 ${isFollowing ? 'fill-current' : ''}`} />
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{series.description}</p>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {series.genres.map((genre) => (
                <Link key={genre} href={`/browse?genre=${genre}`}>
                  <span className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer">
                    {genre}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Author:</span> {series.author}
              </span>
            </div>
            {series.artist && (
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Artist:</span> {series.artist}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Release Year:</span> {series.releaseYear}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Status:</span> {series.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Chapters ({chapters.length})</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayedChapters.map((chapter) => (
              <Link key={chapter.id} href={`/read/${series.id}/${chapter.id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{formatDate(chapter.releaseDate)}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{(chapter.views / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {chapter.pages.length} pages
                    </span>
                    <Button variant="ghost" size="sm">
                      Read
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {chapters.length > 10 && !showAllChapters && (
            <div className="text-center mt-4">
              <Button variant="outline" onClick={() => setShowAllChapters(true)}>
                Show All Chapters ({chapters.length - 10} more)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Button */}
      <div className="mt-8 text-center">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Flag className="h-4 w-4 mr-2" />
          Report an Issue
        </Button>
      </div>
    </div>
  );
}