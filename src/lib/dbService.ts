import { supabase, isSupabaseConfigured } from "./supabase";

export interface Product {
  id: string | number;
  name: string;
  category: string; // 'Chăm sóc mẹ bầu', 'Chăm sóc sau sinh', 'Tắm gội bé', 'Dưỡng ẩm bé' or 'mom' / 'baby'
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
  ingredients?: string[];
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

// Initial mock data for fallback/localstorage seeding
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Dầu rạn da Orya cho mẹ bầu",
    category: "mom",
    price: "350.000đ",
    priceValue: 350000,
    originalPrice: "450.000đ",
    originalPriceValue: 450000,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 120,
    description: "Dầu massage chuyên biệt ngăn ngừa và làm mờ các vết rạn da trong suốt thai kỳ và sau sinh. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé.",
    shortDescription: "Dầu massage ngăn ngừa và giảm rạn da cho mẹ bầu. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé.",
    image: "",
    benefits: [
      "Ngăn ngừa tối đa sự hình thành của các vết rạn nứt da mới.",
      "Hỗ trợ làm mờ các vết rạn nứt cũ, làm mờ thâm sạm và giúp đều màu da."
    ],
    ingredients: [
      "Dầu Hạnh Nhân Ngọt: Dưỡng ẩm sâu, tăng sản xuất collagen tự nhiên giúp da đàn hồi.",
      "Dầu Jojoba Hữu Cơ: Cân bằng tuyến bã nhờn, thấm cực nhanh."
    ],
    usage: [
      "Làm sạch và lau khô vùng da cần massage.",
      "Thoa đều và massage nhẹ nhàng 5-10 phút."
    ]
  },
  {
    id: 2,
    name: "Kem bôi ngực Orya sau sinh",
    category: "mom",
    price: "280.000đ",
    priceValue: 280000,
    originalPrice: "380.000đ",
    originalPriceValue: 380000,
    badge: "Mới",
    rating: 4.8,
    reviewsCount: 85,
    description: "Kem dưỡng da vùng ngực chuyên biệt dành cho phụ nữ sau sinh. Sản phẩm giúp dưỡng ẩm, làm dịu da ngực khô ráp, phục hồi và cải thiện độ săn chắc của bầu ngực.",
    shortDescription: "Kem dưỡng da ngực chuyên biệt sau sinh, giúp phục hồi và săn chắc da. Thành phần lành tính, không ảnh hưởng sữa mẹ.",
    image: "",
    benefits: ["Làm dịu nhanh tình trạng đau rát", "Cải thiện độ đàn hồi săn chắc"],
    ingredients: ["Mỡ cừu Lanolin", "Bơ hạt mỡ", "Cúc La Mã"],
    usage: ["Thoa đều núm vú và bầu ngực sau cữ bú"]
  },
  {
    id: 3,
    name: "Nước tắm gội Orya Kids",
    category: "baby",
    price: "195.000đ",
    priceValue: 195000,
    originalPrice: "250.000đ",
    originalPriceValue: 250000,
    badge: "Vegan",
    rating: 4.9,
    reviewsCount: 95,
    description: "Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS, không cồn, không gây kích ứng.",
    shortDescription: "Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS, không cồn, không gây kích ứng.",
    image: ""
  },
  {
    id: 4,
    name: "Dưỡng thể Orya Baby",
    category: "baby",
    price: "220.000đ",
    priceValue: 220000,
    originalPrice: "",
    badge: "",
    rating: 4.7,
    reviewsCount: 42,
    description: "Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày. Công thức nhẹ nhàng, thẩm thấu nhanh.",
    shortDescription: "Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày. Công thức nhẹ nhàng, thẩm thấu nhanh.",
    image: ""
  }
];

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "Bí quyết chăm sóc da bụng không vết rạn cho mẹ bầu",
    cover_image: "",
    excerpt: "Làm thế nào để duy trì làn da bụng căng mịn, không rạn nứt trong suốt 9 tháng thai kỳ? Hãy cùng Orya tìm hiểu những mẹo vàng dưới đây.",
    content: "Rạn da thai kỳ là nỗi lo lắng của hơn 90% mẹ bầu. Khi thai nhi lớn dần, da bụng phải kéo giãn nhanh chóng, làm đứt gãy các sợi collagen và elastin. Để phòng ngừa hiệu quả, mẹ nên bắt đầu thoa dầu rạn da từ tháng thứ 3 của thai kỳ. Massage đều đặn 2 lần mỗi ngày giúp da duy trì độ đàn hồi tự nhiên. Ngoài ra, việc uống đủ 2-2.5 lít nước mỗi ngày và duy trì chế độ dinh dưỡng giàu Vitamin C, Vitamin E cũng đóng vai trò vô cùng quan trọng.",
    author: "Bác sĩ Hồng Anh",
    status: "Published",
    published_date: "12/07/2026"
  },
  {
    id: 2,
    title: "Tại sao nên chọn sản phẩm hữu cơ thuần chay cho trẻ sơ sinh?",
    cover_image: "",
    excerpt: "Làn da trẻ sơ sinh mỏng hơn 5 lần so với da người lớn. Sử dụng sản phẩm hóa học dễ gây kích ứng, dị ứng da bé.",
    content: "Làn da nhạy cảm của bé yêu cần được nâng niu bằng những gì thuần khiết nhất. Các sản phẩm tắm gội hữu cơ (organic) và thuần chay (vegan) không chứa sulfat (SLS/SLES), paraben, cồn hay hương liệu nhân tạo. Việc này giúp bảo vệ màng ẩm tự nhiên của da bé, ngăn ngừa rôm sảy, hăm tã và chàm sữa một cách an toàn nhất.",
    author: "Dược sĩ Minh Thư",
    status: "Published",
    published_date: "14/07/2026"
  }
];

