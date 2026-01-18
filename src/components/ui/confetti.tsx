'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ConfettiProps {
    active: boolean;
    duration?: number;
    particleCount?: number;
    colors?: string[];
}

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
}

export function Confetti({
    active,
    duration = 3000,
    particleCount = 50,
    colors = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'],
}: ConfettiProps) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const prevActiveRef = useRef(active);

    useEffect(() => {
        // Only trigger when active changes from false to true
        if (active && !prevActiveRef.current) {
            // Generate particles
            const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
                id: Date.now() + i, // Use timestamp for unique IDs
                x: Math.random() * 100, // percentage
                y: -10,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                speedX: (Math.random() - 0.5) * 2,
                speedY: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
            }));

            setParticles(newParticles);

            // Clear after duration
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                setParticles([]);
            }, duration);
        } else if (!active && prevActiveRef.current) {
            // Reset when active becomes false
            setParticles([]);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        }

        prevActiveRef.current = active;

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [active]); // Only depend on 'active' to prevent infinite loops

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute animate-[confetti-fall_3s_ease-out_forwards]"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg)`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0',
                        animationDelay: `${Math.random() * 0.3}s`,
                    }}
                />
            ))}
        </div>
    );
}
