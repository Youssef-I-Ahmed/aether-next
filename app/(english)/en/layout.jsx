import { layoutMetadata, SiteDocument } from '../../site-document.jsx';

export const metadata = layoutMetadata;

export default function EnglishLayout({ children }) {
  return <SiteDocument language="en">{children}</SiteDocument>;
}
