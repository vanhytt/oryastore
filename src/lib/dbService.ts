import { supabase, isSupabaseConfigured } from "./supabase";

export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  originalPrice?: string;
  originalPriceValue?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription: string;
  image?: string;
  image_url?: string;
  images?: string[];
  primaryImage?: string;
  slug?: string;
  brand?: string;
  is_active?: boolean;
  isActive?: boolean;
  colors?: string[];
  benefits?: string[];
  uses?: string;
  ingredients?: string;
  usage_instructions?: string;
  usage?: string[];
}

export interface NewsItem {
  id: string | number;
  title: string;
  cover_image: string;
  content: string;
  excerpt: string;
  author: string;
  status: "Draft" | "Published";
  published_date: string;
}

export interface Partner {
  id: string | number;
  name: string;
  logo: string;
  link?: string;
}

type DatabaseRow = Record<string, unknown>;

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function textValue(value: unknown): string {
  if (typeof value === "string") return value;
  return stringArray(value).join("\n");
}

function mapProduct(row: DatabaseRow): Product {
  const image = stringValue(row.image);
  const imageUrl = stringValue(row.image_url) || image;
  const images = stringArray(row.images);
  if (images.length === 0 && image) images.push(image);
  const isActive = typeof row.is_active === "boolean" ? row.is_active : undefined;

  return {
    id: typeof row.id === "string" || typeof row.id === "number" ? row.id : "",
    name: stringValue(row.name),
    category: stringValue(row.category),
    price: typeof row.price === "number" ? String(row.price) : stringValue(row.price),
    priceValue: numberValue(row.price_value),
    originalPrice: typeof row.original_price === "number"
      ? String(row.original_price)
      : stringValue(row.original_price),
    originalPriceValue: numberValue(row.original_price_value),
    badge: stringValue(row.badge),
    rating: numberValue(row.rating),
    reviewsCount: numberValue(row.reviews_count),
    description: stringValue(row.description),
    shortDescription: stringValue(row.short_description),
    image,
    image_url: imageUrl,
    images,
    primaryImage: stringValue(row.primary_image) || image,
    slug: stringValue(row.slug),
    brand: stringValue(row.brand),
    is_active: isActive,
    isActive,
    colors: stringArray(row.colors),
    benefits: stringArray(row.benefits),
    uses: stringValue(row.uses) || stringArray(row.benefits).join("\n"),
    ingredients: textValue(row.ingredients),
    usage_instructions: stringValue(row.usage_instructions) || stringArray(row.usage).join("\n"),
    usage: stringArray(row.usage),
  };
}

function mapNews(row: DatabaseRow): NewsItem {
  return {
    id: typeof row.id === "string" || typeof row.id === "number" ? row.id : "",
    title: stringValue(row.title),
    cover_image: stringValue(row.cover_image),
    content: stringValue(row.content),
    excerpt: stringValue(row.excerpt),
    author: stringValue(row.author),
    status: row.status === "Published" ? "Published" : "Draft",
    published_date: stringValue(row.published_date),
  };
}

function mapPartner(row: DatabaseRow): Partner {
  return {
    id: typeof row.id === "string" || typeof row.id === "number" ? row.id : "",
    name: stringValue(row.name),
    logo: stringValue(row.logo),
    link: stringValue(row.link),
  };
}

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }
  return supabase;
}

async function revalidatePublicData() {
  if (typeof window === "undefined") return;
  try {
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths: ["/", "/products", "/san-pham", "/tin-tuc", "/thuong-hieu"],
      }),
    });
    if (!response.ok) {
      console.error(`Không thể làm mới dữ liệu công khai (${response.status})`);
    }
  } catch (error) {
    console.error("Không thể gọi API làm mới dữ liệu công khai:", error);
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching products from Supabase:", error);
    return [];
  }
  return (data ?? []).map((row) => mapProduct(row as DatabaseRow));
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .insert([{
      name: product.name,
      category: product.category,
      price: product.price,
      price_value: product.priceValue,
      original_price: product.originalPrice || null,
      original_price_value: product.originalPriceValue ?? null,
      badge: product.badge || null,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      description: product.description,
      short_description: product.shortDescription,
      image: product.primaryImage || product.images?.[0] || product.image || null,
      images: product.images ?? [],
      primary_image: product.primaryImage || product.images?.[0] || product.image || null,
      slug: product.slug || null,
      brand: product.brand || null,
      is_active: product.is_active ?? product.isActive ?? true,
      colors: product.colors ?? [],
      benefits: product.benefits ?? [],
      uses: product.uses || null,
      ingredients: product.ingredients || null,
      usage_instructions: product.usage_instructions || null,
      usage: product.usage ?? [],
    }])
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapProduct(data as DatabaseRow);
}

