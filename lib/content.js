import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse } from 'parse5';
import { cache } from 'react';
import { absoluteUrl, allowIndexing, siteOrigin } from './site.js';

const contentRoot = join(process.cwd(), 'content', 'site');
const assetRoot = join(process.cwd(), 'public');
const routes = new Map();

function collectRoutes(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) collectRoutes(filename);
    if (entry.name !== 'index.html') continue;
    const path = relative(contentRoot, directory).split(sep).join('/');
    routes.set(path ? `/${path}` : '/', filename);
  }
}

collectRoutes(contentRoot);

function englishPath(path) {
  return path === '/en' || path.startsWith('/en/');
}

export function pathFor(language, slug = []) {
  return '/' + (language === 'en' ? ['en', ...slug] : slug).join('/');
}

export function allPaths() {
  return [...routes.keys()].sort();
}

export function staticParams(language) {
  const english = language === 'en';
  return allPaths()
    .filter((path) => englishPath(path) === english)
    .map((path) => ({ slug: path.split('/').slice(english ? 2 : 1).filter(Boolean) }));
}

export function localizedUrls(path) {
  const arabic = englishPath(path) ? path.slice(3) || '/' : path;
  const english = arabic === '/' ? '/en' : `/en${arabic}`;
  const languages = {};
  if (routes.has(arabic)) {
    languages.ar = absoluteUrl(arabic);
    languages['x-default'] = languages.ar;
  }
  if (routes.has(english)) languages.en = absoluteUrl(english);
  return languages;
}

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

function localAsset(value) {
  return value?.startsWith('/assets/') && !value.includes('..');
}

function parseDocument(filename) {
  const source = readFileSync(filename, 'utf8');
  const document = parse(source, { sourceCodeLocationInfo: true });
  const html = document.childNodes.find((node) => node.tagName === 'html');
  const head = html.childNodes.find((node) => node.tagName === 'head');
  const body = html.childNodes.find((node) => node.tagName === 'body');
  const { startTag, endTag } = body.sourceCodeLocation;
  const metadata = new Map();
  const stylesheets = [];
  let title;

  for (const child of head.childNodes) {
    if (child.tagName === 'title') title = child.childNodes[0]?.value;
    if (child.tagName === 'meta') {
      metadata.set(attribute(child, 'name') || attribute(child, 'property'), attribute(child, 'content'));
    }
    if (child.tagName === 'link' && attribute(child, 'rel') === 'stylesheet') {
      stylesheets.push(attribute(child, 'href'));
    }
  }

  return {
    body: source.slice(startTag.endOffset, endTag.startOffset),
    title,
    description: metadata.get('description') || metadata.get('og:description'),
    image: metadata.get('og:image'),
    stylesheets,
  };
}

export const getPage = cache((path) => {
  const filename = routes.get(path);
  return filename ? parseDocument(filename) : null;
});

export const getNotFoundPage = cache((language) => {
  return parseDocument(join(contentRoot, ...(language === 'en' ? ['en'] : []), '404.html'));
});

export function pageMetadata(path) {
  const page = getPage(path);
  if (!page) return { robots: { index: false, follow: false } };

  const locale = englishPath(path) ? 'en_US' : 'ar_EG';
  const title = page.title || 'AETHER';
  const project = /^(?:\/en)?\/projects\/([\w-]+)$/.exec(path);
  const projectImage = project && `/assets/work/${project[1]}.jpg`;
  const image = projectImage || (localAsset(page.image) && existsSync(join(assetRoot, page.image)) ? page.image : null);
  const images = image ? [absoluteUrl(image)] : undefined;

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description: page.description,
    robots: { index: allowIndexing, follow: allowIndexing },
    alternates: { canonical: absoluteUrl(path), languages: localizedUrls(path) },
    openGraph: {
      type: 'website',
      title,
      description: page.description,
      url: absoluteUrl(path),
      siteName: 'AETHER',
      locale,
      images,
    },
    twitter: { card: images ? 'summary_large_image' : 'summary', title, description: page.description, images },
  };
}
