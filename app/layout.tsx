import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/layout/BottomNavigation";
import CursorProvider from "@/components/effects/CursorProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: "MangaRealm - Read Manga, Manhwa, Manhua & Novels",
  description: "Your ultimate destination for reading manga, manhwa, manhua, and novels. Discover new stories and follow your favorite series.",
  keywords: "manga, manhwa, manhua, novel, comic, read online, free",
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch untuk external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect untuk critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        
        {/* Viewport meta untuk mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CursorProvider mode="enhanced">
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 pb-16 md:pb-0">
                  {children}
                </main>
                <Footer className="hidden md:block" />
                <BottomNavigation />
              </div>
            </CursorProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
