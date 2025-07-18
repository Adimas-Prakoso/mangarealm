'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  velocityX: number;
  velocityY: number;
  type: 'sparkle' | 'star' | 'heart' | 'circle';
}

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const PARTICLE_TYPES = ['sparkle', 'star', 'heart', 'circle'] as const;

export default function EnhancedCursor() {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [cursorMode, setCursorMode] = useState<'normal' | 'reading' | 'interactive'>('normal');

  // Create particle
  const createParticle = useCallback((x: number, y: number, type?: string) => {
    const colors = theme === 'dark' 
      ? ['#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#FBBF24', '#FB7185']
      : ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
      
    const particleType = type || PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
    const particle: Particle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: Math.random() * 6 + 3,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 80 + Math.random() * 60,
      velocityX: (Math.random() - 0.5) * 3,
      velocityY: (Math.random() - 0.5) * 3 - 1.5,
      type: particleType as Particle['type'],
    };
    return particle;
  }, [theme]);

  // Create trail
  const createTrail = useCallback((x: number, y: number) => {
    const trail: Trail = {
      id: Date.now() + Math.random(),
      x,
      y,
      opacity: 0.8,
      size: 8,
    };
    return trail;
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });

    // Create trail
    if (Math.random() < 0.7) {
      setTrails(prev => [...prev, createTrail(x, y)]);
    }

    // Create particles based on mode
    const particleChance = cursorMode === 'reading' ? 0.1 : cursorMode === 'interactive' ? 0.4 : 0.2;
    if (Math.random() < particleChance) {
      setParticles(prev => [...prev, createParticle(x, y)]);
    }

    // Detect cursor mode based on element
    const element = document.elementFromPoint(x, y);
    if (element) {
      if (element.closest('.reading-container')) {
        setCursorMode('reading');
      } else if (element.closest('button, a, [role="button"]')) {
        setCursorMode('interactive');
      } else {
        setCursorMode('normal');
      }
    }
  }, [createTrail, createParticle, cursorMode]);

  // Mouse down/up handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsClicking(true);
    const x = e.clientX;
    const y = e.clientY;

    // Create burst of particles on click
    const burstCount = cursorMode === 'interactive' ? 8 : 5;
    const newParticles = Array.from({ length: burstCount }, () => 
      createParticle(x, y, cursorMode === 'reading' ? 'star' : undefined)
    );
    setParticles(prev => [...prev, ...newParticles]);
  }, [createParticle, cursorMode]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Update particles
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          life: particle.life + 1,
          opacity: Math.max(0, 1 - (particle.life / particle.maxLife)),
          velocityY: particle.velocityY + 0.08, // Gravity
          velocityX: particle.velocityX * 0.99, // Air resistance
        }))
        .filter(particle => particle.life < particle.maxLife)
      );

      // Update trails
      setTrails(prev => prev
        .map(trail => ({
          ...trail,
          opacity: Math.max(0, trail.opacity - 0.05),
          size: Math.max(0, trail.size - 0.2),
        }))
        .filter(trail => trail.opacity > 0)
      );
    };

    const intervalId = setInterval(animate, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, []);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Render particle based on type
  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      left: particle.x - particle.size / 2,
      top: particle.y - particle.size / 2,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
      color: particle.color,
      transform: `scale(${particle.opacity}) rotate(${particle.life * 10}deg)`,
    };

    switch (particle.type) {
      case 'star':
        return (
          <div
            key={particle.id}
            className="absolute"
            style={baseStyle}
          >
            ⭐
          </div>
        );
      case 'heart':
        return (
          <div
            key={particle.id}
            className="absolute"
            style={baseStyle}
          >
            💖
          </div>
        );
      case 'sparkle':
        return (
          <div
            key={particle.id}
            className="absolute"
            style={baseStyle}
          >
            ✨
          </div>
        );
      default:
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              ...baseStyle,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Trails */}
      {trails.map(trail => (
        <div
          key={trail.id}
          className="absolute rounded-full"
          style={{
            left: trail.x - trail.size / 2,
            top: trail.y - trail.size / 2,
            width: trail.size,
            height: trail.size,
            backgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.3)',
            opacity: trail.opacity,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map(renderParticle)}

      {/* Custom cursor */}
      <div
        className={`absolute transition-all duration-200 ease-out ${
          cursorMode === 'interactive' ? 'scale-150' : cursorMode === 'reading' ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          width: 16,
          height: 16,
        }}
      >
        {/* Main cursor dot */}
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isClicking ? 'scale-75' : 'scale-100'
          }`}
          style={{
            backgroundColor: cursorMode === 'interactive' ? '#10B981' : cursorMode === 'reading' ? '#F59E0B' : '#3B82F6',
            boxShadow: `0 0 20px ${cursorMode === 'interactive' ? '#10B981' : cursorMode === 'reading' ? '#F59E0B' : '#3B82F6'}`,
          }}
        />
        
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 animate-ping"
          style={{
            borderColor: cursorMode === 'interactive' ? '#10B981' : cursorMode === 'reading' ? '#F59E0B' : '#3B82F6',
            opacity: isClicking ? 0.8 : 0.3,
          }}
        />
      </div>

      {/* Mode indicator */}
      {cursorMode !== 'normal' && (
        <div
          className="absolute text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 10,
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            color: theme === 'dark' ? 'white' : 'black',
          }}
        >
          {cursorMode === 'interactive' ? '🎯 Interactive' : '📖 Reading'}
        </div>
      )}
    </div>
  );
}