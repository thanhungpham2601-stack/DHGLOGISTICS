import 'dotenv/config';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { CONTENT_PAGES_SELECT, mapContentPageRow, type ContentPage } from '../src/lib/contentPages.ts';

const SITE_URL = 'https://dhgtransport.vn';
const OUTPUT_DIR = process.env.PRERENDER_OUTPUT_DIR ?? 'dist';
const ORGANIZATION = { '@type': 'Organization', name: 'DHG TRANSPORT', url: `${SITE_URL}/` };

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY for prerender');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function loadContentPages(type: 'service' | 'knowledge'): Promise<ContentPage[]> {
  const { data, error } = await supabase
    .from('content_pages')
    .select(CONTENT_PAGES_SELECT)
    .eq('type', type)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(`Failed to load ${type} content pages: ${error.message}`);
  return (data ?? []).map(mapContentPageRow);
}

const SERVICE_PAGES = await loadContentPages('service');
const KNOWLEDGE_PAGES = await loadContentPages('knowledge');

type Route = {
  path: string;
  title: string;
  description: string;
  type?: 'article' | 'website';
  body: string;
  schema: Record<string, unknown>[];
};

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const schemaJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
const pageUrl = (path: string) => `${SITE_URL}${path}`;

function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: pageUrl(item.path) })) };
}

function webPage(name: string, description: string, path: string) {
  return { '@context': 'https://schema.org', '@type': 'WebPage', name, description, url: pageUrl(path), inLanguage: 'vi-VN', isPartOf: { '@type': 'WebSite', name: 'DHG TRANSPORT', url: `${SITE_URL}/` } };
}

function faqSchema(page: ContentPage) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
}

function layout(content: string) {
  return `<main id="seo-prerendered-content"><header><nav aria-label="Điều hướng chính"><a href="/">Trang chủ</a> · <a href="/dich-vu">Dịch vụ</a> · <a href="/du-an">Dự án</a> · <a href="/kien-thuc">Kiến thức</a> · <a href="/#contact">Liên hệ</a></nav></header>${content}<footer><p>DHG Transport · <a href="tel:0798600600">0798 600 600</a></p></footer></main>`;
}

