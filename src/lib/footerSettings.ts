export interface FooterLink {
  name: string;
  link: string;
}

export interface FooterPolicy extends FooterLink {
  content: string;
}

export interface FooterData {
  brand: { logo_url: string; description: string; cgmp_text: string };
  social: {
    facebook: string;
    shopee: string;
    tiktok: string;
    instagram: string;
    zalo: string;
    youtube: string;
  };
  products: FooterLink[];
  info_links: FooterLink[];
  policy_links: FooterPolicy[];
  contact: {
    address: string;
    hotline: string;
    email: string;
    working_hours?: string;
    tax_id?: string;
  };
  footer_bottom: { copyright: string; disclaimer: string };
}

export const DEFAULT_FOOTER: FooterData = {
  brand: {
    logo_url: '',
    description: 'Sản phẩm chăm sóc da chuyên biệt dành cho mẹ bầu và trẻ em. Được nghiên cứu và sản xuất bởi CVI Pharma — Đơn vị dược phẩm uy tín hàng đầu Việt Nam.',
    cgmp_text: 'Sản phẩm thuộc danh mục mỹ phẩm, được sản xuất tại nhà máy đạt chuẩn CGMP-ASEAN',
  },
  social: { facebook: '', shopee: '', tiktok: '', instagram: '', zalo: '', youtube: '' },
  products: [
    { name: 'Dầu rạn da mẹ bầu', link: '#' },
    { name: 'Kem bôi ngực sau sinh', link: '#' },
    { name: 'Nước tắm gội trẻ em', link: '#' },
    { name: 'Dưỡng thể sau sinh', link: '#' },
    { name: 'Kem chống nắng an toàn', link: '#' },
  ],
  info_links: [
    { name: 'Giới thiệu Orya', link: '/thuong-hieu' },
    { name: 'Câu chuyện thương hiệu', link: '/thuong-hieu' },
    { name: 'Chứng nhận chất lượng', link: '/#certificates' },
    { name: 'Tin tức & Sự kiện', link: '/tin-tuc' },
    { name: 'Liên hệ', link: '#contact' },
  ],
  policy_links: [
    {
      name: 'Chính sách bảo mật thông tin',
      link: 'chinh-sach-bao-mat',
      content: 'Orya sử dụng thông tin khách hàng cung cấp như họ tên, số điện thoại, địa chỉ và email để tiếp nhận, xác nhận và xử lý đơn hàng; hỗ trợ khách hàng khi cần thiết.\n\nThông tin được giới hạn sử dụng cho các mục đích trên và chỉ chia sẻ với đơn vị liên quan khi cần để hoàn tất dịch vụ hoặc khi pháp luật yêu cầu. Khách hàng có thể liên hệ Orya để hỏi về việc cập nhật hoặc xử lý thông tin cá nhân.',
    },
    {
      name: 'Quy chế hoạt động',
      link: 'quy-che-hoat-dong',
      content: 'Website Orya cung cấp thông tin về sản phẩm, chương trình bán hàng và các kênh hỗ trợ khách hàng. Khách hàng vui lòng cung cấp thông tin chính xác khi đặt hàng và kiểm tra lại sản phẩm, giá bán cùng điều kiện ưu đãi trước khi xác nhận.\n\nĐơn hàng được tiếp nhận và xác nhận qua thông tin liên hệ khách hàng cung cấp. Orya có thể cập nhật nội dung website để bảo đảm thông tin phù hợp với hoạt động kinh doanh và quy định hiện hành.',
    },
    {
      name: 'Chính sách đổi trả hàng',
      link: 'chinh-sach-doi-tra',
      content: 'Nếu sản phẩm nhận được bị lỗi, hư hỏng hoặc không đúng với đơn hàng, khách hàng vui lòng liên hệ Orya và cung cấp mã đơn hàng cùng hình ảnh tình trạng sản phẩm để được hướng dẫn.\n\nĐiều kiện, thời hạn và phương án đổi trả được xác nhận theo tình trạng thực tế của sản phẩm, thông tin đơn hàng và quy định áp dụng. Vui lòng liên hệ Orya trước khi gửi sản phẩm về.',
    },
    {
      name: 'Điều khoản sử dụng',
      link: 'dieu-khoan-su-dung',
      content: 'Khi truy cập website, khách hàng đồng ý sử dụng nội dung và dịch vụ đúng mục đích, không làm ảnh hưởng đến hoạt động của website hoặc quyền lợi hợp pháp của bên khác.\n\nThông tin trên website nhằm mục đích tham khảo về sản phẩm, không thay thế tư vấn y tế chuyên nghiệp. Orya có thể cập nhật nội dung và điều khoản để phù hợp với hoạt động của website và quy định hiện hành.',
    },
  ],
  contact: {
    address: '154 Hoàng Văn Thái, Phường Phương Liệt, Hà Nội',
    hotline: '0398126895',
    email: 'ecommerce.orya@gmail.com',
    working_hours: '',
    tax_id: '',
  },
  footer_bottom: {
    copyright: '© 2024 Orya - CVI Pharma. Tất cả các quyền được bảo lưu.',
    disclaimer: 'Thông tin trên website chỉ mang tính chất tham khảo, không thay thế tư vấn y tế chuyên nghiệp.',
  },
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === 'string');
}