const initialPartners: Partner[] = [
  { id: 1, name: "Con Cưng", logo: "", link: "https://concung.com" },
  { id: 2, name: "KidsPlaza", logo: "", link: "https://kidsplaza.vn" },
  { id: 3, name: "Pharmacity", logo: "", link: "https://pharmacity.vn" },
  { id: 4, name: "Guardian", logo: "", link: "https://guardian.com.vn" },
  { id: 5, name: "An Khang", logo: "", link: "https://nhathuocankhang.com" },
  { id: 6, name: "Long Châu", logo: "", link: "https://nhathuoclongchau.com.vn" }
];

// Helper to get from local storage or initialize
function getLocalData<T>(key: string, initialData: T[]): T[] {
  if (typeof window === "undefined") return initialData;
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(raw);
}

function saveLocalData<T>(key: string, data: T[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}

/* ==================== PRODUCTS CRUD ==================== */

async function withSupabaseTimeout<T>(promise: PromiseLike<T>, fallback: T, timeoutMs = 2500): Promise<T> {
  return Promise.race([
    promise.then((result) => result),
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), timeoutMs);
    }),
  ]);
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const result = await withSupabaseTimeout(
        supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .then(({ data, error }) => {
            if (error) {
              throw error;
            }
            return data || [];
          }),
        [],
      );

      if (result.length > 0) {
        return result.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          priceValue: p.price_value || 0,
          originalPrice: p.original_price || "",
          originalPriceValue: p.original_price_value || 0,
          badge: p.badge || "",
          rating: p.rating || 5,
          reviewsCount: p.reviews_count || 0,
          description: p.description || "",
          shortDescription: p.short_description || "",
          image: p.image || "",
          image_url: p.image_url || p.image || "",
          images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
          primaryImage: p.primary_image || p.image || "",
          slug: p.slug || "",
          brand: p.brand || "",
          is_active: p.is_active,
          isActive: p.is_active,
          colors: p.colors || ["from-[#F5E6D3] to-[#E5C9A6]", "from-[#EAF2E8] to-[#C2DCBE]"],
          benefits: p.benefits || [],
          ingredients: p.ingredients || [],
          usage: p.usage || []
        }));
      }
    } catch (error) {
      console.error("Supabase error getting products, falling back to LocalStorage:", error);
    }
  }
  return getLocalData<Product>("orya_products", initialProducts);
}

export async function createProduct(prod: Omit<Product, "id">): Promise<Product> {
  const newProduct = {
    ...prod,
    id: Date.now().toString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: prod.name,
          category: prod.category,
          price: prod.price,
          price_value: prod.priceValue,
          original_price: prod.originalPrice,
          original_price_value: prod.originalPriceValue,
          badge: prod.badge,
          rating: prod.rating,
          reviews_count: prod.reviewsCount,
          description: prod.description,
          short_description: prod.shortDescription,
          image: prod.primaryImage || prod.images?.[0] || prod.image || null,
          images: prod.images || (prod.image ? [prod.image] : []),
          primary_image: prod.primaryImage || prod.images?.[0] || prod.image || null,
          benefits: prod.benefits,
          ingredients: prod.ingredients,
          usage: prod.usage
        }
      ])
      .select();
    
    if (!error && data && data[0]) {
      return {
        ...data[0],
        id: data[0].id,
        priceValue: data[0].price_value,
        originalPrice: data[0].original_price,
        originalPriceValue: data[0].original_price_value,
        reviewsCount: data[0].reviews_count,
        shortDescription: data[0].short_description
      };
    }
    console.error("Supabase error creating product, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Product>("orya_products", initialProducts);
  list.unshift(newProduct);
  saveLocalData("orya_products", list);
  return newProduct;
}

