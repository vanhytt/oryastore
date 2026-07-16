// ============================================================
// ADMIN API — Client-side helper gọi Next.js API Routes
// ============================================================
// Các hàm này chạy phía client (browser), gọi tới /api/admin/*
// API Routes phía server sẽ dùng service_role key để bypass RLS.
// ============================================================

import type { Product, NewsItem, Partner } from "./dbService";

// ─── UPLOAD ẢNH ──────────────────────────────────────────
/**
 * Upload một file ảnh lên Supabase Storage qua API Route.
 * @returns URL công khai của ảnh đã upload
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Upload ảnh thất bại");
  }

  const json = await res.json() as { url: string };
  return json.url;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  return Promise.all(uploadPromises);
}

// ─── PRODUCTS ────────────────────────────────────────────

export async function adminGetProducts(): Promise<Product[]> {
  const res = await fetch("/api/admin/products");
  if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
  return res.json();
}

export async function adminCreateProduct(
  prod: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prod),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Thêm sản phẩm thất bại");
  }
  return res.json();
}

export async function adminUpdateProduct(
  id: string | number,
  prod: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch("/api/admin/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...prod }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Cập nhật sản phẩm thất bại");
  }
  return res.json();
}

export async function adminDeleteProduct(id: string | number): Promise<void> {
  const res = await fetch("/api/admin/products", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Xóa sản phẩm thất bại");
  }
}

// ─── NEWS ─────────────────────────────────────────────────

export async function adminGetNews(): Promise<NewsItem[]> {
  const res = await fetch("/api/admin/news");
  if (!res.ok) throw new Error("Không thể tải danh sách bài viết");
  return res.json();
}

export async function adminCreateNews(
  news: Omit<NewsItem, "id" | "published_date">
): Promise<NewsItem> {
  const res = await fetch("/api/admin/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Thêm bài viết thất bại");
  }
  return res.json();
}

export async function adminUpdateNews(
  id: string | number,
  news: Omit<NewsItem, "id" | "published_date">
): Promise<NewsItem> {
  const res = await fetch("/api/admin/news", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...news }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Cập nhật bài viết thất bại");
  }
  return res.json();
}

export async function adminDeleteNews(id: string | number): Promise<void> {
  const res = await fetch("/api/admin/news", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Xóa bài viết thất bại");
  }
}

// ─── PARTNERS ────────────────────────────────────────────

export async function adminGetPartners(): Promise<Partner[]> {
  const res = await fetch("/api/admin/partners");
  if (!res.ok) throw new Error("Không thể tải danh sách đối tác");
  return res.json();
}

export async function adminCreatePartner(
  partner: Omit<Partner, "id">
): Promise<Partner> {
  const res = await fetch("/api/admin/partners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partner),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Thêm đối tác thất bại");
  }
  return res.json();
}

export async function adminUpdatePartner(
  id: string | number,
  partner: Omit<Partner, "id">
): Promise<Partner> {
  const res = await fetch("/api/admin/partners", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...partner }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Cập nhật đối tác thất bại");
  }
  return res.json();
}

export async function adminDeletePartner(id: string | number): Promise<void> {
  const res = await fetch("/api/admin/partners", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Xóa đối tác thất bại");
  }
}