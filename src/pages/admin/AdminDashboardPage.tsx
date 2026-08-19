import { Link } from 'react-router-dom';
import { FileText, PlusCircle, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { useData, getAllUnifiedResources } from '@/context/DataContext';
import { resources as staticResources, subjects } from '@/data/resources';
import { getOverallProgressFromResources } from '@/lib/progress';

export default function AdminDashboardPage() {
  const { dbResources } = useData();
  const allResources = getAllUnifiedResources(staticResources, dbResources);
  const dbCount = dbResources.length;
  const staticCount = staticResources.length;
  const verifiedCount = dbResources.filter((r) => r.verified).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900">Dashboard</h2>
        <p className="mt-1 text-sm text-ink-500">Overview of your content management system</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FileText className="h-5 w-5" />} label="Total Resources" value={dbCount + staticCount} color="brand" />
        <StatCard icon={<BookOpen className="h-5 w-5" />} label="Static Resources" value={staticCount} color="ink" />
        <StatCard icon={<PlusCircle className="h-5 w-5" />} label="Database Resources" value={dbCount} color="emerald" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Verified" value={verifiedCount} color="amber" />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        <h3 className="mb-4 font-display text-base font-bold text-ink-900">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/resources/new"
            className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Resource
          </Link>
          <Link
            to="/admin/resources"
            className="flex items-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
          >
            <FileText className="h-4 w-4" />
            Manage Resources
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        <h3 className="mb-4 font-display text-base font-bold text-ink-900">Subjects</h3>
        <div className="space-y-2">
          {subjects.map((subject) => {
            const subjectResources = allResources.filter((r) => r.subjectSlug === subject.slug);
            const dbSubjectCount = dbResources.filter((r) => r.subjectSlug === subject.slug).length;
            return (
              <Link
                key={subject.slug}
                to={`/subjects/${subject.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-50"
              >
                <div className="flex items-center gap-3">
                  <subject.icon className="h-4 w-4 text-ink-500" />
                  <span className="text-sm font-semibold text-ink-900">{subject.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
                  <span>{subjectResources.length} total</span>
                  {dbSubjectCount > 0 && <span className="text-emerald-600">{dbSubjectCount} from DB</span>}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-${color}-50 text-${color}-600`}>
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink-900">{value}</p>
    </div>
  );
}
