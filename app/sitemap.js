import { allPaths, localizedUrls } from '../lib/content.js';
import { absoluteUrl } from '../lib/site.js';

export default function sitemap() {
  return allPaths().map((path) => ({
    url: absoluteUrl(path),
    alternates: { languages: localizedUrls(path) },
  }));
}
