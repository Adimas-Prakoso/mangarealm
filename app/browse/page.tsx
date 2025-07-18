'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Star, 
  Eye, 
  BookOpen,
  Grid3X3,
  List,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Series } from '@/types';

// Mock data for development
const mockSeries: Series[] = [
  {
    id: '1',
    title: 'One Piece',
    description: 'Follow Monkey D. Luffy and his crew as they search for the ultimate treasure known as One Piece.',
    coverImage: '/logo.webp',
    type: 'manga',
    status: 'ongoing',
    genres: ['Adventure', 'Comedy', 'Drama', 'Shounen'],
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
    genres: ['Action', 'Adventure', 'Mystery', 'Supernatural'],
    author: 'SIU',
    releaseYear: 2010,
    rating: 4.7,
    totalChapters: 595,
    views: 1200000,
    followers: 420000,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastChapterDate: new Date()
  },
  {
    id: '4',
    title: 'Jujutsu Kaisen',
    description: 'A high school student joins a secret organization of Jujutsu Sorcerers.',
    coverImage: '/logo.webp',
    type: 'manga',
    status: 'ongoing',
    genres: ['Action', 'Supernatural', 'School', 'Shounen'],
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
    genres: ['Fantasy', 'Adventure', 'Magic', 'Reincarnation'],
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

const allGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Magic', 'Mystery', 'Reincarnation', 'School', 'Shounen', 'Supernatural'];

function SeriesCard({ series, viewMode }: { series: Series; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 card-hover interactive-hover">
        <Link href={`/series/${series.id}`}>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <div className="relative flex-shrink-0">
                <Image
                  src={series.coverImage}
                  alt={series.title}
                  width={80}
                  height={120}
                  className="rounded object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m1P9oj/9k="
                  sizes="80px"
                />
                <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded capitalize">
                  {series.type}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {series.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {series.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {series.genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="text-xs bg-muted px-2 py-1 rounded">
                      {genre}
                    </span>
                  ))}
                  {series.genres.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{series.genres.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{series.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{(series.views / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{series.totalChapters} ch</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    series.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    series.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    series.status === 'hiatus' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {series.status}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover interactive-hover">
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
            <span className={`text-xs px-2 py-1 rounded-full ${
              series.status === 'ongoing' ? 'bg-green-500 text-white' :
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
        </CardContent>
      </Link>
    </Card>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [minChapters, setMinChapters] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredSeries, setFilteredSeries] = useState<Series[]>(mockSeries);

  useEffect(() => {
    let filtered = [...mockSeries];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(series =>
        series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        series.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        series.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        series.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(series => series.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(series => series.status === selectedStatus);
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(series =>
        selectedGenres.every(genre => series.genres.includes(genre))
      );
    }

    // Minimum chapters filter
    if (minChapters) {
      filtered = filtered.filter(series => series.totalChapters >= parseInt(minChapters));
    }

    // Release year filter
    if (releaseYear) {
      filtered = filtered.filter(series => series.releaseYear >= parseInt(releaseYear));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'chapters':
          return b.totalChapters - a.totalChapters;
        case 'year':
          return b.releaseYear - a.releaseYear;
        default: // popular
          return b.followers - a.followers;
      }
    });

    setFilteredSeries(filtered);
  }, [searchQuery, selectedType, selectedStatus, selectedGenres, sortBy, minChapters, releaseYear]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedGenres([]);
    setSortBy('popular');
    setMinChapters('');
    setReleaseYear('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Library</h1>
        <p className="text-muted-foreground">
          Discover your next favorite series from our vast collection
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, author, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="manga">Manga</option>
                  <option value="manhwa">Manhwa</option>
                  <option value="manhua">Manhua</option>
                  <option value="novel">Novel</option>
                  <option value="comic">Comic</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="hiatus">Hiatus</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="views">Most Viewed</option>
                  <option value="updated">Recently Updated</option>
                  <option value="title">Title A-Z</option>
                  <option value="chapters">Most Chapters</option>
                  <option value="year">Release Year</option>
                </select>
              </div>

              {/* Additional Filters */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Chapters</label>
                  <Input
                    type="number"
                    placeholder="e.g. 50"
                    value={minChapters}
                    onChange={(e) => setMinChapters(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Release Year</label>
                  <Input
                    type="number"
                    placeholder="e.g. 2020"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">Genres</label>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      selectedGenres.includes(genre)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 flex justify-between items-center">
              <Button variant="outline" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredSeries.length} series found
              </span>
            </div>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredSeries.length} series
        </p>
      </div>

      {filteredSeries.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No series found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-4'
        }>
          {filteredSeries.map((series) => (
            <SeriesCard key={series.id} series={series} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}