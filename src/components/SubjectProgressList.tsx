import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { subjects } from '@/data/resources';
import { getSubjectProgressFromResources } from '@/lib/progress';
import { useData, mergeResources } from '@/context/DataContext';

export default function SubjectProgressList() {
  const { dbResources } = useData();

  return (
    <div className="space-y-3">
      {subjects.map((subject) => {
        const allResources = mergeResources([], dbResources, subject.slug);
        const progress = getSubjectProgressFromResources(subject.slug, allResources);
        const Icon = subject.icon;
        return (
          <Link
            key={subject.slug}
            to={`/subjects/${subject.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 shadow-card transition-all duration-300 hover:border-brand-200 hover:shadow-card-hover"
          >
            <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-${subject.color}-50 text-${subject.color}-600`}>
              <Icon className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold text-ink-900">{subject.name}</h3>
                <span className="flex-none text-sm font-bold text-ink-900">
                  {progress.hasResources ? `${progress.percent}%` : '—'}
                </span>
              </div>

              {progress.hasResources ? (
                <>
                  <p className="mt-0.5 text-xs font-medium text-ink-500">
                    {progress.completed} / {progress.total} resources completed
                  </p>
                  <div className="mt-2">
                    <ProgressBar percent={progress.percent} />
                  </div>
                </>
              ) : (
                <p className="mt-1 text-xs font-medium text-ink-400">No resources available yet</p>
              )}
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
