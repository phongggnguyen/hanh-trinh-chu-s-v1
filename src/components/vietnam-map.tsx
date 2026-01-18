'use client';

import React, { useState } from 'react';
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

// Lightweight overlays for key islands/quan dao
const islandOverlays: IslandOverlay[] = [
  {
    id: 'phu-quoc',
    name: 'Phu Quoc (Kien Giang)',
    provinceId: 'kien-giang',
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
  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        return 'fill-conquered cursor-pointer';
      case 'unlocked':
        return 'fill-unlocked cursor-pointer';
      case 'locked':
        return 'fill-locked/30 cursor-not-allowed';
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      onMouseMove={handleMouseMove}
    >
      {/* Tooltip - Simple version */}
      {hoveredProvince && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePos.x + 16,
            top: mousePos.y - 8,
          }}
        >
          <div className="bg-card rounded-lg px-3 py-2 shadow-lg border border-border">
            <div className="flex items-center gap-2">
              {getProvinceStatus(hoveredProvince.id) === 'conquered' && (
                <Trophy className="w-4 h-4 text-conquered" />
              )}
              {getProvinceStatus(hoveredProvince.id) === 'unlocked' && (
                <MapPin className="w-4 h-4 text-unlocked" />
              )}
              {getProvinceStatus(hoveredProvince.id) === 'locked' && (
                <Lock className="w-4 h-4 text-locked" />
              )}
              <span className="font-heading font-semibold text-foreground text-sm">
                {hoveredProvince.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-body mt-0.5">
              {getProvinceStatus(hoveredProvince.id) === 'conquered' && 'Đã chinh phục ✓'}
              {getProvinceStatus(hoveredProvince.id) === 'unlocked' && 'Nhấn để chơi quiz'}
              {getProvinceStatus(hoveredProvince.id) === 'locked' && 'Chưa mở khóa'}
            </div>
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 1000 1000"
        className="max-w-full max-h-[70vh] w-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Provinces */}
        <g id="features">
          {provinces.map((province) => {
            const status = getProvinceStatus(province.id);
            const isInteractive = status === 'unlocked';
            const isHovered = hoveredProvince?.id === province.id;

            return (
              <path
                key={province.id}
                d={province.path}
                className={cn(
                  'stroke-white stroke-[1.5] transition-colors duration-150',
                  getProvinceClass(status),
                  isHovered && 'brightness-110'
                )}
                onClick={() => handleProvinceClick(province)}
                onKeyDown={(e) => handleKeyDown(e, province, status)}
                onMouseEnter={() => setHoveredProvince(province)}
                onMouseLeave={() => setHoveredProvince(null)}
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
                  'stroke-white stroke-[1.5] transition-colors duration-150',
                  getProvinceClass(status)
                )}
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

      {/* Legend - Simple */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-card rounded-xl p-4 shadow-md border border-border">
        <h3 className="font-semibold mb-3 text-sm font-heading">Chú thích</h3>
        <div className="space-y-2 text-xs font-body">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-conquered flex items-center justify-center">
              <Trophy className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-foreground font-medium">Đã chinh phục</span>
              <span className="text-muted-foreground ml-1">({state.conquered.size})</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-unlocked flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-foreground font-medium">Có thể chơi</span>
              <span className="text-muted-foreground ml-1">({state.unlocked.size})</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-locked/30 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-locked" />
            </div>
            <div>
              <span className="text-foreground font-medium">Đã khóa</span>
              <span className="text-muted-foreground ml-1">({63 - state.conquered.size - state.unlocked.size})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
