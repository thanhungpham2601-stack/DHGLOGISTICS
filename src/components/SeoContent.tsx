import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-8"><ol className="flex flex-wrap gap-2"><li><Link className="hover:text-[#0b6fa8]" to="/">Trang chủ</Link></li>{items.map((item) => <li key={item.label} className="flex gap-2"><span aria-hidden="true">›</span>{item.to ? <Link className="hover:text-[#0b6fa8]" to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

export function AnswerBlock({ question, answer, children }: { question: string; answer: string; children?: React.ReactNode }) {
  return <section className="py-7 border-t border-slate-200"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">{question}</h2><p className="mt-4 text-base leading-8 text-slate-700 font-medium">{answer}</p>{children && <div className="mt-4 text-slate-700 leading-7">{children}</div>}</section>;
}

export function FAQSection({ items }: { items: Array<{ question: string; answer: string }> }) {
  return <section className="py-7 border-t border-slate-200"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Câu hỏi thường gặp</h2><div className="mt-5 space-y-3">{items.map((item) => <details key={item.question} className="bg-white border border-slate-200 p-5"><summary className="font-bold text-slate-900 cursor-pointer">{item.question}</summary><p className="pt-3 leading-7 text-slate-700">{item.answer}</p></details>)}</div></section>;
}

export function RelatedContent({ links }: { links: Array<{ to: string; label: string }> }) {
  return <aside className="mt-8 p-6 bg-[#e7edf3] border-l-4 border-[#1ba8e8]"><h2 className="text-lg font-bold text-slate-900">Nội dung liên quan</h2><ul className="mt-3 space-y-2">{links.map((link) => <li key={link.to}><Link to={link.to} className="text-[#0b6fa8] hover:underline">{link.label}</Link></li>)}</ul></aside>;
}
