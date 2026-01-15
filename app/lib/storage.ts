
import { createClient } from '@/utils/supabase/client';

export type UploadResult = {
    path: string;
    url: string;
    error: string | null;
};

/**
 * Uploads a file to a specified Supabase Storage bucket.
 * 
 * @param bucket The name of the storage bucket (e.g., 'product-media', 'campaign-media')
 * @param file The file object to upload
 * @param path Optional custom path (e.g., 'folder/filename.ext'). If not provided, uses timestamp-filename.
 */
export async function uploadFile(
    bucket: string,
    file: File,
    path?: string
): Promise<UploadResult> {
    const supabase = createClient();

    // Generate a unique path if not provided
    const filePath = path || `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    console.log(`Uploading to ${bucket}/${filePath}...`);

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Upload Error:', error);
        return { path: '', url: '', error: error.message };
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return {
        path: data.path,
        url: publicUrl,
        error: null
    };
}

export function getPublicUrl(bucket: string, path: string): string {
    const supabase = createClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}
