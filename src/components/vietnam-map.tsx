'use client';

import React from 'react';
import { Province } from '@/lib/types';
import { provinces } from '@/lib/provinces';
import { useGame } from '@/contexts/game-context';
import { cn } from '@/lib/utils';
import { Trophy, MapPin, Lock } from 'lucide-react';

type IslandOverlay = {
  id: string;
  name: string;
  provinceId: Province['id'];
  path: string;
};

// Lightweight overlays for key islands/quan dao (scaled to current 0 0 1000 1000 viewBox)
const islandOverlays: IslandOverlay[] = [
  {
    id: 'phu-quoc',
    name: 'Phu Quoc (Kien Giang)',
    provinceId: 'kien-giang',
    // Derived from vn2.svg (scaled to current viewBox)
    path: 'M 405.55 852.31 C 402.76 850.10 399.39 849.75 401.60 847.66 C 403.81 845.56 404.51 847.77 406.37 845.45 C 408.23 843.12 410.90 839.75 410.90 839.75 C 410.90 839.75 416.72 841.84 416.84 848.47 C 416.95 855.10 414.16 857.08 414.51 862.20 C 414.86 867.32 414.51 870.11 414.51 870.46 C 414.51 870.81 409.74 868.48 409.74 863.25 C 409.74 858.01 405.55 852.31 405.55 852.31',
  },
  {
    id: 'con-dao',
    name: 'Con Dao (Ba Ria - Vung Tau)',
    provinceId: 'ba-ria-vung-tau',
    path: 'M650 860a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0',
  },
  {
    id: 'ly-son',
    name: 'Ly Son (Quang Ngai)',
    provinceId: 'quang-ngai',
    path: 'M730 545a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0',
  },
  {
    id: 'hoang-sa',
    name: 'Quan dao Hoang Sa (Da Nang)',
    provinceId: 'da-nang',
    path: 'M820 470a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0 M838 485a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0 -7.6 0 M810 500a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0',
  },
  {
    id: 'truong-sa',
    name: 'Quan dao Truong Sa (Khanh Hoa)',
    provinceId: 'khanh-hoa',
    path: 'M860 760a4.8 4.8 0 1 0 9.6 0a4.8 4.8 0 1 0 -9.6 0 M880 785a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M845 800a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0',
  },
];

interface VietnamMapProps {
  onProvinceSelect: (province: Province) => void;
}

export function VietnamMap({ onProvinceSelect }: VietnamMapProps) {
  const { state } = useGame();
  const provincesById = React.useMemo(() => {
    const map = new Map<string, Province>();
    provinces.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const getProvinceStatus = (provinceId: string) => {
    if (state.conquered.has(provinceId)) return 'conquered';
    if (state.unlocked.has(provinceId)) return 'unlocked';
    return 'locked';
  };

  const getProvinceClass = (status: string) => {
    switch (status) {
      case 'conquered':
        return 'fill-conquered hover:brightness-110 cursor-pointer drop-shadow-md';
      case 'unlocked':
        return 'fill-unlocked hover:brightness-110 cursor-pointer drop-shadow-lg animate-pulse-glow';
      case 'locked':
        return 'fill-locked/40 cursor-not-allowed';
      default:
        return 'fill-locked';
    }
  };

  const handleProvinceClick = (province: Province) => {
    const status = getProvinceStatus(province.id);
    if (status === 'unlocked') {
      onProvinceSelect(province);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    province: Province,
    status: string
  ) => {
    if ((e.key === 'Enter' || e.key === ' ') && status === 'unlocked') {
      e.preventDefault();
      onProvinceSelect(province);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <svg
        viewBox="0 0 1000 1000"
        className="max-w-full max-h-[70vh] w-auto h-auto drop-shadow-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Provinces */}
        <g id="features">
          {provinces.map((province) => {
            const status = getProvinceStatus(province.id);
            const isInteractive = status === 'unlocked';

            return (
              <path
                key={province.id}
                d={province.path}
                className={cn(
                  'stroke-white stroke-[1.5] transition-all duration-300',
                  getProvinceClass(status),
                  isInteractive && 'hover:scale-105 transform-origin-center'
                )}
                style={{
                  filter: status === 'unlocked' ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : undefined,
                }}
                onClick={() => handleProvinceClick(province)}
                onKeyDown={(e) => handleKeyDown(e, province, status)}
                tabIndex={isInteractive ? 0 : -1}
                role={isInteractive ? 'button' : undefined}
                aria-label={`${province.name} - ${status === 'conquered'
                    ? 'đã chinh phục'
                    : status === 'unlocked'
                      ? 'có thể chơi'
                      : 'đã khóa'
                  }`}
              >
                <title>{province.name}</title>
              </path>
            );
          })}
        </g>

        {/* Islands */}
        <g id="islands">
          {islandOverlays.map((island) => {
            const province = provincesById.get(island.provinceId);
            if (!province) return null;
            const status = getProvinceStatus(island.provinceId);
            const isInteractive = status === 'unlocked';

            return (
              <path
                key={island.id}
                d={island.path}
                className={cn(
                  'stroke-white stroke-[1.5] transition-all duration-300',
                  getProvinceClass(status),
                  isInteractive && 'hover:scale-105 transform-origin-center'
                )}
                style={{
                  filter: status === 'unlocked' ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : undefined,
                }}
                onClick={() => handleProvinceClick(province)}
                onKeyDown={(e) => handleKeyDown(e, province, status)}
                tabIndex={isInteractive ? 0 : -1}
                role={isInteractive ? 'button' : undefined}
                aria-label={`${island.name} - ${status === 'conquered'
                    ? 'Đã chinh phục'
                    : status === 'unlocked'
                      ? 'Có thể chơi'
                      : 'Đang khóa'
                  }`}
              >
                <title>{island.name}</title>
              </path>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 glass-card rounded-xl p-4 shadow-glass border border-white/20 animate-slide-in-up">
        <h3 className="font-semibold mb-3 text-sm font-heading">Chú thích</h3>
        <div className="space-y-2 text-xs font-body">
          <div className="flex items-center gap-3 group cursor-pointer hover-lift">
            <div className="flex-shrink-0">
              <Trophy className="w-5 h-5 text-conquered" />
            </div>
            <span className="text-foreground/80">Đã chinh phục</span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer hover-lift">
            <div className="flex-shrink-0">
              <MapPin className="w-5 h-5 text-unlocked" />
            </div>
            <span className="text-foreground/80">Có thể chơi</span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer hover-lift">
            <div className="flex-shrink-0">
              <Lock className="w-5 h-5 text-locked" />
            </div>
            <span className="text-foreground/80">Đã khóa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

