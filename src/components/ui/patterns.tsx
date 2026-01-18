import React from 'react';

export const DongSonPattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="dongson" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Simplified Dong Son Motif inspired concentric circles and geometric birds */}
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
                <path d="M22 22 L28 28 M72 72 L78 78 M22 78 L28 72 M72 28 L78 22" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dongson)" />
    </svg>
);

export const LotusPattern = ({ className = "opacity-10" }: { className?: string }) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="lotus" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Stylized minimal lotus flower */}
                <path d="M30 10 C30 10 40 20 40 30 C40 40 30 50 30 50 C30 50 20 40 20 30 C20 20 30 10 30 10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M30 50 C30 50 45 45 50 30 M30 50 C30 50 15 45 10 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lotus)" />
    </svg>
);

export const TextureOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-multiply">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);
