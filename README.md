# AETHER

Install dependencies with `npm ci`, then run `npm run dev -- --port 4173` and open `http://127.0.0.1:4173`. Run `npm run build` followed by `npm start -- --port 4173` to test the production build locally.

The Next.js App Router prerenders the Arabic and English routes from `content/site/`. Shared styles, client interactions, and image assets live in `public/`. Vercel production builds use the project's production domain for canonical URLs, language alternates, and `sitemap.xml`. Set `AETHER_SITE_URL` to an absolute origin to override that domain. Preview deployments disallow indexing.

The Arabic and English pages in `public/` describe AETHER as an Egypt-based software company serving the Middle East and North Africa. The nine country pages and the regional markets list are available alongside 430 local detail routes for services, buyer guides, and pricing. Pricing and buyer guides retain their section navigation, tables, and FAQs. Market-specific source material keeps its original geographic context. Missing routes return a localized HTTP 404 page.

Project prices use Egyptian pounds (EGP). The initial estimates use a fixed planning conversion of EGP 15 per Saudi riyal, rounded from the [Central Bank of Egypt exchange-rate reference](https://www.cbe.org.eg/en/economic-research/statistics/exchange-rates). These figures derive from the previous price list. Budget inputs share the same EGP tiers, and the written quote depends on the scope. Country-specific invoicing notes link to the [Egyptian Tax Authority](https://sdk.invoicing.eta.gov.eg/) and [Saudi ZATCA](https://www.zatca.gov.sa/en/E-Invoicing/Introduction/Pages/What-is-e-invoicing.aspx).

The quote and booking forms are demonstrations without a submission backend. The existing WhatsApp contact link is available for inquiries. Old AI demo links redirect to the booking page in their original language.

The public Fortune Code website supplied the visual reference and some media. REA browser captures informed the homepage structure and responsive behavior. The AETHER portfolio uses screenshots captured from the public project links, with the images in `public/assets/work/`. The local interaction code lives in `public/clone.js` and `public/scene.js`.

AETHER uses `#a384ff` for its primary brand color and `#6a38bd` for the light-theme accent. The wordmarks and favicon are SVGs in `public/assets/reference/`.
