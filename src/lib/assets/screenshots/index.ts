import erenshorThumb from './erenshor-thumb.webp';
import erenshorHero from './erenshor-hero.webp';
import ancientKingdomsThumb from './ancient-kingdoms-thumb.webp';
import ancientKingdomsHero from './ancient-kingdoms-hero.webp';
import personalWebsiteThumb from './personal-website-thumb.webp';
import personalWebsiteHero from './personal-website-hero.webp';
import tenManIdleThumb from './10-man-idle-thumb.webp';
import tenManIdleHero from './10-man-idle-hero.webp';

export const thumbnails: Record<string, string> = {
  erenshor: erenshorThumb,
  'ancient-kingdoms': ancientKingdomsThumb,
  'personal-website': personalWebsiteThumb,
  '10-man-idle': tenManIdleThumb
};

export const heroes: Record<string, string> = {
  erenshor: erenshorHero,
  'ancient-kingdoms': ancientKingdomsHero,
  'personal-website': personalWebsiteHero,
  '10-man-idle': tenManIdleHero
};
