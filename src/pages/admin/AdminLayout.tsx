import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, FileText, PlusCircle, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/resources', label: 'Resources', icon: FileText, end: false },
  { to: '/admin/resources/new', label: 'Add Resource', icon: PlusCircle, end: false },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-ink-900">Admin Panel</h1>
            <p className="text-xs text-ink-500">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-100"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-ink-100 pb-px">
        {adminNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-none items-center gap-2 rounded-t-lg px-3 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-b-2 border-brand-500 text-brand-600'
                  : 'text-ink-500 hover:text-ink-900'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
