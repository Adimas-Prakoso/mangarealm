'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  EyeOff,
  Maximize,
  Minimize
} from 'lucide-react';
import { Series, Chapter } from '@/types';
import { translateText, supportedLanguages } from '@/lib/translation';

// Mock data
const mockSeries: Series = {
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
};

const mockChapter: Chapter = {
  id: 'ch1',
  seriesId: '1',
  title: 'Chapter 1: Romance Dawn',
  chapterNumber: 1,
  pages: Array.from({ length: 20 }, () => '/logo.webp'),
  releaseDate: new Date(),
  views: 150000,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockChapters: Chapter[] = Array.from({ length: 5 }, (_, i) => ({
  id: `ch${i + 1}`,
  seriesId: '1',
  title: `Chapter ${i + 1}: Adventure ${i + 1}`,
  chapterNumber: i + 1,
  pages: Array.from({ length: 20 }, () => '/logo.webp'),
  releaseDate: new Date(),
  views: Math.floor(Math.random() * 100000) + 50000,
  createdAt: new Date(),
  updatedAt: new Date()
}));

export default function ReadingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [series, setSeries] = useState<Series | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('original');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize data
    setSeries(mockSeries);
    setChapter(mockChapter);
    setChapters(mockChapters);
    
    // Get initial page from URL
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
    
    setLoading(false);
  }, [params.seriesId, params.chapterId, searchParams]);

  useEffect(() => {
    // Update URL when page changes
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    window.history.replaceState({}, '', url.toString());
  }, [currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (chapter && currentPage < chapter.pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }, [chapter, currentPage]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
      goToPreviousPage();
    } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
      goToNextPage();
    } else if (event.key === 'f' || event.key === 'F') {
      toggleFullscreen();
    } else if (event.key === 'h' || event.key === 'H') {
      setShowControls(!showControls);
    }
  }, [goToPreviousPage, goToNextPage, toggleFullscreen, showControls]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const goToPreviousChapter = () => {
    const currentIndex = chapters.findIndex(ch => ch.id === chapter?.id);
    if (currentIndex > 0) {
      const prevChapter = chapters[currentIndex - 1];
      window.location.href = `/read/${params.seriesId}/${prevChapter.id}`;
    }
  };

  const goToNextChapter = () => {
    const currentIndex = chapters.findIndex(ch => ch.id === chapter?.id);
    if (currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1];
      window.location.href = `/read/${params.seriesId}/${nextChapter.id}`;
    }
  };

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    
    if (language !== 'original' && chapter) {
      // In a real app, you would translate text overlays on images
      // For now, we'll just simulate translation
      const sampleTexts = ['Hello', 'Adventure begins', 'To be continued...'];
      const translated: Record<string, string> = {};
      
      for (const text of sampleTexts) {
        try {
          translated[text] = await translateText({ text, to: language });
        } catch (error) {
          console.error('Translation failed:', error);
          translated[text] = text;
        }
      }
      
      setTranslatedTexts(translated);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!series || !chapter) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Chapter not found</h1>
          <Link href="/browse">
            <Button>Browse Series</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = chapters.findIndex(ch => ch.id === chapter.id);
  const hasPreviousChapter = currentIndex > 0;
  const hasNextChapter = currentIndex < chapters.length - 1;

  return (
    <div className="min-h-screen bg-black text-white reading-container">
      {/* Header Controls */}
      {showControls && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href={`/series/${series.id}`}>
                  <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Series
                  </Button>
                </Link>
                <div className="text-sm">
                  <h1 className="font-semibold">{series.title}</h1>
                  <p className="text-gray-400">{chapter.title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm"
                >
                  <option value="original">Original</option>
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300"
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowControls(false)}
                  className="text-white hover:text-gray-300"
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Controls Button (when hidden) */}
      {!showControls && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowControls(true)}
          className="fixed top-4 right-4 z-50 text-white hover:text-gray-300 bg-black/50"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {/* Main Reading Area */}
      <div className="flex items-center justify-center min-h-screen pt-16 pb-20">
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="lg"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={goToNextPage}
            disabled={currentPage === chapter.pages.length}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Page Image */}
          <div className="relative">
            <Image
              src={chapter.pages[currentPage - 1]}
              alt={`Page ${currentPage}`}
              width={800}
              height={1200}
              className="max-w-full h-auto mx-auto"
              priority
            />
            
            {/* Translation Overlays (if enabled) */}
            {selectedLanguage !== 'original' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Sample translation overlays - in a real app, these would be positioned based on text detection */}
                <div className="absolute top-10 left-10 bg-white/90 text-black px-2 py-1 rounded text-sm">
                  {translatedTexts['Hello'] || 'Hello'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      {showControls && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Chapter Navigation */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousChapter}
                  disabled={!hasPreviousChapter}
                  className="text-white border-gray-600 hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Prev Chapter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextChapter}
                  disabled={!hasNextChapter}
                  className="text-white border-gray-600 hover:bg-gray-800"
                >
                  Next Chapter
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Page Counter */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {chapter.pages.length}
                </span>
                
                {/* Page Slider */}
                <input
                  type="range"
                  min="1"
                  max={chapter.pages.length}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                  className="w-32 accent-blue-500"
                />
              </div>

              {/* Chapter Selector */}
              <select
                value={chapter.id}
                onChange={(e) => window.location.href = `/read/${params.seriesId}/${e.target.value}`}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-500">
        <div>← → : Navigate pages</div>
        <div>F: Fullscreen</div>
        <div>H: Toggle controls</div>
      </div>
    </div>
  );
}