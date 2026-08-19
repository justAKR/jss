import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Loader2, Upload, FileText, Check } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { subjects, resourceTypeMeta, type ResourceType } from '@/data/resources';
import {
  createResource,
  updateResource,
  uploadPdf,
  fetchAllResources,
  type ResourceInput,
  type DbResource,
} from '@/lib/resourceService';

const RESOURCE_TYPES: ResourceType[] = [
  'PDF', 'NOTE', 'VIDEO', 'PLAYLIST', 'COURSE', 'BOOK',
  'PYQ', 'QUESTION_PAPER', 'LAB_MANUAL', 'VIVA',
  'ARTICLE', 'WEBSITE', 'OTHER',
];

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

export default function AdminResourceFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { dbSubjects, dbUnits, refresh } = useData();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const [form, setForm] = useState<ResourceInput>({
    title: '',
    description: '',
    subject_id: '',
    unit_id: '',
    resource_type: 'NOTE',
    url: null,
    file_path: null,
    source: null,
    author: null,
    tags: [],
    difficulty: 'beginner',
    verified: false,
  });

  const [tagInput, setTagInput] = useState('');

  // For edit mode: load the resource
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const all = await fetchAllResources();
        const resource = all.find((r: DbResource) => r.id === id);
        if (!resource) {
          setError('Resource not found');
          return;
        }
        setForm({
          title: resource.title,
          description: resource.description ?? '',
          subject_id: resource.subject_id,
          unit_id: resource.unit_id,
          resource_type: resource.resource_type,
          url: resource.url,
          file_path: resource.file_path,
          source: resource.source,
          author: resource.author,
          tags: resource.tags ?? [],
          difficulty: resource.difficulty,
          verified: resource.verified,
        });
        if (resource.file_path) {
          setPdfFileName(resource.file_path.split('/').pop() ?? resource.file_path);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resource');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  // Build subject options: merge static subjects with DB subjects
  const subjectOptions = useMemo(() => {
    const dbOpts = dbSubjects.map((s) => ({ id: s.id, name: s.name, slug: s.slug }));
    const staticOpts = subjects.map((s) => ({ id: s.slug, name: s.name, slug: s.slug }));
    // If DB subjects exist, use them; otherwise show static subjects as slug-based options
    if (dbOpts.length > 0) return dbOpts;
    return staticOpts;
  }, [dbSubjects]);

  // Build unit options based on selected subject
  const unitOptions = useMemo(() => {
    if (!form.subject_id) return [];
    // If DB subjects exist, use DB units
    if (dbSubjects.length > 0) {
      return dbUnits.filter((u) => u.subject_id === form.subject_id);
    }
    // Otherwise use static units (subject_id is actually the slug)
    const subject = subjects.find((s) => s.slug === form.subject_id);
    return subject?.units.map((u) => ({ id: u.id, name: u.name, slug: u.slug ?? u.id, sort_order: 0, subject_id: form.subject_id })) ?? [];
  }, [form.subject_id, dbSubjects, dbUnits]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfFileName(file.name);
    } else {
      setError('Please select a PDF file');
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags?.includes(tag)) {
      setForm({ ...form, tags: [...(form.tags ?? []), tag] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: (form.tags ?? []).filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      let filePath = form.file_path;

      // Upload PDF if a new file was selected
      if (pdfFile) {
        const subjectSlug = dbSubjects.length > 0
          ? dbSubjects.find((s) => s.id === form.subject_id)?.slug ?? 'general'
          : form.subject_id ?? 'general';
        filePath = await uploadPdf(pdfFile, subjectSlug);
      }

      const payload: ResourceInput = {
        ...form,
        file_path: filePath,
        tags: form.tags ?? [],
      };

      if (isEdit && id) {
        await updateResource(id, payload);
      } else {
        await createResource(payload);
      }

      await refresh();
      navigate('/admin/resources');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource');
    } finally {
      setSaving(false);
    }
  };

  const isPdfType = form.resource_type === 'PDF';
  const isYouTubeType = form.resource_type === 'VIDEO' || form.resource_type === 'PLAYLIST';
  const showUrlField = !isPdfType;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/resources" className="flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-900">
        <ChevronLeft className="h-4 w-4" />
        Back to Resources
      </Link>

      <div>
        <h2 className="font-display text-xl font-bold text-ink-900">
          {isEdit ? 'Edit Resource' : 'Add Resource'}
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          {isEdit ? 'Update an existing resource' : 'Create a new resource for students'}
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        {/* Title */}
        <Field label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="form-input"
            placeholder="e.g. Quantum Mechanics — Notes"
          />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea
            value={form.description ?? ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="form-input resize-none"
            placeholder="Brief description of the resource..."
          />
        </Field>

        {/* Subject + Unit */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Subject" required>
            <select
              value={form.subject_id}
              onChange={(e) => setForm({ ...form, subject_id: e.target.value, unit_id: '' })}
              required
              className="form-input"
            >
              <option value="">Select subject...</option>
              {subjectOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Unit / Week" required>
            <select
              value={form.unit_id}
              onChange={(e) => setForm({ ...form, unit_id: e.target.value })}
              required
              disabled={!form.subject_id}
              className="form-input disabled:bg-ink-50"
            >
              <option value="">Select unit...</option>
              {unitOptions.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Resource Type */}
        <Field label="Resource Type" required>
          <div className="flex flex-wrap gap-2">
            {RESOURCE_TYPES.map((type) => {
              const meta = resourceTypeMeta[type];
              const Icon = meta.icon;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, resource_type: type })}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    form.resource_type === type
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-ink-200 text-ink-600 hover:bg-ink-50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </Field>

        {/* PDF Upload (only for PDF type) */}
        {isPdfType && (
          <Field label="PDF Upload">
            <div className="rounded-lg border-2 border-dashed border-ink-200 p-4">
              {pdfFileName ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-ink-700">
                    <FileText className="h-5 w-5 text-brand-500" />
                    <span className="font-medium">{pdfFileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setPdfFile(null); setPdfFileName(null); }}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center py-4 text-center">
                  <Upload className="mb-2 h-6 w-6 text-ink-400" />
                  <span className="text-sm font-medium text-ink-600">Click to upload a PDF</span>
                  <span className="mt-0.5 text-xs text-ink-400">PDF files only, max 50MB</span>
                  <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>
          </Field>
        )}

        {/* URL field (for non-PDF types) */}
        {showUrlField && (
          <Field label={isYouTubeType ? 'YouTube URL' : 'External URL'}>
            <input
              type="url"
              value={form.url ?? ''}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="form-input"
              placeholder={isYouTubeType ? 'https://youtube.com/watch?v=...' : 'https://...'}
            />
          </Field>
        )}

        {/* Source + Author */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Source">
            <input
              type="text"
              value={form.source ?? ''}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="form-input"
              placeholder="e.g. NPTEL, YouTube channel name"
            />
          </Field>

          <Field label="Author">
            <input
              type="text"
              value={form.author ?? ''}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="form-input"
              placeholder="e.g. Dr. Smith"
            />
          </Field>
        </div>

        {/* Tags */}
        <Field label="Tags">
          <div className="space-y-2">
            {form.tags && form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded bg-ink-100 px-2 py-1 text-xs font-medium text-ink-700">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-ink-400 hover:text-red-500">
                      <span className="text-sm leading-none">×</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                className="form-input flex-1"
                placeholder="Add a tag and press Enter..."
              />
              <button type="button" onClick={addTag} className="rounded-lg bg-ink-100 px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-ink-200">
                Add
              </button>
            </div>
          </div>
        </Field>

        {/* Difficulty + Verified */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Difficulty">
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="form-input"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </Field>

          <Field label="Verified">
            <label className="flex h-[42px] cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.verified ?? false}
                onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-400"
              />
              <span className="text-sm font-medium text-ink-700">Mark as verified resource</span>
            </label>
          </Field>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 border-t border-ink-100 pt-4">
          <Link
            to="/admin/resources"
            className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {isEdit ? 'Save Changes' : 'Create Resource'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
