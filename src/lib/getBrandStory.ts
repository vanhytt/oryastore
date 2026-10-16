// Server-side utility to fetch brand story data
import { getSetting } from './adminDbService';
import { isRecord } from './footerSettings';

export interface BrandStoryData {
  hero: {
    badge: string;
    mainHeading: string;
    description1: string;
    description2: string;
    ctaButton1: { label: string; link: string };
    ctaButton2: { label: string; link: string };
    mainImage: string;
    badgeImage: { title: string; subtitle: string; image: string };
  };
  guidelines: {
    title: string;
    mission: { title: string; description: string };
    vision: { title: string; description: string };
    coreValues: Array<{ icon: string; title: string; description: string }>;
  };
  timeline: Array<{ period: string; title: string; description: string }>;
  quote: { text: string; author: string; position: string; signature: string };
  commitmentsHeader: { badge: string; title: string; description: string };
  commitments: Array<{ icon: string; number: string; title: string; description: string }>;
  factory: { title: string; description: string; highlights: Array<{ title: string; description: string }>; image: string };
  ctaBanner: { title: string; subtitle: string; buttonLabel: string; buttonLink: string };
}

const DEFAULT_BRAND_STORY: BrandStoryData = {
  hero: {
    badge: 'CÂU CHUYỆN',
    mainHeading: 'Khởi nguồn từ tình mẫu tử',
    description1: 'Orya không chỉ là một thương hiệu mỹ phẩm. Orya là lời hứa thiêng liêng của những người mẹ làm khoa học, mong muốn mang lại sự vỗ về dịu lành nhất cho làn da non nớt của con trẻ và vẻ đẹp rạng rỡ của mẹ.',
    description2: 'Xuất phát từ các nghiên cứu chuyên sâu về dược học thiên nhiên tại CVI Pharma, chúng tôi thấu hiểu từng tế bào da nhạy cảm cần gì để phát triển khỏe mạnh, tự nhiên mà không cần đến hóa chất nhân tạo độc hại.',
    ctaButton1: { label: 'Khám phá sản phẩm', link: '/san-pham' },
    ctaButton2: { label: 'Liên hệ tư vấn', link: '#contact' },
    mainImage: '/placeholder.jpg',
    badgeImage: { title: 'An toàn', subtitle: 'Thiên nhiên', image: '/placeholder.jpg' },
  },
  guidelines: {
    title: 'Kim chỉ nam',
    mission: { title: 'Sứ mệnh', description: 'Mang lại giải pháp chăm sóc da an toàn từ thiên nhiên' },
    vision: { title: 'Tầm nhìn', description: 'Trở thành thương hiệu mỹ phẩm thiên nhiên hàng đầu tại Việt Nam' },
    coreValues: [
      { icon: 'heart', title: 'Tình yêu thương', description: 'Chúng tôi yêu thương mỗi gia đình' },
      { icon: 'leaf', title: 'Thiên nhiên', description: 'Sử dụng nguyên liệu từ thiên nhiên' },
      { icon: 'shield', title: 'An toàn', description: 'Đảm bảo an toàn tuyệt đối' },
    ],
  },
  timeline: [
    { period: '2020', title: 'Thành lập', description: 'Orya được sáng lập bởi các chuyên gia dược học' },
  ],
  quote: {
    text: 'Mỗi sản phẩm Orya là sự kết tinh từ tình yêu thương và khoa học hiện đại',
    author: 'Founder',
    position: 'CEO Orya',
    signature: '',
  },
  commitmentsHeader: {
    badge: 'CAM KẾT VÀNG TỪ ORYA',
    title: 'Cam kết "5 KHÔNG" tuyệt đối',
    description: 'Làn da của trẻ sơ sinh mỏng hơn da người lớn 5 lần, cần được bảo vệ tuyệt đối từ các hóa chất độc hại. Orya cam kết 5 KHÔNG trong mọi sản phẩm:',
  },

  commitments: [
    { icon: 'check', number: '01', title: 'An toàn', description: 'Không chứa hóa chất độc hại' },
  ],
  factory: {
    title: 'Nhà máy sản xuất',
    description: 'Được sản xuất tại các nhà máy có chứng chỉ quốc tế',
    highlights: [
      { title: 'Hệ thống phòng sạch chuẩn ISO', description: 'Đảm bảo môi trường vô trùng tuyệt đối trong quá trình pha chế và đóng gói sản phẩm.' },
    ],
    image: '/placeholder.jpg',
  },
  ctaBanner: {
    title: 'Nâng niu từng giây phút ngọt ngào bên con',
    subtitle: 'Chọn sự an tâm tuyệt đối cho con yêu ngay hôm nay',
    buttonLabel: 'Xem dòng sản phẩm',
    buttonLink: '/san-pham',
  },
};

export async function getBrandStory(): Promise<BrandStoryData> {
  try {
    const setting = await getSetting('brand_story');
    if (setting?.data && typeof setting.data === 'object') {
      // Merge with defaults to ensure all fields exist
      return {
        ...DEFAULT_BRAND_STORY,
        ...setting.data,
        hero: { ...DEFAULT_BRAND_STORY.hero, ...(isRecord(setting.data.hero) ? setting.data.hero : {}) },
        guidelines: { ...DEFAULT_BRAND_STORY.guidelines, ...(isRecord(setting.data.guidelines) ? setting.data.guidelines : {}) },
        factory: { ...DEFAULT_BRAND_STORY.factory, ...(isRecord(setting.data.factory) ? setting.data.factory : {}) },
        ctaBanner: { ...DEFAULT_BRAND_STORY.ctaBanner, ...(isRecord(setting.data.ctaBanner) ? setting.data.ctaBanner : {}) },
      } as BrandStoryData;
    }
  } catch (err) {
    console.warn('Error fetching brand story:', err);
  }
  return DEFAULT_BRAND_STORY;
}