export async function updateProduct(id: string | number, prod: Omit<Product, "id">): Promise<Product> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .update({
        name: prod.name,
        category: prod.category,
        price: prod.price,
        price_value: prod.priceValue,
        original_price: prod.originalPrice,
        original_price_value: prod.originalPriceValue,
        badge: prod.badge,
        rating: prod.rating,
        reviews_count: prod.reviewsCount,
        description: prod.description,
        short_description: prod.shortDescription,
        image: prod.primaryImage || prod.images?.[0] || prod.image || null,
        images: prod.images || (prod.image ? [prod.image] : []),
        primary_image: prod.primaryImage || prod.images?.[0] || prod.image || null,
        benefits: prod.benefits,
        ingredients: prod.ingredients,
        usage: prod.usage
      })
      .eq("id", id)
      .select();
    
    if (!error && data && data[0]) {
      return {
        ...data[0],
        id: data[0].id,
        priceValue: data[0].price_value,
        originalPrice: data[0].original_price,
        originalPriceValue: data[0].original_price_value,
        reviewsCount: data[0].reviews_count,
        shortDescription: data[0].short_description
      };
    }
    console.error("Supabase error updating product, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Product>("orya_products", initialProducts);
  const index = list.findIndex((item) => item.id.toString() === id.toString());
  if (index !== -1) {
    list[index] = { ...prod, id };
    saveLocalData("orya_products", list);
    return list[index];
  }
  throw new Error("Product not found");
}

export async function deleteProduct(id: string | number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase error deleting product, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Product>("orya_products", initialProducts);
  const filtered = list.filter((item) => item.id.toString() !== id.toString());
  saveLocalData("orya_products", filtered);
  return true;
}


/* ==================== NEWS CRUD ==================== */

export async function getNews(): Promise<NewsItem[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data;
    }
    console.error("Supabase error getting news, falling back to LocalStorage:", error);
  }
  return getLocalData<NewsItem>("orya_news", initialNews);
}

export async function createNews(news: Omit<NewsItem, "id" | "published_date">): Promise<NewsItem> {
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
  
  const newNews: NewsItem = {
    ...news,
    id: Date.now().toString(),
    published_date: dateStr
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("news")
      .insert([
        {
          title: news.title,
          cover_image: news.cover_image,
          content: news.content,
          excerpt: news.excerpt,
          author: news.author,
          status: news.status,
          published_date: dateStr
        }
      ])
      .select();
    
    if (!error && data && data[0]) {
      return data[0];
    }
    console.error("Supabase error creating news, falling back to LocalStorage:", error);
  }

  const list = getLocalData<NewsItem>("orya_news", initialNews);
  list.unshift(newNews);
  saveLocalData("orya_news", list);
  return newNews;
}

export async function updateNews(id: string | number, news: Omit<NewsItem, "id" | "published_date">): Promise<NewsItem> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("news")
      .update({
        title: news.title,
        cover_image: news.cover_image,
        content: news.content,
        excerpt: news.excerpt,
        author: news.author,
        status: news.status
      })
      .eq("id", id)
      .select();
    
    if (!error && data && data[0]) {
      return data[0];
    }
    console.error("Supabase error updating news, falling back to LocalStorage:", error);
  }

  const list = getLocalData<NewsItem>("orya_news", initialNews);
  const index = list.findIndex((item) => item.id.toString() === id.toString());
  if (index !== -1) {
    const existingDate = list[index].published_date;
    list[index] = { ...news, id, published_date: existingDate };
    saveLocalData("orya_news", list);
    return list[index];
  }
  throw new Error("News item not found");
}

export async function deleteNews(id: string | number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase error deleting news, falling back to LocalStorage:", error);
  }

  const list = getLocalData<NewsItem>("orya_news", initialNews);
  const filtered = list.filter((item) => item.id.toString() !== id.toString());
  saveLocalData("orya_news", filtered);
  return true;
}


/* ==================== PARTNERS CRUD ==================== */

export async function getPartners(): Promise<Partner[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data;
    }
    console.error("Supabase error getting partners, falling back to LocalStorage:", error);
  }
  return getLocalData<Partner>("orya_partners", initialPartners);
}

