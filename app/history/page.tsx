'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  BookOpen, 
  Trash2,
  X
} from 'lucide-react';
import { ReadingHistory, Series } from '@/types';
import { formatDate } from '@/lib/utils';

// Mock data for development
const mockHistory: (ReadingHistory & { series: Series })[] = [
  {
    id: '1',
    userId: 'user1',
    seriesId: '1',
    chapterId: 'ch1',
    lastReadPage: 15,
    readAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
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
      lastChapterDate: new Date()
    }
  },
  {
    id: '2',
    userId: 'user1',
    seriesId: '2',
    chapterId: 'ch2',
    lastReadPage: 8,
    readAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
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
      lastChapterDate: new Date()
    }
  },
  {
    id: '3',
    userId: 'user1',
    seriesId: '3',
    chapterId: 'ch3',
    lastReadPage: 22,
    readAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
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
      lastChapterDate: new Date()
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
  
  return formatDate(date);
}

function HistoryCard({ historyItem, onRemove }: { 
  historyItem: ReadingHistory & { series: Series }; 
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Link href={`/series/${historyItem.series.id}`} className="flex-shrink-0">
            <div className="relative">
              <Image
                src={historyItem.series.coverImage}
                alt={historyItem.series.title}
                width={80}
                height={120}
                className="rounded object-cover"
              />
              <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded capitalize">
                {historyItem.series.type}
              </span>
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link href={`/series/${historyItem.series.id}`}>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {historyItem.series.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {historyItem.series.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{getTimeAgo(historyItem.readAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Page {historyItem.lastReadPage}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {historyItem.series.genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="text-xs bg-muted px-2 py-1 rounded">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Link href={`/read/${historyItem.seriesId}/${historyItem.chapterId}?page=${historyItem.lastReadPage}`}>
                    <Button size="sm">
                      Continue Reading
                    </Button>
                  </Link>
                  <Link href={`/series/${historyItem.series.id}`}>
                    <Button variant="outline" size="sm">
                      View Series
                    </Button>
                  </Link>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(historyItem.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredHistory, setFilteredHistory] = useState(history);

  useEffect(() => {
    let filtered = [...history];

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

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.series.title.localeCompare(b.series.title);
        case 'oldest':
          return new Date(a.readAt).getTime() - new Date(b.readAt).getTime();
        default: // recent
          return new Date(b.readAt).getTime() - new Date(a.readAt).getTime();
      }
    });

    setFilteredHistory(filtered);
  }, [history, searchQuery, filterType, sortBy]);

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Reading History</h1>
        <p className="text-muted-foreground">
          Keep track of your reading progress and continue where you left off
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your reading history..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {history.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {filteredHistory.length} of {history.length} items
            </span>
            <Button variant="outline" onClick={clearAllHistory} className="text-red-600 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All History
            </Button>
          </div>
        )}
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          {history.length === 0 ? (
            <>
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No reading history yet</h3>
              <p className="text-muted-foreground mb-4">
                Start reading some series to see your history here
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
              <Button onClick={() => { setSearchQuery(''); setFilterType('all'); }}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((historyItem) => (
            <HistoryCard
              key={historyItem.id}
              historyItem={historyItem}
              onRemove={removeFromHistory}
            />
          ))}
        </div>
      )}
    </div>
  );
}