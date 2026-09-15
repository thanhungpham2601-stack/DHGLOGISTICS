export interface ContentPage {
  id: string;
  type: 'service' | 'knowledge';
  slug: string;
  title: string;
  description: string;
  question: string;
  answer: string;
  details: string[];
  relatedServices: string[];
  faqs: Array<{ question: string; answer: string }>;
  sortOrder: number;
  isActive: boolean;
}

interface ContentPageRow {
  id: string;
  type: 'service' | 'knowledge';
  slug: string;
  title: string;
  description: string;
  question: string;
  answer: string;
  details: string[];
  related_services: string[];
  faqs: Array<{ question: string; answer: string }>;
  sort_order: number;
  is_active: boolean;
}

export function mapContentPageRow(row: ContentPageRow): ContentPage {
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    title: row.title,
    description: row.description,
    question: row.question,
    answer: row.answer,
    details: row.details ?? [],
    relatedServices: row.related_services ?? [],
    faqs: row.faqs ?? [],
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export const CONTENT_PAGES_SELECT =
  'id, type, slug, title, description, question, answer, details, related_services, faqs, sort_order, is_active';

export function findContentPage(pages: ContentPage[], slug?: string) {
  return pages.find((page) => page.slug === slug);
}
