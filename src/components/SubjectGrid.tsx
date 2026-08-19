import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subjects, getResourcesForSubject } from '@/data/resources';
import { getSubjectProgressFromResources } from '@/lib/progress';
import { useData, mergeResources } from '@/context/DataContext';

export default function SubjectGrid() {
  const { dbResources } = useData();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => {
        const allResources = mergeResources([], dbResources, subject.slug);
        const progress = getSubjectProgressFromResources(subject.slug, allResources);
        const staticTotal = getResourcesForSubject(subject.slug).length;
        const dbTotal = dbResources.filter((r) => r.subjectSlug === subject.slug).length;
        const total = staticTotal + dbTotal;
        const Icon = subject.icon;
        return (
          <Link
            key={subject.slug}
            to={`/subjects/${subject.slug}`}
            className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${subject.color}-50 text-${subject.color}-600`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-ink-900">{subject.name}</h3>
                <p className="text-xs font-medium text-ink-400">{total} resources</p>
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-500">{subject.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-bold text-ink-900">
                  {progress.hasResources ? progress.percent : 0}
                </span>
                <span className="text-sm font-medium text-ink-400">%</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-ink-400 transition-colors group-hover:text-brand-600">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            {progress.hasResources && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            )}
            <p className="mt-1.5 text-xs font-medium text-ink-400">
              {progress.completed > 0 && progress.hasResources
                ? `${progress.completed} / ${progress.total} completed`
                : progress.hasResources
                ? 'Not started yet'
                : 'No resources yet'}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
