import { Link } from 'react-router-dom';
import { CheckCircle2, CircleDashed, Layers, Flame, ArrowRight, BookOpen } from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import SubjectProgressList from '@/components/SubjectProgressList';
import ContinueLearning from '@/components/ContinueLearning';
import RecentActivity from '@/components/RecentActivity';
import {
  getOverallProgressFromResources,
  getSubjectsStartedFromResources,
  getMotivationMessage,
  getStreak,
} from '@/lib/progress';
import { useData, getAllUnifiedResources } from '@/context/DataContext';
import { resources as staticResources } from '@/data/resources';

export default function DashboardPage() {
  const { dbResources } = useData();
  const allResources = getAllUnifiedResources(staticResources, dbResources);
  const overall = getOverallProgressFromResources(allResources);
  const subjectsStarted = getSubjectsStartedFromResources(allResources);
  const motivation = getMotivationMessage(overall.percent);
  const streakData = getStreak();

  const isEmpty = overall.completed === 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <p className="text-sm font-semibold text-brand-600">Good morning 👋</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink-900">Your Semester 1 Progress</h1>
        <p className="mt-1.5 text-base font-medium text-ink-500">{motivation}</p>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Overall Progress — circular */}
            <div className="col-span-2 flex items-center gap-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-card lg:col-span-1">
              <CircularProgress percent={overall.percent} size={110} strokeWidth={10} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Overall</p>
                <p className="font-display text-lg font-bold text-ink-900">Semester 1</p>
                <p className="mt-1 text-xs font-medium text-ink-500">{motivation}</p>
              </div>
            </div>

            <SummaryCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Completed"
              value={overall.completed}
              color="emerald"
            />
            <SummaryCard
              icon={<CircleDashed className="h-5 w-5" />}
              label="Remaining"
              value={overall.total - overall.completed}
              color="brand"
            />
            <SummaryCard
              icon={<Layers className="h-5 w-5" />}
              label="Subjects Started"
              value={`${subjectsStarted.started} / ${subjectsStarted.total}`}
              color="amber"
            />
          </div>

          {/* Streak banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-3.5">
            <Flame className="h-6 w-6 text-amber-500" />
            <div>
              <p className="text-sm font-bold text-ink-900">
                {streakData.count > 0 ? `${streakData.count} day streak` : 'Start your streak today'}
              </p>
              <p className="text-xs font-medium text-ink-500">
                {streakData.count > 0
                  ? 'Complete at least one resource daily to keep it going.'
                  : 'Mark a resource as completed to begin your streak.'}
              </p>
            </div>
          </div>

          {/* Subject Progress + Continue Learning */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Subject Progress</h2>
              <SubjectProgressList />
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Continue Learning</h2>
              <ContinueLearning />
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Recent Activity</h2>
            <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
              <RecentActivity />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-${color}-50 text-${color}-600`}>
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink-900">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <BookOpen className="h-8 w-8" />
      </div>
      <h2 className="mt-5 font-display text-xl font-bold text-ink-900">Your learning journey starts here.</h2>
      <p className="mt-2 max-w-md text-sm font-medium text-ink-500">
        Mark resources as completed as you study and we'll track your progress across every subject.
      </p>
      <Link
        to="/"
        className="mt-5 flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Explore Semester 1
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
