import { Check, Bookmark, BookmarkCheck, ExternalLink, Download, Play, FileText, BadgeCheck } from 'lucide-react';
import { resourceTypeMeta, getSubject } from '@/data/resources';
import { useProgress } from '@/context/ProgressContext';
import { isYouTubeUrl, getYouTubeThumbnail, getPublicUrl } from '@/lib/resourceService';
import type { UnifiedResource } from '@/context/DataContext';

interface ResourceCardProps {
  resource: UnifiedResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { completed, bookmarks, toggleResource, toggleBookmark } = useProgress();
  const isCompleted = completed.includes(resource.id);
  const isBookmarked = bookmarks.includes(resource.id);
  const subject = getSubject(resource.subjectSlug);
  const typeMeta = resourceTypeMeta[resource.type];
  const Icon = typeMeta.icon;

  const hasYouTube = resource.url && isYouTubeUrl(resource.url);
  const ytThumb = hasYouTube ? getYouTubeThumbnail(resource.url!) : null;
  const pdfUrl = resource.filePath ? getPublicUrl(resource.filePath) : null;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover ${
        isCompleted ? 'border-ink-100 bg-ink-50/60' : 'border-ink-100 hover:border-brand-200'
      }`}
    >
      {/* YouTube thumbnail */}
      {ytThumb && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video w-full overflow-hidden bg-ink-100"
        >
          <img src={ytThumb} alt={resource.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
              <Play className="h-5 w-5 fill-brand-600 text-brand-600" />
            </div>
          </div>
        </a>
      )}

      {/* PDF indicator */}
      {pdfUrl && !ytThumb && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-20 items-center justify-center bg-brand-50"
        >
          <FileText className="h-8 w-8 text-brand-400" />
          <span className="absolute bottom-1.5 right-2 rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">PDF</span>
        </a>
      )}

      <div className="flex items-start gap-3 p-4">
        <div
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${
            isCompleted ? 'bg-ink-100 text-ink-400' : 'bg-brand-50 text-brand-600'
          } ${ytThumb || pdfUrl ? 'hidden' : ''}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className={`truncate text-sm font-semibold ${isCompleted ? 'text-ink-500' : 'text-ink-900'}`}>
                {resource.title}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <p className="text-xs font-medium text-ink-400">{typeMeta.label}</p>
                {resource.verified && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </div>
            {isCompleted && (
              <span className="flex flex-none items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <Check className="h-3 w-3 animate-pop" />
                Completed
              </span>
            )}
          </div>

          {resource.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">{resource.description}</p>
          )}

          {resource.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-medium text-ink-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => toggleResource(resource.id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isCompleted
                  ? 'bg-white text-ink-500 hover:bg-ink-100 hover:text-ink-700'
                  : 'bg-brand-500 text-white hover:bg-brand-600'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Completed
                </>
              ) : (
                <>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border-2 border-current" />
                  Mark as completed
                </>
              )}
            </button>

            <button
              onClick={() => toggleBookmark(resource.id)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 ${
                isBookmarked ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'text-ink-400 hover:bg-ink-100 hover:text-ink-600'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>

            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 transition-all duration-200 hover:bg-ink-100 hover:text-ink-600"
                aria-label="Open resource"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 transition-all duration-200 hover:bg-ink-100 hover:text-ink-600"
                aria-label="Download PDF"
              >
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {subject && (
        <span className="sr-only">{subject.name}</span>
      )}
    </div>
  );
}
