import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, BookOpen, Menu, X, Shield } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: BookOpen, end: true },
  { to: '/dashboard', label: 'My Progress', icon: LayoutDashboard, end: false },
  { to: '/admin', label: 'Admin', icon: Shield, end: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-blue-600 text-white">
            <img
              src="/WhatsApp_Image_2026-08-18_at_3.09.32_PM.jpeg"
              alt="ECEHub"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="font-display text-lg font-bold text-ink-900">
            ECE<span className="rounded bg-blue-600 px-1.5 py-0.5 text-white">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-ink-600 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-blue-50 sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-ink-100 bg-white px-4 py-3 sm:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-ink-600 hover:bg-blue-50'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}