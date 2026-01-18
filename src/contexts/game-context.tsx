'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction, ProvinceId, JournalEntry } from '@/lib/types';
import { DEFAULT_UNLOCKED_PROVINCES } from '@/lib/provinces';
import { CACHE_CONFIG } from '@/lib/constants';

// Extend GameState with journal entries
interface ExtendedGameState extends GameState {
  journal: JournalEntry[];
}

// Game Context Type
interface GameContextType {
  state: ExtendedGameState;
  dispatch: React.Dispatch<GameAction>;
  conquerProvince: (
    provinceId: ProvinceId,
    provinceName: string,
    neighbors: ProvinceId[],
    score: number
  ) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Local storage key
const STORAGE_KEY = CACHE_CONFIG.STORAGE_KEY;

// Initial state
const getInitialState = (): ExtendedGameState => {
  // Try to load from localStorage (client-side only)
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          unlocked: new Set(parsed.unlocked || DEFAULT_UNLOCKED_PROVINCES),
          conquered: new Set(parsed.conquered || []),
          journal: parsed.journal || [],
        };
      }
    } catch (error) {
      console.error('Failed to load game state from localStorage:', error);
    }
  }

  // Default state
  return {
    unlocked: new Set(DEFAULT_UNLOCKED_PROVINCES),
    conquered: new Set(),
    journal: [],
  };
};

// Reducer function
function gameReducer(
  state: ExtendedGameState,
  action: GameAction
): ExtendedGameState {
  switch (action.type) {
    case 'CONQUER_PROVINCE': {
      const { provinceId, neighbors, journalEntry } = action.payload;

      // Add province to conquered set
      const newConquered = new Set(state.conquered);
      newConquered.add(provinceId);

      // Unlock all neighbors that aren't already conquered
      const newUnlocked = new Set(state.unlocked);
      neighbors.forEach((neighborId) => {
        if (!newConquered.has(neighborId)) {
          newUnlocked.add(neighborId);
        }
      });

      // Add to journal
      const newJournal = [...state.journal, journalEntry];

      return {
        ...state,
        unlocked: newUnlocked,
        conquered: newConquered,
        journal: newJournal,
      };
    }

    case 'LOAD_STATE': {
      const { unlocked, conquered } = action.payload;
      return {
        ...state,
        unlocked: new Set(unlocked),
        conquered: new Set(conquered),
      };
    }

    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const toSave = {
          unlocked: Array.from(state.unlocked),
          conquered: Array.from(state.conquered),
          journal: state.journal,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (error) {
        console.error('Failed to save game state to localStorage:', error);
      }
    }
  }, [state]);

  // Helper function to conquer a province
  const conquerProvince = (
    provinceId: ProvinceId,
    provinceName: string,
    neighbors: ProvinceId[],
    score: number
  ) => {
    // Create journal entry
    const journalEntry: JournalEntry = {
      provinceId,
      provinceName,
      conqueredAt: Date.now(),
      score,
    };

    // Dispatch CONQUER_PROVINCE with journal entry
    dispatch({
      type: 'CONQUER_PROVINCE',
      payload: { provinceId, neighbors, journalEntry },
    });
  };

  const contextValue: GameContextType = {
    state,
    dispatch,
    conquerProvince,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

// Hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// Export for testing
export { GameContext };
