import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Site } from '@/types';
import { DEFAULT_SITE_ID, sites, sitesById } from '@/data/sites';

interface SiteContextValue {
  sites: Site[];
  selectedSite: Site;
  selectSite: (siteId: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState(DEFAULT_SITE_ID);
  const fallback = sites[0];

  const value = useMemo<SiteContextValue>(() => {
    const resolved = sitesById[selectedId] ?? fallback;
    if (!resolved) {
      throw new Error(
        'No sites configured — at least one site must be defined in data/sites.ts',
      );
    }
    return {
      sites,
      selectedSite: resolved,
      selectSite: setSelectedId,
    };
  }, [selectedId, fallback]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSite must be used inside a <SiteProvider>');
  }
  return ctx;
}
