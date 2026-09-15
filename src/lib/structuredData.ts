import { COMPANY_INFO } from '../data/companyData';
import { seoUrl } from '../components/SEO';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_INFO.name,
  legalName: COMPANY_INFO.legalName,
  alternateName: COMPANY_INFO.legalNameShort,
  url: seoUrl('/'),
  logo: seoUrl('/favicon.svg'),
  description: COMPANY_INFO.description,
  telephone: `+84${COMPANY_INFO.hotline.replace(/\D/g, '').replace(/^0/, '')}`,
  email: COMPANY_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY_INFO.addressMain,
    addressCountry: 'VN',
  },
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: seoUrl(item.path),
    })),
  };
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: seoUrl(path),
    inLanguage: 'vi-VN',
    isPartOf: { '@type': 'WebSite', name: COMPANY_INFO.name, url: seoUrl('/') },
  };
}
