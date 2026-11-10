import { layoutMetadata, SiteDocument } from '../site-document.jsx';

export const metadata = layoutMetadata;

export default function ArabicLayout({ children }) {
  return <SiteDocument language="ar">{children}</SiteDocument>;
}
