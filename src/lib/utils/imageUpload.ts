// Image upload utility for brand story
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET_NAME = "orya-assets";

export interface UploadResult {
  publicUrl: string;
  path: string;
}

// Auto-create bucket if it doesn't exist
async function ensureBucketExists(): Promise<void> {
  try {
    // Try to get bucket info
    const { error } = await supabase.storage.getBucket(BUCKET_NAME);
    
    // If bucket doesn't exist, create it
    if (error?.status === 404) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });
    } else if (error) {
      console.warn(`Could not verify bucket: ${error.message}`);
    }
  } catch (err) {
  console.warn("Bucket check error:", err instanceof Error ? err.message : err);
  }
}

export async function uploadBrandImage(
  file: File,
  folder: string = "brand-story"
): Promise<UploadResult> {
  try {
    // Validate file
    if (!file) throw new Error("No file selected");
    if (file.size > 5 * 1024 * 1024) throw new Error("File size must be < 5MB");

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, WebP allowed");
    }

    // Ensure bucket exists before uploading
    await ensureBucketExists();

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file, { upsert: false });

    if (error) throw new Error(error.message);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);

    return {
      publicUrl,
      path: filename,
    };
  } catch (err) {
    console.error("Image upload error:", err);
    throw err;
  }
}

export function getImagePreviewUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return url || "/placeholder.jpg";
}

export function validateImageUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return url === "" || url === "/placeholder.jpg";
  }
}
