import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Resource as StaticResource, ResourceType } from '@/data/resources';
import { subjects as staticSubjects } from '@/data/resources';
import type { DbResource, DbSubject, DbUnit } from '@/lib/resourceService';
import { fetchAllResources, fetchAllSubjectsWithUnits } from '@/lib/resourceService';

export interface UnifiedResource {
  id: string;
  title: string;
  description?: string;
  subjectSlug: string;
  unitId: string;
  type: ResourceType;
  url?: string;
  filePath?: string;
  sourceName?: string;
  author?: string;
  thumbnailUrl?: string;
  tags: string[];
  difficulty: string;
  verified: boolean;
  origin: 'static' | 'database';
  createdAt?: string;
}

interface DataContextValue {
  dbResources: UnifiedResource[];
  dbSubjects: DbSubject[];
  dbUnits: DbUnit[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [dbResources, setDbResources] = useState<UnifiedResource[]>([]);
  const [dbSubjects, setDbSubjects] = useState<DbSubject[]>([]);
  const [dbUnits, setDbUnits] = useState<DbUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [resources, { subjects, units }] = await Promise.all([
        fetchAllResources(),
        fetchAllSubjectsWithUnits(),
      ]);

      const subjectMap = new Map(subjects.map((s) => [s.id, s]));
      const unitMap = new Map(units.map((u) => [u.id, u]));

      const unified: UnifiedResource[] = resources.map((r: DbResource) => {
        const subject = subjectMap.get(r.subject_id);
        const unit = unitMap.get(r.unit_id);
        return {
          id: r.id,
          title: r.title,
          description: r.description ?? undefined,
          subjectSlug: subject?.slug ?? '',
          unitId: unit?.slug ?? '',
          type: r.resource_type,
          url: r.url ?? undefined,
          filePath: r.file_path ?? undefined,
          sourceName: r.source ?? undefined,
          author: r.author ?? undefined,
          thumbnailUrl: r.thumbnail_url ?? undefined,
          tags: r.tags ?? [],
          difficulty: r.difficulty,
          verified: r.verified,
          origin: 'database' as const,
          createdAt: r.created_at,
        };
      });

      setDbResources(unified);
      setDbSubjects(subjects);
      setDbUnits(units);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <DataContext.Provider value={{ dbResources, dbSubjects, dbUnits, loading, error, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

/* Helper: merge static + DB resources for a given subject */
export function mergeResources(
  staticResources: StaticResource[],
  dbResources: UnifiedResource[],
  subjectSlug: string
): UnifiedResource[] {
  const staticUnified: UnifiedResource[] = staticResources
    .filter((r) => r.subjectSlug === subjectSlug)
    .map((r) => ({
      id: r.id,
      title: r.title,
      subjectSlug: r.subjectSlug,
      unitId: r.unitId,
      type: r.type,
      origin: 'static' as const,
      tags: [],
      difficulty: 'beginner',
      verified: false,
    }));

  const dbForSubject = dbResources.filter((r) => r.subjectSlug === subjectSlug);
  return [...dbForSubject, ...staticUnified];
}

/* Helper: merge resources for a specific unit */
export function mergeUnitResources(
  staticResources: StaticResource[],
  dbResources: UnifiedResource[],
  subjectSlug: string,
  unitId: string
): UnifiedResource[] {
  const all = mergeResources(staticResources, dbResources, subjectSlug);
  return all.filter((r) => r.unitId === unitId);
}

/* Helper: get all resources (static + DB) across all subjects */
export function getAllUnifiedResources(
  staticResources: StaticResource[],
  dbResources: UnifiedResource[]
): UnifiedResource[] {
  const staticUnified: UnifiedResource[] = staticResources.map((r) => ({
    id: r.id,
    title: r.title,
    subjectSlug: r.subjectSlug,
    unitId: r.unitId,
    type: r.type,
    origin: 'static' as const,
    tags: [],
    difficulty: 'beginner',
    verified: false,
  }));
  return [...dbResources, ...staticUnified];
}
