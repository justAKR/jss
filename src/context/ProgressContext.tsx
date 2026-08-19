import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  getCompletedResources,
  getBookmarks,
  toggleResource as toggleResourceUtil,
  toggleBookmark as toggleBookmarkUtil,
  getStreak,
  type StreakData,
} from '@/lib/progress';

interface ProgressContextValue {
  completed: string[];
  bookmarks: string[];
  streak: StreakData;
  toggleResource: (id: string) => void;
  toggleBookmark: (id: string) => void;
  refresh: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [streak, setStreak] = useState<StreakData>({ count: 0, lastDate: '' });

  const refresh = useCallback(() => {
    setCompleted(getCompletedResources());
    setBookmarks(getBookmarks());
    setStreak(getStreak());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('ece-hub:')) refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refresh]);

  const toggleResource = useCallback(
    (id: string) => {
      toggleResourceUtil(id);
      refresh();
    },
    [refresh]
  );

  const toggleBookmark = useCallback(
    (id: string) => {
      toggleBookmarkUtil(id);
      refresh();
    },
    [refresh]
  );

  const value = useMemo(
    () => ({ completed, bookmarks, streak, toggleResource, toggleBookmark, refresh }),
    [completed, bookmarks, streak, toggleResource, toggleBookmark, refresh]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
