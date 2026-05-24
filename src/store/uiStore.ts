import { create } from 'zustand';
import { Screen } from '@/types/game';

interface UIState {
  currentScreen: Screen;
  isLoading: boolean;
  error: string | null;

  // Actions
  navigateTo: (screen: Screen) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentScreen: 'start',
  isLoading: false,
  error: null,

  navigateTo: (screen) => set({ currentScreen: screen }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
