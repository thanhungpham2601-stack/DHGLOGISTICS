import { Link, Navigate, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ContentPage, findContentPage, KNOWLEDGE_PAGES, SERVICE_PAGES } from '../data/seoContent';
import { SEO } from '../components/SEO';
import { AnswerBlock, Breadcrumbs, FAQSection, RelatedContent } from '../components/SeoContent';
import { breadcrumbSchema, webPageSchema } from '../lib/structuredData';

function SiteShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#eff0f4] text-slate-900"><header className="bg-[#f5f6f8] border-b border-slate-200"><div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-5"><Link to="/" className="font-black text-xl text-[#0b6fa8] tracking-wide">DHG TRANSPORT</Link><nav aria-label="Điều hướng chính" className="flex gap-4 text-sm font-bold"><Link to="/dich-vu" className="hover:text-[#0b6fa8]">Dịch vụ</Link><Link to="/du-an" className="hover:text-[#0b6fa8]">Dự án</Link><Link to="/kien-thuc" className="hover:text-[#0b6fa8]">Kiến thức</Link><a href="/#contact" className="hover:text-[#0b6fa8]">Liên hệ</a></nav></div></header><main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">{children}</main><footer className="border-t border-slate-200 py-7 text-center text-sm text-slate-600">© {new Date().getFullYear()} {COMPANY_INFO.legalNameShort} · <a className="text-[#0b6fa8] hover:underline" href={`tel:${COMPANY_INFO.hotline}`}>{COMPANY_INFO.hotlineFormatted}</a></footer></div>;
}

function LinkList({ heading, pages, base }: { heading: string; pages: ContentPage[]; base: string }) {
  const description = `Danh mục ${heading.toLowerCase()} của DHG Transport.`;
  return <SiteShell><SEO title={`${heading} | DHG Transport`} description={description} path={base} structuredData={[webPageSchema(heading, description, base), breadcrumbSchema([{ name: 'Trang chủ', path: '/' }, { name: heading, path: base }])]} /><Breadcrumbs items={[{ label: heading }]} /><h1 className="text-4xl sm:text-5xl font-black font-heading">{heading}</h1><p className="mt-5 text-lg leading-8 text-slate-700">Tổng hợp thông tin để khách hàng tìm hiểu và chuẩn bị yêu cầu vận chuyển phù hợp với từng dự án.</p><div className="mt-9 grid gap-4">{pages.map((page) => <Link key={page.slug} to={`${base}/${page.slug}`} className="block bg-white border border-slate-200 p-6 hover:border-[#1ba8e8] hover:shadow-md"><h2 className="text-xl font-bold text-slate-900">{page.title}</h2><p className="mt-2 text-slate-700 leading-7">{page.description}</p><span className="mt-3 inline-block text-sm font-bold text-[#0b6fa8]">Xem chi tiết →</span></Link>)}</div></SiteShell>;
}

function ContentDetail({ page, kind }: { page: ContentPage; kind: 'service' | 'knowledge' }) {
  const base = kind === 'service' ? '/dich-vu' : '/kien-thuc';
  const label = kind === 'service' ? 'Dịch vụ' : 'Kiến thức';
  const path = `${base}/${page.slug}`;
  const related = page.relatedServices.map((slug) => {
    const service = findContentPage(SERVICE_PAGES, slug);
    return service ? { to: `/dich-vu/${service.slug}`, label: service.title } : null;
  }).filter((item): item is { to: string; label: string } => item !== null);
  const schema = kind === 'service'
    ? { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, url: `https://dhgtransport.vn${path}`, provider: { '@type': 'Organization', name: COMPANY_INFO.name, url: 'https://dhgtransport.vn/' }, areaServed: { '@type': 'Country', name: 'Việt Nam' } }
    : { '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, mainEntityOfPage: `https://dhgtransport.vn${path}`, author: { '@type': 'Organization', name: COMPANY_INFO.name }, publisher: { '@type': 'Organization', name: COMPANY_INFO.name } };
  return <SiteShell><SEO title={`${page.title} | DHG Transport`} description={page.description} path={path} type={kind === 'knowledge' ? 'article' : 'website'} structuredData={[schema, webPageSchema(page.title, page.description, path), breadcrumbSchema([{ name: 'Trang chủ', path: '/' }, { name: label, path: base }, { name: page.title, path }])]} /><Breadcrumbs items={[{ label, to: base }, { label: page.title }]} /><article><h1 className="text-4xl sm:text-5xl font-black font-heading leading-tight">{page.title}</h1><AnswerBlock question={page.question} answer={page.answer}>{page.details.map((detail) => <p key={detail} className="mt-3">{detail}</p>)}</AnswerBlock><FAQSection items={page.faqs} /><RelatedContent links={[...related, { to: '/du-an', label: 'Dự án tiêu biểu' }, { to: '/#contact', label: 'Yêu cầu tư vấn và báo giá' }]} /></article></SiteShell>;
}

export function ServicesIndexPage() { return <LinkList heading="Dịch vụ vận chuyển" pages={SERVICE_PAGES} base="/dich-vu" />; }
export function KnowledgeIndexPage() { return <LinkList heading="Kiến thức vận chuyển" pages={KNOWLEDGE_PAGES} base="/kien-thuc" />; }
export function ServicePage() { const page = findContentPage(SERVICE_PAGES, useParams().slug); return page ? <ContentDetail page={page} kind="service" /> : <Navigate to="/dich-vu" replace />; }
export function KnowledgePage() { const page = findContentPage(KNOWLEDGE_PAGES, useParams().slug); return page ? <ContentDetail page={page} kind="knowledge" /> : <Navigate to="/kien-thuc" replace />; }

export function ProjectsPage() { const path = '/du-an'; const description = 'Dự án tiêu biểu được DHG Transport công bố và cập nhật từ hệ thống quản lý dự án.'; return <SiteShell><SEO title="Dự án vận chuyển | DHG Transport" description={description} path={path} structuredData={[webPageSchema('Dự án vận chuyển', description, path), breadcrumbSchema([{ name: 'Trang chủ', path: '/' }, { name: 'Dự án', path }])]} /><Breadcrumbs items={[{ label: 'Dự án' }]} /><h1 className="text-4xl sm:text-5xl font-black font-heading">Dự án vận chuyển</h1><p className="mt-5 text-lg leading-8 text-slate-700">Các dự án tiêu biểu được hiển thị trên trang chủ được quản lý từ hệ thống dự án. Liên hệ DHG để trao đổi về nhu cầu có đặc tính tương tự.</p><RelatedContent links={[{ to: '/dich-vu/van-chuyen-hang-sieu-truong-sieu-trong', label: 'Dịch vụ vận chuyển hàng siêu trường siêu trọng' }, { to: '/#projects', label: 'Xem dự án đang công bố trên trang chủ' }, { to: '/#contact', label: 'Yêu cầu tư vấn dự án' }]} /></SiteShell>; }
