export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'manga' | 'manhwa' | 'manhua' | 'novel' | 'comic';
  status: 'ongoing' | 'completed' | 'hiatus' | 'canceled';
  genres: string[];
  author: string;
  artist?: string;
  releaseYear: number;
  rating: number;
  totalChapters: number;
  totalVolumes?: number;
  views: number;
  followers: number;
  createdAt: Date;
  updatedAt: Date;
  lastChapterDate?: Date;
}

export interface Chapter {
  id: string;
  seriesId: string;
  title: string;
  chapterNumber: number;
  volumeNumber?: number;
  pages: string[];
  releaseDate: Date;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingHistory {
  id: string;
  userId?: string;
  seriesId: string;
  chapterId: string;
  lastReadPage: number;
  readAt: Date;
}

export interface Follow {
  id: string;
  userId: string;
  seriesId: string;
  followedAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

export interface Translation {
  originalText: string;
  translatedText: string;
  language: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  readingDirection: 'ltr' | 'rtl';
  autoTranslate: boolean;
}