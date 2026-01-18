'use client';

import React from 'react';

// Dong Son Pattern - Inspired by Vietnamese bronze drums
export const DongSonPattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="dongson" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Simplified Dong Son Motif inspired concentric circles and geometric birds */}
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.8" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.4" />
                <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <path d="M22 22 L28 28 M72 72 L78 78 M22 78 L28 72 M72 28 L78 22" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                {/* Stylized bird motif */}
                <path d="M50 50 Q55 45 60 48 Q55 50 50 50" fill="currentColor" opacity="0.3" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dongson)" />
    </svg>
);

// Lotus Pattern - Vietnam's national flower
export const LotusPattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="lotus" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Stylized lotus flower */}
                <g opacity="0.6">
                    <path d="M40 15 C40 15 50 25 50 35 C50 45 40 55 40 55 C40 55 30 45 30 35 C30 25 40 15 40 15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M40 55 C40 55 55 50 60 35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M40 55 C40 55 25 50 20 35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    {/* Lotus leaves */}
                    <ellipse cx="40" cy="62" rx="12" ry="4" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
                </g>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lotus)" />
    </svg>
);

// Wave Pattern - Inspired by Vietnamese sea
export const WavePattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="waves" x="0" y="0" width="120" height="50" patternUnits="userSpaceOnUse">
                <path
                    d="M0 25 Q15 10 30 25 Q45 40 60 25 Q75 10 90 25 Q105 40 120 25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.3"
                />
                <path
                    d="M0 35 Q15 20 30 35 Q45 50 60 35 Q75 20 90 35 Q105 50 120 35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    opacity="0.2"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
    </svg>
);

// Mountain Pattern - Vietnamese landscape
export const MountainPattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="mountains" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                {/* Layered mountains */}
                <path
                    d="M0 100 L50 40 L100 100 Z"
                    fill="currentColor"
                    opacity="0.05"
                />
                <path
                    d="M50 100 L100 50 L150 100 Z"
                    fill="currentColor"
                    opacity="0.08"
                />
                <path
                    d="M100 100 L150 30 L200 100 Z"
                    fill="currentColor"
                    opacity="0.05"
                />
                {/* Mountain outline */}
                <path
                    d="M0 100 L50 40 L100 100 M50 100 L100 50 L150 100 M100 100 L150 30 L200 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.2"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mountains)" />
    </svg>
);

// Texture Overlay - Noise effect for authenticity
export const TextureOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-30 mix-blend-multiply">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);

// Floating Particles - For premium feel
export const FloatingParticles = ({ count = 20 }: { count?: number }) => {
    const particles = React.useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            size: Math.random() * 6 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
        }));
    }, [count]);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full animate-float-slow"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

// Gradient Mesh Background
export const GradientMesh = ({ className = "" }: { className?: string }) => (
    <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
        {/* Primary blob */}
        <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow opacity-20"
            style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)',
                top: '10%',
                left: '5%',
            }}
        />
        {/* Secondary blob */}
        <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] animate-float opacity-25"
            style={{
                background: 'radial-gradient(circle, hsl(var(--secondary) / 0.5) 0%, transparent 70%)',
                bottom: '10%',
                right: '5%',
                animationDelay: '2s',
            }}
        />
        {/* Accent blob */}
        <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[80px] animate-float-slow opacity-15"
            style={{
                background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
                top: '50%',
                left: '40%',
                transform: 'translate(-50%, -50%)',
                animationDelay: '4s',
            }}
        />
    </div>
);

// Decorative Corner Elements
export const DecorativeCorners = () => (
    <>
        {/* Top Left */}
        <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-0 opacity-20">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" className="text-primary" />
                <path d="M15 0 L15 25 L40 25 L40 30 L10 30 L10 0 Z" fill="currentColor" className="text-primary/50" />
            </svg>
        </div>
        {/* Top Right */}
        <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-0 opacity-20 rotate-90">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" className="text-primary" />
                <path d="M15 0 L15 25 L40 25 L40 30 L10 30 L10 0 Z" fill="currentColor" className="text-primary/50" />
            </svg>
        </div>
        {/* Bottom Left */}
        <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-0 opacity-20 -rotate-90">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" className="text-primary" />
                <path d="M15 0 L15 25 L40 25 L40 30 L10 30 L10 0 Z" fill="currentColor" className="text-primary/50" />
            </svg>
        </div>
        {/* Bottom Right */}
        <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-0 opacity-20 rotate-180">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" className="text-primary" />
                <path d="M15 0 L15 25 L40 25 L40 30 L10 30 L10 0 Z" fill="currentColor" className="text-primary/50" />
            </svg>
        </div>
    </>
);

// Star decoration for celebrations
export const StarBurst = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 5 L55 40 L95 50 L55 60 L50 95 L45 60 L5 50 L45 40 Z" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
    </svg>
);

// Vietnamese flag inspired decoration
export const VietnamStar = ({ className = "", animated = false }: { className?: string; animated?: boolean }) => (
    <svg
        viewBox="0 0 100 100"
        className={`${className} ${animated ? 'animate-sparkle-rotate' : ''}`}
        fill="currentColor"
    >
        <path d="M50 10 L61 40 L95 40 L68 58 L79 90 L50 72 L21 90 L32 58 L5 40 L39 40 Z" />
    </svg>
);
