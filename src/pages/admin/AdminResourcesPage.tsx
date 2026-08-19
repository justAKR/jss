import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Pencil, Trash2, BadgeCheck, Loader2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { subjects, resourceTypeMeta } from '@/data/resources';
import { deleteResource, deleteFile, type DbResource } from '@/lib/resourceService';
import { fetchAllResources } from '@/lib/resourceService';
import type { UnifiedResource } from '@/context/DataContext';

interface AdminResource extends UnifiedResource {
  subject_name?: string;
  unit_name?: string;
}

export default function AdminResourcesPage() {
  const { dbResources, dbSubjects, dbUnits, refresh, loading } = useData();
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminResource | null>(null);

  const subjectMap = useMemo(() => new Map(dbSubjects.map((s) => [s.id, s])), [dbSubjects]);
  const unitMap = useMemo(() => new Map(dbUnits.map((u) => [u.id, u])), [dbUnits]);

  const enriched: AdminResource[] = useMemo(() => {
    return dbResources.map((r) => ({
      ...r,
      subject_name: subjectMap.get(r.subjectSlug)?.name ?? 'Unknown',
      unit_name: unitMap.get(r.unitId)?.name ?? 'Unknown',
    }));
  }, [dbResources, subjectMap, unitMap]);

  const filtered = useMemo(() => {
    if (!search) return enriched;
    const q = search.toLowerCase();
    return enriched.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.subject_name ?? '').toLowerCase().includes(q) ||
        (r.unit_name ?? '').toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );
  }, [enriched, search]);

  const handleDelete = async (resource: AdminResource) => {
    setDeleting(resource.id);
    try {
      if (resource.filePath) {
        await deleteFile(resource.filePath);
      }
      await deleteResource(resource.id);
      await refresh();
      setConfirmDelete(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete resource');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900">Resources</h2>
          <p className="mt-1 text-sm text-ink-500">Manage database resources ({dbResources.length} total)</p>
        </div>
        <Link
          to="/admin/resources/new"
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add Resource
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, subject, unit, or type..."
          className="w-full rounded-lg border border-ink-200 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50">
              <tr>
                <th className="px-4 py-3 font-semibold text-ink-600">Title</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Subject</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Unit</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Type</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Verified</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Created</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400">
                    No database resources yet. Click "Add Resource" to create one.
                  </td>
                </tr>
              )}
              {filtered.map((resource) => {
                const typeMeta = resourceTypeMeta[resource.type];
                return (
                  <tr key={resource.id} className="transition-colors hover:bg-ink-50/50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-ink-900">{resource.title}</p>
                      {resource.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-ink-400">{resource.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-600">{resource.subject_name}</td>
                    <td className="px-4 py-3 text-ink-600">{resource.unit_name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">
                        {typeMeta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {resource.verified ? (
                        <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <span className="text-xs text-ink-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-400">
                      {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/admin/resources/${resource.id}/edit`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(resource)}
                          disabled={deleting === resource.id}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                        >
                          {deleting === resource.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <h3 className="font-display text-lg font-bold text-ink-900">Delete Resource</h3>
              <button onClick={() => setConfirmDelete(null)} className="text-ink-400 hover:text-ink-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-5 text-sm text-ink-500">
              Are you sure you want to delete "{confirmDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-lg border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleting === confirmDelete.id}
                className="flex items-center gap-1.5 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting === confirmDelete.id && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
