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

export async function getBrandStory(): Promise<BrandStoryData | null> {
  try {
    const setting = await getSetting('brand_story');
    const savedValue: unknown = setting?.data ?? setting?.value;
    const parsedValue = typeof savedValue === 'string'
      ? JSON.parse(savedValue)
      : savedValue;

    return isRecord(parsedValue) ? parsedValue as unknown as BrandStoryData : null;
  } catch (error) {
    console.error('Error fetching brand story:', error);
    return null;
  }
}
