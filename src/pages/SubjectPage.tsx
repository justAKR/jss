import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Loader2 } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import ResourceCard from '@/components/ResourceCard';
import { getSubject } from '@/data/resources';
import { getSubjectProgressFromResources, getUnitProgressFromResources } from '@/lib/progress';
import { useData, mergeResources, mergeUnitResources, type UnifiedResource } from '@/context/DataContext';

export default function SubjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { dbResources, loading } = useData();

  const subject = slug ? getSubject(slug) : undefined;

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">Subject not found</h1>
        <Link to="/" className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600">
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = subject.icon;
  const allResources = mergeResources([], dbResources, subject.slug);
  const subjectProgress = getSubjectProgressFromResources(subject.slug, allResources);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link to="/" className="flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-900">
        <ChevronLeft className="h-4 w-4" />
        All Subjects
      </Link>

      {/* Subject header */}
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-${subject.color}-50 text-${subject.color}-600`}>
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold text-ink-900">{subject.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{subject.description}</p>
          </div>
          <div className="hidden flex-none text-right sm:block">
            <p className="font-display text-3xl font-bold text-ink-900">
              {subjectProgress.hasResources ? `${subjectProgress.percent}%` : '—'}
            </p>
            <p className="text-xs font-medium text-ink-400">
              {subjectProgress.hasResources
                ? `${subjectProgress.completed} / ${subjectProgress.total} completed`
                : 'No resources yet'}
            </p>
          </div>
        </div>

        {subjectProgress.hasResources && (
          <div className="mt-4">
            <ProgressBar percent={subjectProgress.percent} />
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          <span className="ml-2 text-sm font-medium text-ink-500">Loading resources...</span>
        </div>
      )}

      {/* Unit-wise progress */}
      {!loading && (
        <div className="space-y-4">
          {subject.units.map((unit) => {
            const isGeneral = unit.id.endsWith('-u0');
            const unitNumber = subject.units
              .filter((u) => !u.id.endsWith('-u0'))
              .findIndex((u) => u.id === unit.id) + 1;
            const unitResources = mergeUnitResources([], dbResources, subject.slug, unit.id);
            const unitProgress = getUnitProgressFromResources(subject.slug, unit.id, allResources);

            return (
              <div key={unit.id} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg text-xs font-bold ${
                        isGeneral ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-600'
                      }`}
                    >
                      {isGeneral ? '★' : unitNumber}
                    </span>
                    <h2 className="font-display text-base font-bold text-ink-900">{unit.name}</h2>
                  </div>
                  <span className="text-sm font-bold text-ink-900">
                    {unitProgress.hasResources ? `${unitProgress.percent}%` : '—'}
                  </span>
                </div>

                {unitProgress.hasResources ? (
                  <>
                    <p className="mt-2 text-xs font-medium text-ink-500">
                      {unitProgress.completed} / {unitProgress.total} resources
                    </p>
                    <div className="mt-2">
                      <ProgressBar percent={unitProgress.percent} />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {unitResources.map((resource: UnifiedResource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-sm font-medium text-ink-400">No resources available yet</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Back to dashboard */}
      <Link
        to="/dashboard"
        className="flex items-center justify-center gap-2 rounded-xl border border-ink-100 bg-white py-3 text-sm font-semibold text-ink-700 shadow-card transition-colors hover:border-brand-200 hover:text-brand-700"
      >
        View My Progress
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}