import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subjects, resources as staticResources, resourceTypeMeta } from '@/data/resources';
import { getSubjectProgressFromResources } from '@/lib/progress';
import { useProgress } from '@/context/ProgressContext';
import { useData, getAllUnifiedResources, type UnifiedResource } from '@/context/DataContext';

export default function ContinueLearning() {
  const { bookmarks, completed } = useProgress();
  const { dbResources } = useData();
  const completedSet = new Set(completed);
  const allResources = getAllUnifiedResources(staticResources, dbResources);
  const resourceMap = new Map(allResources.map((r) => [r.id, r]));
  const continueIds = bookmarks.filter((id) => !completedSet.has(id) && resourceMap.has(id)).slice(0, 5);

  if (continueIds.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink-200 bg-white p-6 text-center">
        <p className="text-sm font-medium text-ink-500">
          Bookmark resources to pick up where you left off.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {continueIds.map((id) => {
        const resource = resourceMap.get(id) as UnifiedResource;
        const subject = subjects.find((s) => s.slug === resource.subjectSlug);
        const allSubjectResources = getAllUnifiedResources(
          staticResources.filter((r) => r.subjectSlug === resource.subjectSlug),
          dbResources
        );
        const progress = getSubjectProgressFromResources(resource.subjectSlug, allSubjectResources);
        const typeMeta = resourceTypeMeta[resource.type];
        const Icon = typeMeta.icon;

        return (
          <Link
            key={id}
            to={`/subjects/${resource.subjectSlug}`}
            className="group flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-card transition-all duration-300 hover:border-brand-200 hover:shadow-card-hover"
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-ink-900">{resource.title}</h4>
              <p className="mt-0.5 text-xs font-medium text-ink-500">
                {subject?.shortName} · {progress.percent}% complete
              </p>
            </div>
            <div className="flex flex-none items-center gap-1 text-sm font-semibold text-ink-400 transition-colors group-hover:text-brand-600">
              Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
