import { absoluteUrl, allowIndexing } from '../lib/site.js';

export default function robots() {
  if (!allowIndexing) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
