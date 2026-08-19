import { Check } from 'lucide-react';
import { subjects, resources, resourceTypeMeta } from '@/data/resources';
import { getRecentActivity, formatRelativeTime } from '@/lib/progress';

export default function RecentActivity() {
  const activity = getRecentActivity(8);

  if (activity.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink-200 bg-white p-6 text-center">
        <p className="text-sm font-medium text-ink-500">
          Your completed resources will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activity.map((entry) => {
        const resource = resources.find((r) => r.id === entry.resourceId);
        if (!resource) return null;
        const subject = subjects.find((s) => s.slug === resource.subjectSlug);
        const typeMeta = resourceTypeMeta[resource.type];
        const Icon = typeMeta.icon;

        return (
          <div key={entry.resourceId} className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-ink-50">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Check className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{resource.title}</p>
              <p className="text-xs font-medium text-ink-500">
                {subject?.shortName} · <Icon className="inline h-3 w-3" /> {typeMeta.label}
              </p>
            </div>
            <span className="flex-none text-xs font-medium text-ink-400">
              {formatRelativeTime(entry.timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
