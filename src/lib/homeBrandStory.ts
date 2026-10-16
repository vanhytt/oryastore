export interface HomeBrandStoryStat {
  value: string;
  label: string;
}

export interface HomeBrandStoryFeature {
  icon: string;
  title: string;
  description: string;
}

export interface HomeBrandStory {
  title: string;
  description: string;
  image_url: string;
  stats: HomeBrandStoryStat[];
  features: HomeBrandStoryFeature[];
  cta_text: string;
  cta_link: string;
}

export const DEFAULT_HOME_BRAND_STORY: HomeBrandStory = {
  title: "Orya — Nâng niu làn da mẹ & bé từ thiên nhiên",
  description:
    "Được nghiên cứu và phát triển bởi đội ngũ chuyên gia dược học hàng đầu tại CVI Pharma, Orya mang đến giải pháp chăm sóc da toàn diện, an toàn và hiệu quả cho mẹ bầu và trẻ sơ sinh. Mỗi sản phẩm là sự kết tinh từ tình yêu thương và khoa học hiện đại.",
  image_url: "/about.jpg",
  stats: [
    { value: "1M+", label: "Mẹ tin dùng" },
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "50+", label: "Sản phẩm" },
    { value: "98%", label: "Hài lòng" },
  ],
  features: [
    {
      icon: "heart",
      title: "Ra đời từ tình yêu thương",
      description:
        "Orya được sáng lập bởi các chuyên gia dược học và những người mẹ đam mê chăm sóc sức khỏe gia đình.",
    },
    {
      icon: "shield-check",
      title: "An toàn tuyệt đối",
      description:
        "Không chứa hóa chất độc hại, không SLS, không Paraben. Phù hợp với da nhạy cảm của mẹ bầu và trẻ sơ sinh.",
    },
    {
      icon: "award",
      title: "Chứng nhận quốc tế",
      description:
        "Đạt chứng nhận Vegan, tiêu chuẩn CGMP-ASEAN và nhiều chứng nhận quốc tế khác về chất lượng mỹ phẩm.",
    },
    {
      icon: "circle-check",
      title: "Được nghiên cứu lâm sàng",
      description:
        "Qua kiểm nghiệm lâm sàng tại các bệnh viện lớn, đảm bảo hiệu quả và an toàn với tỷ lệ hài lòng 98.5%.",
    },
  ],
  cta_text: "Tìm hiểu thêm về Orya",
  cta_link: "/thuong-hieu",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStats(value: unknown): HomeBrandStoryStat[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_BRAND_STORY.stats;
  return DEFAULT_HOME_BRAND_STORY.stats.map((fallback, index) => {
    const stat = value[index];
    return isRecord(stat)
      ? {
          value: typeof stat.value === "string" ? stat.value : fallback.value,
          label: typeof stat.label === "string" ? stat.label : fallback.label,
        }
      : fallback;
  });
}

function normalizeFeatures(value: unknown): HomeBrandStoryFeature[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_BRAND_STORY.features;
  return DEFAULT_HOME_BRAND_STORY.features.map((fallback, index) => {
    const feature = value[index];
    return isRecord(feature)
      ? {
          icon: typeof feature.icon === "string" ? feature.icon : fallback.icon,
          title: typeof feature.title === "string" ? feature.title : fallback.title,
          description:
            typeof feature.description === "string"
              ? feature.description
              : fallback.description,
        }
      : fallback;
  });
}

export function normalizeHomeBrandStory(value: unknown): HomeBrandStory {
  if (!isRecord(value)) return DEFAULT_HOME_BRAND_STORY;

  return {
    title:
      typeof value.title === "string" && value.title.trim()
        ? value.title
        : DEFAULT_HOME_BRAND_STORY.title,
    description:
      typeof value.description === "string" && value.description.trim()
        ? value.description
        : DEFAULT_HOME_BRAND_STORY.description,
    image_url:
      typeof value.image_url === "string" && value.image_url.trim()
        ? value.image_url
        : DEFAULT_HOME_BRAND_STORY.image_url,
    stats: normalizeStats(value.stats),
    features: normalizeFeatures(value.features),
    cta_text:
      typeof value.cta_text === "string" && value.cta_text.trim()
        ? value.cta_text
        : DEFAULT_HOME_BRAND_STORY.cta_text,
    cta_link:
      typeof value.cta_link === "string" && value.cta_link.trim()
        ? value.cta_link
        : DEFAULT_HOME_BRAND_STORY.cta_link,
  };
}
