import { staticParams } from '../../../lib/content.js';
import { SitePage, siteMetadata } from '../../site-document.jsx';

export const generateStaticParams = () => staticParams('ar');
export const generateMetadata = ({ params }) => siteMetadata('ar', params);

export default function Page({ params }) {
  return <SitePage language="ar" params={params} />;
}
