import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookmarksState {
  bookmarkedCaseIds: string[];

  // Actions
  toggleBookmark: (caseId: string) => void;
  isBookmarked: (caseId: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarkedCaseIds: [],

      toggleBookmark: (caseId) => {
        const { bookmarkedCaseIds } = get();
        const isCurrentlyBookmarked = bookmarkedCaseIds.includes(caseId);

        if (isCurrentlyBookmarked) {
          set({
            bookmarkedCaseIds: bookmarkedCaseIds.filter((id) => id !== caseId),
          });
        } else {
          set({
            bookmarkedCaseIds: [...bookmarkedCaseIds, caseId],
          });
        }
      },

      isBookmarked: (caseId) => {
        return get().bookmarkedCaseIds.includes(caseId);
      },

      clearBookmarks: () => {
        set({ bookmarkedCaseIds: [] });
      },
    }),
    {
      name: 'mistakr-bookmarks',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
