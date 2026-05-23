import erenshorThumb from './erenshor-thumb.webp';
import erenshorHero from './erenshor-hero.webp';
import ancientKingdomsThumb from './ancient-kingdoms-thumb.webp';
import ancientKingdomsHero from './ancient-kingdoms-hero.webp';
import u27GazetteThumb from './u27-gazette-thumb.webp';
import u27GazetteHero from './u27-gazette-hero.webp';
import personalWebsiteThumb from './personal-website-thumb.webp';
import personalWebsiteHero from './personal-website-hero.webp';
import tenManIdleThumb from './10-man-idle-thumb.webp';
import tenManIdleHero from './10-man-idle-hero.webp';
import hotreplThumb from './hotrepl-thumb.webp';
import hotreplHero from './hotrepl-hero.webp';

export const thumbnails: Record<string, string> = {
  erenshor: erenshorThumb,
  'ancient-kingdoms': ancientKingdomsThumb,
  'u27-gazette': u27GazetteThumb,
  'personal-website': personalWebsiteThumb,
  hotrepl: hotreplThumb,
  '10-man-idle': tenManIdleThumb
};

export const heroes: Record<string, string> = {
  erenshor: erenshorHero,
  'ancient-kingdoms': ancientKingdomsHero,
  'u27-gazette': u27GazetteHero,
  'personal-website': personalWebsiteHero,
  hotrepl: hotreplHero,
  '10-man-idle': tenManIdleHero
};
