import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, TrendingUp } from 'lucide-react';
import SubjectGrid from '@/components/SubjectGrid';
import { getOverallProgress } from '@/lib/progress';

export default function HomePage() {
  const overall = getOverallProgress();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white sm:p-10">
        <div className="flex items-center gap-2 text-brand-100">
          <GraduationCap className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">ECE Resource Hub</span>
        </div>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          Everything you need for Semester 1 — in one place.
        </h1>
        <p className="mt-3 max-w-xl text-base text-brand-100">
          Notes, lectures, books, PYQs and more. Track your progress across every subject and unit.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-transform hover:scale-[1.02]"
          >
            <TrendingUp className="h-4 w-4" />
            My Progress
          </Link>
          <a
            href="#subjects"
            className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Browse Subjects
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {overall.completed > 0 && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            You've completed {overall.completed} of {overall.total} resources ({overall.percent}%)
          </div>
        )}
      </div>

      {/* Subjects */}
      <div id="subjects">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Semester 1 Subjects</h2>
            <p className="mt-1 text-sm font-medium text-ink-500">
              Click any subject to explore units and resources.
            </p>
          </div>
        </div>
        <SubjectGrid />
      </div>
    </div>
  );
}
