'use client';

import React from 'react';
import { Province } from '@/lib/types';
import { provinces } from '@/lib/provinces';
import { useGame } from '@/contexts/game-context';
import { cn } from '@/lib/utils';

interface VietnamMapProps {
  onProvinceSelect: (province: Province) => void;
}

export function VietnamMap({ onProvinceSelect }: VietnamMapProps) {
  const { state } = useGame();

  const getProvinceStatus = (provinceId: string) => {
    if (state.conquered.has(provinceId)) return 'conquered';
    if (state.unlocked.has(provinceId)) return 'unlocked';
    return 'locked';
  };

  const getProvinceClass = (status: string) => {
    switch (status) {
      case 'conquered':
        return 'fill-green-500 hover:fill-green-600 cursor-pointer';
      case 'unlocked':
        return 'fill-blue-400 hover:fill-blue-500 cursor-pointer';
      case 'locked':
        return 'fill-gray-300 cursor-not-allowed';
      default:
        return 'fill-gray-300';
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
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 1000 1000"
        className="max-w-full max-h-[80vh] w-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="features">
          {provinces.map((province) => {
            const status = getProvinceStatus(province.id);
            const isInteractive = status === 'unlocked';

            return (
              <path
                key={province.id}
                d={province.path}
                className={cn(
                  'stroke-white stroke-[0.5] transition-colors duration-200',
                  getProvinceClass(status)
                )}
                onClick={() => handleProvinceClick(province)}
                onKeyDown={(e) => handleKeyDown(e, province, status)}
                tabIndex={isInteractive ? 0 : -1}
                role={isInteractive ? 'button' : undefined}
                aria-label={`${province.name} - ${
                  status === 'conquered'
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
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-2 text-sm">Chú thích</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Đã chinh phục</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Có thể chơi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span>Đã khóa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
