import { supabase, RESOURCES_BUCKET } from '@/lib/supabase';
import type { ResourceType } from '@/data/resources';

export interface DbResource {
  id: string;
  title: string;
  description: string | null;
  subject_id: string;
  unit_id: string;
  resource_type: ResourceType;
  url: string | null;
  file_path: string | null;
  source: string | null;
  author: string | null;
  thumbnail_url: string | null;
  tags: string[];
  difficulty: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbSubject {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  description: string | null;
  icon: string;
  color: string;
  semester: string;
  sort_order: number;
}

export interface DbUnit {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface ResourceWithRelations extends DbResource {
  subject?: DbSubject;
  unit?: DbUnit;
}

/* ── Fetch ── */

export async function fetchAllResources(): Promise<DbResource[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchResourcesForSubject(subjectId: string): Promise<DbResource[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('subject_id', subjectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchResourcesForUnit(unitId: string): Promise<DbResource[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('unit_id', unitId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllSubjectsWithUnits(): Promise<{ subjects: DbSubject[]; units: DbUnit[] }> {
  const [subjectsRes, unitsRes] = await Promise.all([
    supabase.from('subjects').select('*').order('sort_order', { ascending: true }),
    supabase.from('units').select('*').order('sort_order', { ascending: true }),
  ]);
  if (subjectsRes.error) throw subjectsRes.error;
  if (unitsRes.error) throw unitsRes.error;
  return { subjects: subjectsRes.data ?? [], units: unitsRes.data ?? [] };
}

export async function searchResources(query: string): Promise<ResourceWithRelations[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*, subject:subjects(*), unit:units(*)')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,author.ilike.%${query}%,source.ilike.%${query}%`)
    .limit(30);
  if (error) throw error;
  return data ?? [];
}

/* ── CRUD ── */

export interface ResourceInput {
  title: string;
  description?: string;
  subject_id: string;
  unit_id: string;
  resource_type: ResourceType;
  url?: string | null;
  file_path?: string | null;
  source?: string | null;
  author?: string | null;
  thumbnail_url?: string | null;
  tags?: string[];
  difficulty?: string;
  verified?: boolean;
}

export async function createResource(input: ResourceInput): Promise<DbResource> {
  const { data, error } = await supabase.from('resources').insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateResource(id: string, updates: Partial<ResourceInput>): Promise<DbResource> {
  const { data, error } = await supabase.from('resources').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabase.from('resources').delete().eq('id', id);
  if (error) throw error;
}

/* ── File Upload ── */

export async function uploadPdf(file: File, subjectSlug: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'pdf';
  const fileName = `${subjectSlug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(RESOURCES_BUCKET).upload(fileName, file, {
    contentType: 'application/pdf',
    cacheControl: '3600',
  });

  if (error) throw error;
  return fileName;
}

export function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage.from(RESOURCES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteFile(filePath: string): Promise<void> {
  const { error } = await supabase.storage.from(RESOURCES_BUCKET).remove([filePath]);
  if (error) throw error;
}

/* ── YouTube helpers ── */

export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist)/i.test(url);
}

export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export function getYouTubePlaylistId(url: string): string | null {
  const match = url.match(/youtube\.com\/playlist\?list=([\w-]+)/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return null;
}
