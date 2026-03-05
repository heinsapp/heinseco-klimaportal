import { supabase } from './supabase';

// ============================================
// Image upload/delete for Supabase Storage
// ============================================

const BUCKET = 'images';

export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;

  const path = url.substring(idx + marker.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
