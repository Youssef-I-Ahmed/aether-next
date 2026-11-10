const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const configuredOrigin = process.env.AETHER_SITE_URL ||
  (productionHost ? `https://${productionHost}` : 'http://127.0.0.1:4173');

export const siteOrigin = new URL(configuredOrigin).origin;
export const allowIndexing = process.env.VERCEL_ENV === 'production' ||
  (!process.env.VERCEL_ENV && Boolean(process.env.AETHER_SITE_URL));
export const favicon = '/assets/reference/aether-favicon.svg?v=2';

export function absoluteUrl(path) {
  return new URL(path, siteOrigin).href;
}
