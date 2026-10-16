import { getSetting } from "./adminDbService";
import {
  normalizeHomeBrandStory,
  type HomeBrandStory,
} from "./homeBrandStory";

export async function getHomeBrandStory(): Promise<HomeBrandStory> {
  try {
    const setting = await getSetting("home_brand_story");
    const savedValue: unknown = setting?.data ?? setting?.value;
    const parsedValue =
      typeof savedValue === "string" ? JSON.parse(savedValue) : savedValue;

    return normalizeHomeBrandStory(parsedValue);
  } catch (error) {
    console.error("Error fetching home brand story:", error);
    return normalizeHomeBrandStory(null);
  }
}
