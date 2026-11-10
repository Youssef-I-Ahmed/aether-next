import Script from 'next/script';
import { notFound, redirect } from 'next/navigation';
import { getNotFoundPage, getPage, pageMetadata, pathFor } from '../lib/content.js';
import { absoluteUrl, favicon } from '../lib/site.js';

export function SiteDocument({ language, children }) {
  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        {children}
        <Script src="/clone.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

function PageMarkup({ page, home = false }) {
  return (
    <>
      {page.stylesheets.map((href) => <link key={href} rel="stylesheet" href={href} precedence="aether" />)}
      <div className={home ? 'aether-home' : undefined} dangerouslySetInnerHTML={{ __html: page.body }} />
      {home && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AETHER',
              url: absoluteUrl('/'),
              logo: absoluteUrl(favicon),
            }).replaceAll('<', '\\u003c'),
          }} />
          <Script src="/scene.js" strategy="afterInteractive" />
        </>
      )}
    </>
  );
}

export async function SitePage({ language, params }) {
  const { slug } = await params;
  const path = pathFor(language, slug);
  if (path === '/try' || path === '/en/try') redirect(pathFor(language, ['meeting']));
  const page = getPage(path);
  if (!page) notFound();
  return <PageMarkup page={page} home={path === '/' || path === '/en'} />;
}

export async function siteMetadata(language, params) {
  const { slug } = await params;
  return pageMetadata(pathFor(language, slug));
}

export function SiteNotFound({ language }) {
  return <PageMarkup page={getNotFoundPage(language)} />;
}

export const layoutMetadata = {
  title: 'AETHER',
  icons: { icon: { url: favicon, type: 'image/svg+xml', sizes: 'any' } },
};