function normalizeLinks(value: unknown, fallback: FooterLink[]): FooterLink[] {
  if (!Array.isArray(value)) return fallback;

  return value.filter(isRecord).map((link) => ({
    name: firstString(link.name, link.label) || '',
    link: firstString(link.link, link.url) || '',
  }));
}

function getDefaultPolicy(name: string, link: string): FooterPolicy | undefined {
  const exactMatch = DEFAULT_FOOTER.policy_links.find(
    (item) => item.link === link || item.name === name,
  );
  if (exactMatch) return exactMatch;

  const identifier = `${name} ${link}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd');

  if (identifier.includes('bao-mat') || identifier.includes('bao mat')) {
    return DEFAULT_FOOTER.policy_links[0];
  }
  if (identifier.includes('quy-che') || identifier.includes('quy che')) {
    return DEFAULT_FOOTER.policy_links[1];
  }
  if (identifier.includes('doi-tra') || identifier.includes('doi tra')) {
    return DEFAULT_FOOTER.policy_links[2];
  }
  if (identifier.includes('dieu-khoan') || identifier.includes('dieu khoan')) {
    return DEFAULT_FOOTER.policy_links[3];
  }
}

function normalizePolicies(value: unknown): FooterPolicy[] {
  if (!Array.isArray(value)) return DEFAULT_FOOTER.policy_links;

  return value.filter(isRecord).map((policy) => {
    const name = firstString(policy.name, policy.label) || '';
    const link = firstString(policy.link, policy.url) || '';
    const fallback = getDefaultPolicy(name, link);

    return {
      name,
      link,
      content:
        (typeof policy.content === 'string' && policy.content.length > 0
          ? policy.content
          : undefined) ||
        fallback?.content ||
        'Nội dung chính sách đang được cập nhật. Vui lòng liên hệ Orya để được hỗ trợ.',
    };
  });
}

export function normalizeFooterData(value: unknown): FooterData {
  const source = isRecord(value) ? value : {};
  const brand = isRecord(source.brand) ? source.brand : {};
  const social = isRecord(source.social) ? source.social : {};
  const contact = isRecord(source.contact) ? source.contact : {};
  const company = isRecord(source.company) ? source.company : {};
  const footerBottom = isRecord(source.footer_bottom) ? source.footer_bottom : {};
  const links = isRecord(source.links) ? source.links : {};

  return {
    brand: {
      logo_url: firstString(brand.logo_url) ?? DEFAULT_FOOTER.brand.logo_url,
      description: firstString(brand.description, source.about) ?? DEFAULT_FOOTER.brand.description,
      cgmp_text: firstString(brand.cgmp_text) ?? DEFAULT_FOOTER.brand.cgmp_text,
    },
    social: {
      facebook: firstString(social.facebook) ?? DEFAULT_FOOTER.social.facebook,
      shopee: firstString(social.shopee) ?? DEFAULT_FOOTER.social.shopee,
      tiktok: firstString(social.tiktok) ?? DEFAULT_FOOTER.social.tiktok,
      instagram: firstString(social.instagram) ?? DEFAULT_FOOTER.social.instagram,
      zalo: firstString(social.zalo) ?? DEFAULT_FOOTER.social.zalo,
      youtube: firstString(social.youtube) ?? DEFAULT_FOOTER.social.youtube,
    },
    products: normalizeLinks(source.products, DEFAULT_FOOTER.products),
    info_links: normalizeLinks(source.info_links ?? links.info_menu, DEFAULT_FOOTER.info_links).map((link) =>
      link.name === 'Chứng nhận chất lượng'
        ? { ...link, link: '/#certificates' }
        : link,
    ),
    policy_links: normalizePolicies(source.policy_links ?? source.policies ?? links.policy_menu),
    contact: {
      address: firstString(contact.address, company.address) ?? DEFAULT_FOOTER.contact.address,
      hotline: firstString(contact.hotline, contact.phone, contact.zaloHotline, company.hotline, company.zaloHotline) ?? DEFAULT_FOOTER.contact.hotline,
      email: firstString(contact.email, company.email) ?? DEFAULT_FOOTER.contact.email,
      working_hours: firstString(contact.working_hours, company.working_hours) ?? DEFAULT_FOOTER.contact.working_hours,
      tax_id: firstString(contact.tax_id, contact.taxId, company.tax_id, company.taxId) ?? DEFAULT_FOOTER.contact.tax_id,
    },
    footer_bottom: {
      copyright: firstString(footerBottom.copyright, source.copyright, brand.copyright) ?? DEFAULT_FOOTER.footer_bottom.copyright,
      disclaimer: firstString(footerBottom.disclaimer) ?? DEFAULT_FOOTER.footer_bottom.disclaimer,
    },
  };
}