export async function createPartner(partner: Omit<Partner, "id">): Promise<Partner> {
  const newPartner: Partner = {
    ...partner,
    id: Date.now().toString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("partners")
      .insert([
        {
          name: partner.name,
          logo: partner.logo,
          link: partner.link
        }
      ])
      .select();
    
    if (!error && data && data[0]) {
      return data[0];
    }
    console.error("Supabase error creating partner, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Partner>("orya_partners", initialPartners);
  list.unshift(newPartner);
  saveLocalData("orya_partners", list);
  return newPartner;
}

export async function updatePartner(id: string | number, partner: Omit<Partner, "id">): Promise<Partner> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("partners")
      .update({
        name: partner.name,
        logo: partner.logo,
        link: partner.link
      })
      .eq("id", id)
      .select();
    
    if (!error && data && data[0]) {
      return data[0];
    }
    console.error("Supabase error updating partner, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Partner>("orya_partners", initialPartners);
  const index = list.findIndex((item) => item.id.toString() === id.toString());
  if (index !== -1) {
    list[index] = { ...partner, id };
    saveLocalData("orya_partners", list);
    return list[index];
  }
  throw new Error("Partner not found");
}

export async function deletePartner(id: string | number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase error deleting partner, falling back to LocalStorage:", error);
  }

  const list = getLocalData<Partner>("orya_partners", initialPartners);
  const filtered = list.filter((item) => item.id.toString() !== id.toString());
  saveLocalData("orya_partners", filtered);
  return true;
}

export async function getActiveProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const result = await withSupabaseTimeout(
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .then(({ data, error }) => {
            if (error) {
              throw error;
            }
            return data || [];
          }),
        [],
      );

      if (result.length > 0) {
        return result.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          priceValue: p.price_value || 0,
          originalPrice: p.original_price || "",
          originalPriceValue: p.original_price_value || 0,
          badge: p.badge || "",
          rating: p.rating || 5,
          reviewsCount: p.reviews_count || 0,
          description: p.description || "",
          shortDescription: p.short_description || "",
          image: p.image || "",
          image_url: p.image_url || p.image || "",
          images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
          primaryImage: p.primary_image || p.image || "",
          slug: p.slug || "",
          brand: p.brand || "",
          is_active: p.is_active,
          isActive: p.is_active,
          colors: p.colors || ["from-[#F5E6D3] to-[#E5C9A6]", "from-[#EAF2E8] to-[#C2DCBE]"],
          benefits: p.benefits || [],
          ingredients: p.ingredients || [],
          usage: p.usage || []
        }));
      }
    } catch (error) {
      console.error("Supabase error getting active products, falling back to LocalStorage:", error);
    }
  }
  const all = await getProducts();
  return all.filter((p) => p.is_active !== false && p.isActive !== false);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);

    if (isUuid) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", slug)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          priceValue: data.price_value || 0,
          originalPrice: data.original_price || "",
          originalPriceValue: data.original_price_value || 0,
          badge: data.badge || "",
          rating: data.rating || 5,
          reviewsCount: data.reviews_count || 0,
          description: data.description || "",
          shortDescription: data.short_description || "",
          image: data.image || "",
          image_url: data.image_url || data.image || "",
          images: Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []),
          primaryImage: data.primary_image || data.image || "",
          slug: data.slug || "",
          brand: data.brand || "",
          is_active: data.is_active,
          isActive: data.is_active,
          colors: data.colors || ["from-[#F5E6D3] to-[#E5C9A6]", "from-[#EAF2E8] to-[#C2DCBE]"],
          benefits: data.benefits || [],
          ingredients: data.ingredients || [],
          usage: data.usage || []
        };
      }
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const fallback = data.find((product: Record<string, unknown>) => {
        const candidate = typeof product.name === "string" ? product.name : "";
        const normalized = candidate
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return normalized === slug;
      });

      if (fallback) {
        return {
          id: fallback.id,
          name: fallback.name,
          category: fallback.category,
          price: fallback.price,
          priceValue: fallback.price_value || 0,
          originalPrice: fallback.original_price || "",
          originalPriceValue: fallback.original_price_value || 0,
          badge: fallback.badge || "",
          rating: fallback.rating || 5,
          reviewsCount: fallback.reviews_count || 0,
          description: fallback.description || "",
          shortDescription: fallback.short_description || "",
          image: fallback.image || "",
          image_url: fallback.image_url || fallback.image || "",
          images: Array.isArray(fallback.images) ? fallback.images : (fallback.image ? [fallback.image] : []),
          primaryImage: fallback.primary_image || fallback.image || "",
          slug: fallback.slug || "",
          brand: fallback.brand || "",
          is_active: fallback.is_active,
          isActive: fallback.is_active,
          colors: fallback.colors || ["from-[#F5E6D3] to-[#E5C9A6]", "from-[#EAF2E8] to-[#C2DCBE]"],
          benefits: fallback.benefits || [],
          ingredients: fallback.ingredients || [],
          usage: fallback.usage || []
        };
      }
    }
  }

  const list = await getProducts();
  return list.find((p) => p.id.toString() === slug || p.slug === slug) || null;
}
