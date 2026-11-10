import { staticParams } from '../../../../lib/content.js';
import { SitePage, siteMetadata } from '../../../site-document.jsx';

export const generateStaticParams = () => staticParams('en');
export const generateMetadata = ({ params }) => siteMetadata('en', params);

export default function Page({ params }) {
  return <SitePage language="en" params={params} />;
}
