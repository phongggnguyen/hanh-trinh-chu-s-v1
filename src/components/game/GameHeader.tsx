import React from 'react';
import { TravelJournal } from '@/components/travel-journal';
import { Map } from 'lucide-react';

/**
 * Header component cho Game Board - Simple version
 */
export function GameHeader() {
    return (
        <header className="fixed top-4 left-4 right-4 z-40">
            <div className="max-w-7xl mx-auto bg-card rounded-xl border border-border shadow-md">
                <div className="px-4 md:px-5 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-xl flex items-center justify-center">
                                <Map className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold font-heading text-primary">
                                    Hành Trình Chữ S
                                </h1>
                                <p className="text-xs text-muted-foreground font-body">
                                    Khám phá 63 tỉnh thành Việt Nam
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <TravelJournal />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
