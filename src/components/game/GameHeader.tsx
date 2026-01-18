import React from 'react';
import { TravelJournal } from '@/components/travel-journal';
import { Map } from 'lucide-react';

/**
 * Header component cho Game Board
 * Hiển thị logo, tên game, và nút Travel Journal
 */
export function GameHeader() {
    return (
        <header className="fixed top-4 left-4 right-4 z-40">
            <div className="max-w-7xl mx-auto glass-card rounded-2xl shadow-glass">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-110 cursor-pointer">
                                <Map className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold font-heading gradient-text">
                                    Hành Trình Chữ S
                                </h1>
                                <p className="text-sm text-muted-foreground font-body">
                                    Khám phá 63 tỉnh thành Việt Nam
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <TravelJournal />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
