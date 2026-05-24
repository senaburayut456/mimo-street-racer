import { create } from 'zustand';
import { Car, Strategy, Rival, RaceResult, Screen } from '@/types/game';

interface GameState {
  // Selection
  selectedCar: Car | null;
  selectedStrategy: Strategy | null;

  // Rival
  rival: Rival | null;
  rivalLoading: boolean;

  // Race
  raceResult: RaceResult | null;
  isRacing: boolean;

  // Actions
  selectCar: (car: Car) => void;
  selectStrategy: (strategy: Strategy) => void;
  setRival: (rival: Rival) => void;
  setRivalLoading: (loading: boolean) => void;
  startRace: () => void;
  endRace: (result: RaceResult) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  selectedCar: null,
  selectedStrategy: null,
  rival: null,
  rivalLoading: false,
  raceResult: null,
  isRacing: false,

  selectCar: (car) => set({ selectedCar: car }),
  selectStrategy: (strategy) => set({ selectedStrategy: strategy }),
  setRival: (rival) => set({ rival }),
  setRivalLoading: (loading) => set({ rivalLoading: loading }),
  startRace: () => set({ isRacing: true }),
  endRace: (result) => set({ raceResult: result, isRacing: false }),
  reset: () =>
    set({
      selectedCar: null,
      selectedStrategy: null,
      rival: null,
      raceResult: null,
      isRacing: false,
    }),
}));
