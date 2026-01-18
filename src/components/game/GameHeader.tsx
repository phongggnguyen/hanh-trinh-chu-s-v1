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
            <div className="max-w-7xl mx-auto bg-card/90 backdrop-blur-md rounded-xl border-4 border-double border-primary/20 shadow-lg">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 cursor-pointer border-2 border-white/20">
                                <Map className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold font-heading text-primary drop-shadow-sm">
                                    Hành Trình Chữ S
                                </h1>
                                <p className="text-sm text-foreground/80 font-body items-center flex gap-1">
                                    <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
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
