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

export const EMPTY_FOOTER: FooterData = {
  brand: { logo_url: '', description: '', cgmp_text: '' },
  social: { facebook: '', shopee: '', tiktok: '', instagram: '', zalo: '', youtube: '' },
  products: [],
  info_links: [],
  policy_links: [],
  contact: { address: '', hotline: '', email: '', working_hours: '', tax_id: '' },
  footer_bottom: { copyright: '', disclaimer: '' },
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === 'string');
}

function normalizeLinks(value: unknown): FooterLink[] {
  if (!Array.isArray(value)) return [];

  return value.filter(isRecord).map((link) => ({
    name: firstString(link.name, link.label) ?? '',
    link: firstString(link.link, link.url) ?? '',
  }));
}

function normalizePolicies(value: unknown): FooterPolicy[] {
  if (!Array.isArray(value)) return [];

  return value.filter(isRecord).map((policy) => ({
    name: firstString(policy.name, policy.label) ?? '',
    link: firstString(policy.link, policy.url) ?? '',
    content: firstString(policy.content) ?? '',
  }));
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
      logo_url: firstString(brand.logo_url) ?? '',
      description: firstString(brand.description, source.about) ?? '',
      cgmp_text: firstString(brand.cgmp_text) ?? '',
    },
    social: {
      facebook: firstString(social.facebook) ?? '',
      shopee: firstString(social.shopee) ?? '',
      tiktok: firstString(social.tiktok) ?? '',
      instagram: firstString(social.instagram) ?? '',
      zalo: firstString(social.zalo) ?? '',
      youtube: firstString(social.youtube) ?? '',
    },
    products: normalizeLinks(source.products),
    info_links: normalizeLinks(source.info_links ?? links.info_menu),
    policy_links: normalizePolicies(source.policy_links ?? source.policies ?? links.policy_menu),
    contact: {
      address: firstString(contact.address, company.address) ?? '',
      hotline: firstString(contact.hotline, contact.phone, contact.zaloHotline, company.hotline, company.zaloHotline) ?? '',
      email: firstString(contact.email, company.email) ?? '',
      working_hours: firstString(contact.working_hours, company.working_hours) ?? '',
      tax_id: firstString(contact.tax_id, contact.taxId, company.tax_id, company.taxId) ?? '',
    },
    footer_bottom: {
      copyright: firstString(footerBottom.copyright, source.copyright, brand.copyright) ?? '',
      disclaimer: firstString(footerBottom.disclaimer) ?? '',
    },
  };
}
