import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

const BUCKET = "orya-media";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

// ─── POST /api/admin/upload ───────────────────────────────
// Nhận FormData với field "file", upload lên Supabase Storage
// Trả về public URL của file đã upload
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Không tìm thấy file" }, { status: 400 });
  }

  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Định dạng ảnh không được hỗ trợ. Vui lòng dùng PNG, SVG, WebP hoặc JPG." },
      { status: 400 }
    );
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "Ảnh phải có dung lượng không quá 5MB." },
      { status: 400 }
    );
  }

  // Tạo tên file duy nhất: timestamp_originalName
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 50);
  const filePath = `${Date.now()}_${safeName || "image"}.${extension}`;

  // Chuyển File → ArrayBuffer → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Lấy public URL
  const { data: urlData } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return NextResponse.json({
    url: urlData.publicUrl,
    path: filePath,
  });
}