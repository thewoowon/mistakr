import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
    }),
    {
      name: 'mistakr-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