export async function updateProduct(id: string | number, product: Omit<Product, "id">): Promise<Product> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .update({
      name: product.name,
      category: product.category,
      price: product.price,
      price_value: product.priceValue,
      original_price: product.originalPrice || null,
      original_price_value: product.originalPriceValue ?? null,
      badge: product.badge || null,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      description: product.description,
      short_description: product.shortDescription,
      image: product.primaryImage || product.images?.[0] || product.image || null,
      images: product.images ?? [],
      primary_image: product.primaryImage || product.images?.[0] || product.image || null,
      slug: product.slug || null,
      brand: product.brand || null,
      is_active: product.is_active ?? product.isActive ?? true,
      colors: product.colors ?? [],
      benefits: product.benefits ?? [],
      uses: product.uses || null,
      ingredients: product.ingredients || null,
      usage_instructions: product.usage_instructions || null,
      usage: product.usage ?? [],
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapProduct(data as DatabaseRow);
}

export async function deleteProduct(id: string | number): Promise<boolean> {
  const { error } = await requireSupabase().from("products").delete().eq("id", id);
  if (error) throw error;
  await revalidatePublicData();
  return true;
}

export async function getNews(): Promise<NewsItem[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching news from Supabase:", error);
    return [];
  }
  return (data ?? []).map((row) => mapNews(row as DatabaseRow));
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(10000));

    if (error) {
      console.error("Error fetching published news from Supabase:", error);
      throw error;
    }

    return (data ?? []).map((row) => mapNews(row as DatabaseRow));
  } catch (error) {
    console.error("Failed to fetch published news from Supabase:", error);
    throw error;
  }
}

export async function createNews(news: Omit<NewsItem, "id" | "published_date">): Promise<NewsItem> {
  const client = requireSupabase();
  const today = new Date();
  const publishedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
  const { data, error } = await client
    .from("news")
    .insert([{
      title: news.title,
      cover_image: news.cover_image || null,
      content: news.content,
      excerpt: news.excerpt,
      author: news.author,
      status: news.status,
      published_date: publishedDate,
    }])
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapNews(data as DatabaseRow);
}

export async function updateNews(id: string | number, news: Omit<NewsItem, "id" | "published_date">): Promise<NewsItem> {
  const { data, error } = await requireSupabase()
    .from("news")
    .update({
      title: news.title,
      cover_image: news.cover_image || null,
      content: news.content,
      excerpt: news.excerpt,
      author: news.author,
      status: news.status,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapNews(data as DatabaseRow);
}

export async function deleteNews(id: string | number): Promise<boolean> {
  const { error } = await requireSupabase().from("news").delete().eq("id", id);
  if (error) throw error;
  await revalidatePublicData();
  return true;
}

export async function getPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching partners from Supabase:", error);
    return [];
  }
  return (data ?? []).map((row) => mapPartner(row as DatabaseRow));
}

export async function createPartner(partner: Omit<Partner, "id">): Promise<Partner> {
  const { data, error } = await requireSupabase()
    .from("partners")
    .insert([{ name: partner.name, logo: partner.logo || null, link: partner.link || null }])
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapPartner(data as DatabaseRow);
}

export async function updatePartner(id: string | number, partner: Omit<Partner, "id">): Promise<Partner> {
  const { data, error } = await requireSupabase()
    .from("partners")
    .update({ name: partner.name, logo: partner.logo || null, link: partner.link || null })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await revalidatePublicData();
  return mapPartner(data as DatabaseRow);
}

export async function deletePartner(id: string | number): Promise<boolean> {
  const { error } = await requireSupabase().from("partners").delete().eq("id", id);
  if (error) throw error;
  await revalidatePublicData();
  return true;
}

export async function getActiveProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching active products from Supabase:", error);
    return [];
  }
  return (data ?? []).map((row) => mapProduct(row as DatabaseRow));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);
  if (isUuid) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", slug)
      .maybeSingle();
    if (error) {
      console.error("Error fetching product from Supabase:", error);
      return null;
    }
    if (data) return mapProduct(data as DatabaseRow);
  }

  const products = await getActiveProducts();
  return products.find((product) => {
    const normalizedName = product.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return product.slug === slug || normalizedName === slug;
  }) ?? null;
}
