'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Heart, 
  Star, 
  BookOpen,
  Bell,
  BellOff,
  Grid3X3,
  List,
  X
} from 'lucide-react';
import { Series, Follow } from '@/types';

// Mock data for development
const mockFollowedSeries: (Follow & { series: Series })[] = [
  {
    id: '1',
    userId: 'user1',
    seriesId: '1',
    followedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    series: {
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
      lastChapterDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '2',
    userId: 'user1',
    seriesId: '2',
    followedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    series: {
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
      lastChapterDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '3',
    userId: 'user1',
    seriesId: '3',
    followedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    series: {
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
      lastChapterDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  }
];

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}

function SeriesCard({ 
  followedSeries, 
  viewMode, 
  onUnfollow, 
  onToggleNotifications 
}: { 
  followedSeries: Follow & { series: Series };
  viewMode: 'grid' | 'list';
  onUnfollow: (id: string) => void;
  onToggleNotifications: (id: string) => void;
}) {
  const [notifications, setNotifications] = useState(true);
  const hasNewChapter = followedSeries.series.lastChapterDate && 
    followedSeries.series.lastChapterDate > followedSeries.followedAt;

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Link href={`/series/${followedSeries.series.id}`} className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={followedSeries.series.coverImage}
                  alt={followedSeries.series.title}
                  width={80}
                  height={120}
                  className="rounded object-cover"
                />
                <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded capitalize">
                  {followedSeries.series.type}
                </span>
                {hasNewChapter && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>
            </Link>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link href={`/series/${followedSeries.series.id}`}>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {followedSeries.series.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {followedSeries.series.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{followedSeries.series.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{followedSeries.series.totalChapters} chapters</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      followedSeries.series.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      followedSeries.series.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      followedSeries.series.status === 'hiatus' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {followedSeries.series.status}
                    </span>
                  </div>

                  {hasNewChapter && (
                    <div className="text-sm text-green-600 mb-2">
                      New chapter available! Updated {getTimeAgo(followedSeries.series.lastChapterDate!)}
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Link href={`/series/${followedSeries.series.id}`}>
                      <Button size="sm">
                        View Series
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setNotifications(!notifications);
                        onToggleNotifications(followedSeries.id);
                      }}
                    >
                      {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUnfollow(followedSeries.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Unfollow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link href={`/series/${followedSeries.series.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={followedSeries.series.coverImage}
            alt={followedSeries.series.title}
            width={200}
            height={280}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full capitalize">
              {followedSeries.series.type}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              followedSeries.series.status === 'ongoing' ? 'bg-green-500 text-white' :
              followedSeries.series.status === 'completed' ? 'bg-blue-500 text-white' :
              followedSeries.series.status === 'hiatus' ? 'bg-yellow-500 text-black' :
              'bg-red-500 text-white'
            }`}>
              {followedSeries.series.status}
            </span>
          </div>
          {hasNewChapter && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                New!
              </span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/series/${followedSeries.series.id}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {followedSeries.series.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{followedSeries.series.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{followedSeries.series.totalChapters}</span>
            </div>
          </div>
        </div>
        {hasNewChapter && (
          <div className="text-xs text-green-600 mb-2">
            Updated {getTimeAgo(followedSeries.series.lastChapterDate!)}
          </div>
        )}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setNotifications(!notifications);
              onToggleNotifications(followedSeries.id);
            }}
            className="flex-1"
          >
            {notifications ? <Bell className="h-3 w-3" /> : <BellOff className="h-3 w-3" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onUnfollow(followedSeries.id);
            }}
            className="text-red-600 hover:text-red-700"
          >
            <Heart className="h-3 w-3 fill-current" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FollowedPage() {
  const { user } = useAuth();
  const [followedSeries, setFollowedSeries] = useState(mockFollowedSeries);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredSeries, setFilteredSeries] = useState(followedSeries);

  useEffect(() => {
    let filtered = [...followedSeries];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.series.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.series.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.series.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.series.title.localeCompare(b.series.title);
        case 'rating':
          return b.series.rating - a.series.rating;
        case 'updated':
          return new Date(b.series.lastChapterDate || 0).getTime() - new Date(a.series.lastChapterDate || 0).getTime();
        case 'oldest':
          return new Date(a.followedAt).getTime() - new Date(b.followedAt).getTime();
        default: // recent
          return new Date(b.followedAt).getTime() - new Date(a.followedAt).getTime();
      }
    });

    setFilteredSeries(filtered);
  }, [followedSeries, searchQuery, filterType, filterStatus, sortBy]);

  const handleUnfollow = (id: string) => {
    setFollowedSeries(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleNotifications = (id: string) => {
    // In a real app, this would update notification preferences in Firebase
    console.log('Toggle notifications for:', id);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your followed series</h1>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const newChaptersCount = followedSeries.filter(item => 
    item.series.lastChapterDate && item.series.lastChapterDate > item.followedAt
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Followed Series</h1>
        <p className="text-muted-foreground">
          Keep track of your favorite series and get notified of new chapters
        </p>
        {newChaptersCount > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              🎉 {newChaptersCount} series have new chapters available!
            </p>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search followed series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="manga">Manga</option>
              <option value="manhwa">Manhwa</option>
              <option value="manhua">Manhua</option>
              <option value="novel">Novel</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="hiatus">Hiatus</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="recent">Recently Followed</option>
              <option value="oldest">Oldest Followed</option>
              <option value="title">Title A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="updated">Recently Updated</option>
            </select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {filteredSeries.length} of {followedSeries.length} series
          </span>
          {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => { 
                setSearchQuery(''); 
                setFilterType('all'); 
                setFilterStatus('all'); 
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Series List */}
      {filteredSeries.length === 0 ? (
        <div className="text-center py-12">
          {followedSeries.length === 0 ? (
            <>
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No followed series yet</h3>
              <p className="text-muted-foreground mb-4">
                Start following some series to see them here
              </p>
              <Link href="/browse">
                <Button>Browse Series</Button>
              </Link>
            </>
          ) : (
            <>
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
            </>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-4'
        }>
          {filteredSeries.map((followedSeries) => (
            <SeriesCard
              key={followedSeries.id}
              followedSeries={followedSeries}
              viewMode={viewMode}
              onUnfollow={handleUnfollow}
              onToggleNotifications={handleToggleNotifications}
            />
          ))}
        </div>
      )}
    </div>
  );
}