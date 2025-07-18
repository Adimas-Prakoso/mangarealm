'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import cursor effects untuk mengurangi initial bundle
const CursorEffects = dynamic(() => import('./CursorEffects'), {
  ssr: false,
  loading: () => null
});

const EnhancedCursor = dynamic(() => import('./EnhancedCursor'), {
  ssr: false,
  loading: () => null
});

interface CursorProviderProps {
  children: React.ReactNode;
  mode?: 'simple' | 'enhanced' | 'auto';
}

export default function CursorProvider({ children, mode = 'auto' }: CursorProviderProps) {
  const [cursorMode, setCursorMode] = useState<'simple' | 'enhanced'>('enhanced');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    window.addEventListener('resize', checkMobile);

    // Auto mode logic
    if (mode === 'auto') {
      // Use enhanced cursor on desktop, simple on mobile
      setCursorMode(mobile ? 'simple' : 'enhanced');
    } else {
      setCursorMode(mode === 'enhanced' ? 'enhanced' : 'simple');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [mode]);

  // Don't render cursor effects on mobile devices
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="cursor-none">
      {children}
      {cursorMode === 'enhanced' ? <EnhancedCursor /> : <CursorEffects />}
      
      {/* Global styles to hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Exception for input fields and text areas */
        input, textarea, [contenteditable="true"] {
          cursor: text !important;
        }
        
        /* Exception for disabled elements */
        [disabled], .disabled {
          cursor: not-allowed !important;
        }
        
        /* Exception for resize handles */
        .resize-handle {
          cursor: resize !important;
        }
        
        /* Smooth transitions for interactive elements */
        button, a, [role="button"] {
          transition: transform 0.2s ease;
        }
        
        button:hover, a:hover, [role="button"]:hover {
          transform: scale(1.05);
        }
        
        /* Special cursor for reading mode */
        .reading-container * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}