function detailRoute(page: ContentPage, kind: 'service' | 'knowledge'): Route {
  const base = kind === 'service' ? '/dich-vu' : '/kien-thuc';
  const label = kind === 'service' ? 'Dịch vụ' : 'Kiến thức';
  const path = `${base}/${page.slug}`;
  const related = page.relatedServices
    .map((slug) => SERVICE_PAGES.find((service) => service.slug === slug))
    .filter((service): service is ContentPage => Boolean(service));
  const body = layout(`<nav aria-label="Breadcrumb"><a href="/">Trang chủ</a> › <a href="${base}">${label}</a> › <span aria-current="page">${escapeHtml(page.title)}</span></nav><article><h1>${escapeHtml(page.title)}</h1><section><h2>${escapeHtml(page.question)}</h2><p>${escapeHtml(page.answer)}</p>${page.details.map((detail) => `<p>${escapeHtml(detail)}</p>`).join('')}</section><section><h2>Câu hỏi thường gặp</h2>${page.faqs.map((faq) => `<section><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></section>`).join('')}</section><aside><h2>Nội dung liên quan</h2><ul>${related.map((service) => `<li><a href="/dich-vu/${service.slug}">${escapeHtml(service.title)}</a></li>`).join('')}<li><a href="/du-an">Dự án tiêu biểu</a></li><li><a href="/#contact">Yêu cầu tư vấn và báo giá</a></li></ul></aside></article>`);
  const primarySchema = kind === 'service'
    ? { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, url: pageUrl(path), provider: ORGANIZATION, areaServed: { '@type': 'Country', name: 'Việt Nam' } }
    : { '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, mainEntityOfPage: pageUrl(path), author: ORGANIZATION, publisher: ORGANIZATION };
  return { path, title: `${page.title} | DHG Transport`, description: page.description, type: kind === 'knowledge' ? 'article' : 'website', body, schema: [primarySchema, webPage(page.title, page.description, path), breadcrumbs([{ name: 'Trang chủ', path: '/' }, { name: label, path: base }, { name: page.title, path }]), faqSchema(page)] };
}

function indexRoute(path: '/dich-vu' | '/kien-thuc', heading: string, pages: ContentPage[]): Route {
  const description = `Danh mục ${heading.toLowerCase()} của DHG Transport.`;
  return { path, title: `${heading} | DHG Transport`, description, body: layout(`<nav aria-label="Breadcrumb"><a href="/">Trang chủ</a> › <span aria-current="page">${heading}</span></nav><article><h1>${heading}</h1><p>Tổng hợp thông tin để khách hàng tìm hiểu và chuẩn bị yêu cầu vận chuyển phù hợp với từng dự án.</p><section><h2>Chủ đề</h2><ul>${pages.map((page) => `<li><a href="${path}/${page.slug}">${escapeHtml(page.title)}</a><p>${escapeHtml(page.description)}</p></li>`).join('')}</ul></section></article>`), schema: [webPage(heading, description, path), breadcrumbs([{ name: 'Trang chủ', path: '/' }, { name: heading, path }])] };
}

const projectDescription = 'Dự án tiêu biểu được DHG Transport công bố và cập nhật từ hệ thống quản lý dự án.';
const routes: Route[] = [
  { path: '/', title: 'DHG Transport | Vận chuyển hàng siêu trường siêu trọng', description: 'DHG Transport cung cấp giải pháp vận chuyển hàng siêu trường siêu trọng, hàng quá khổ quá tải, máy móc công nghiệp và thiết bị dự án tại Việt Nam.', body: layout('<article><h1>DHG Transport</h1><p>Giải pháp vận chuyển hàng siêu trường siêu trọng, hàng quá khổ quá tải, máy móc công nghiệp và thiết bị dự án.</p><p><a href="/dich-vu">Khám phá dịch vụ vận chuyển</a> hoặc <a href="/#contact">yêu cầu tư vấn và báo giá</a>.</p></article>'), schema: [{ '@context': 'https://schema.org', '@type': 'Organization', name: 'DHG TRANSPORT', url: `${SITE_URL}/` }, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'DHG TRANSPORT', url: `${SITE_URL}/`, inLanguage: 'vi-VN' }, webPage('DHG Transport', 'Giải pháp vận chuyển hàng siêu trường siêu trọng, hàng quá khổ quá tải, máy móc công nghiệp và thiết bị dự án tại Việt Nam.', '/')] },
  indexRoute('/dich-vu', 'Dịch vụ vận chuyển', SERVICE_PAGES),
  indexRoute('/kien-thuc', 'Kiến thức vận chuyển', KNOWLEDGE_PAGES),
  ...SERVICE_PAGES.map((page) => detailRoute(page, 'service')),
  ...KNOWLEDGE_PAGES.map((page) => detailRoute(page, 'knowledge')),
  { path: '/du-an', title: 'Dự án vận chuyển | DHG Transport', description: projectDescription, body: layout('<nav aria-label="Breadcrumb"><a href="/">Trang chủ</a> › <span aria-current="page">Dự án</span></nav><article><h1>Dự án vận chuyển</h1><p>Các dự án tiêu biểu được hiển thị trên trang chủ được quản lý từ hệ thống dự án. Liên hệ DHG để trao đổi về nhu cầu có đặc tính tương tự.</p><p><a href="/dich-vu/van-chuyen-hang-sieu-truong-sieu-trong">Dịch vụ vận chuyển hàng siêu trường siêu trọng</a></p></article>'), schema: [webPage('Dự án vận chuyển', projectDescription, '/du-an'), breadcrumbs([{ name: 'Trang chủ', path: '/' }, { name: 'Dự án', path: '/du-an' }])] },
];

function replaceMeta(html: string, selector: RegExp, replacement: string) {
  return selector.test(html) ? html.replace(selector, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function renderHtml(template: string, route: Route) {
  const canonical = pageUrl(route.path);
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceMeta(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  html = replaceMeta(html, /<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="index,follow" />');
  html = replaceMeta(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = replaceMeta(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = replaceMeta(html, /<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${route.type ?? 'website'}" />`);
  html = replaceMeta(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replaceMeta(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = replaceMeta(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<script id="initial-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="initial-structured-data" type="application/ld+json">${schemaJson(route.schema)}</script>`);
  return html.replace(/<div id="root"><\/div>/, `<div id="root">${route.body}</div>`);
}

const template = await readFile(join(OUTPUT_DIR, 'index.html'), 'utf8');
await Promise.all(routes.map(async (route) => {
  const output = route.path === '/' ? join(OUTPUT_DIR, 'index.html') : join(OUTPUT_DIR, route.path.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderHtml(template, route));
}));

console.log(`Prerendered ${routes.length} public SEO routes.`);
