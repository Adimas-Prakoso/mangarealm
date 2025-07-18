'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  velocityX: number;
  velocityY: number;
}

interface Ripple {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxSize: number;
}

const SPARKLE_COLORS = [
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#00BFFF', // Deep Sky Blue
  '#FF6347', // Tomato
  '#98FB98', // Pale Green
  '#DDA0DD', // Plum
  '#F0E68C', // Khaki
  '#87CEEB', // Sky Blue
];

export default function CursorEffects() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  // Create sparkle
  const createSparkle = useCallback((x: number, y: number) => {
    const sparkle: Sparkle = {
      id: `sparkle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 4 + 2,
      opacity: 1,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      life: 0,
      maxLife: 60 + Math.random() * 40,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2 - 1,
    };
    return sparkle;
  }, []);

  // Create ripple
  const createRipple = useCallback((x: number, y: number) => {
    const ripple: Ripple = {
      id: `ripple-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x,
      y,
      size: 0,
      opacity: 0.6,
      maxSize: 50 + Math.random() * 30,
    };
    return ripple;
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });
    setIsMoving(true);

    // Create sparkles occasionally while moving
    if (Math.random() < 0.3) {
      setSparkles(prev => [...prev, createSparkle(x, y)]);
    }

    // Clear moving state after a delay
    setTimeout(() => setIsMoving(false), 100);
  }, [createSparkle]);

  // Click handler
  const handleClick = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    // Create multiple sparkles on click
    const newSparkles = Array.from({ length: 5 }, () => createSparkle(x, y));
    setSparkles(prev => [...prev, ...newSparkles]);

    // Create ripple effect
    setRipples(prev => [...prev, createRipple(x, y)]);
  }, [createSparkle, createRipple]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Update sparkles
      setSparkles(prev => prev
        .map(sparkle => ({
          ...sparkle,
          x: sparkle.x + sparkle.velocityX,
          y: sparkle.y + sparkle.velocityY,
          life: sparkle.life + 1,
          opacity: Math.max(0, 1 - (sparkle.life / sparkle.maxLife)),
          velocityY: sparkle.velocityY + 0.1, // Gravity
        }))
        .filter(sparkle => sparkle.life < sparkle.maxLife)
      );

      // Update ripples
      setRipples(prev => prev
        .map(ripple => ({
          ...ripple,
          size: Math.min(ripple.size + 2, ripple.maxSize),
          opacity: Math.max(0, ripple.opacity - 0.02),
        }))
        .filter(ripple => ripple.opacity > 0)
      );
    };

    const intervalId = setInterval(animate, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, []);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: sparkle.x - sparkle.size / 2,
            top: sparkle.y - sparkle.size / 2,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            opacity: sparkle.opacity,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            transform: `scale(${sparkle.opacity})`,
          }}
        />
      ))}

      {/* Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full border-2"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderColor: `rgba(59, 130, 246, ${ripple.opacity})`,
            opacity: ripple.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Custom cursor dot */}
      <div
        className="absolute w-2 h-2 bg-blue-500 rounded-full transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          transform: isMoving ? 'scale(1.5)' : 'scale(1)',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
        }}
      />
    </div>
  );
}