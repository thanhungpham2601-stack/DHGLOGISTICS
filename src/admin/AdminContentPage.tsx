import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

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

const SELECT = 'id, type, slug, title, description, question, answer, details, related_services, faqs, sort_order, is_active';

const BLANK_FORM = {
  slug: '',
  title: '',
  description: '',
  question: '',
  answer: '',
  details: [] as string[],
  related_services: [] as string[],
  faqs: [] as Array<{ question: string; answer: string }>,
};

const TABS: { value: 'service' | 'knowledge'; label: string }[] = [
  { value: 'service', label: 'Dịch vụ (/dich-vu)' },
  { value: 'knowledge', label: 'Kiến thức (/kien-thuc)' },
];

export function AdminContentPage() {
  const [items, setItems] = useState<ContentPageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [tab, setTab] = useState<'service' | 'knowledge'>('service');

  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('content_pages')
      .select(SELECT)
      .order('type', { ascending: true })
      .order('sort_order', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => items.filter((i) => i.type === tab), [items, tab]);
  const servicePages = useMemo(() => items.filter((i) => i.type === 'service'), [items]);

  const openNew = () => {
    setForm(BLANK_FORM);
    setEditingId('new');
  };

  const openEdit = (item: ContentPageRow) => {
    setForm({
      slug: item.slug,
      title: item.title,
      description: item.description,
      question: item.question,
      answer: item.answer,
      details: item.details ?? [],
      related_services: item.related_services ?? [],
      faqs: item.faqs ?? [],
    });
    setEditingId(item.id);
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(BLANK_FORM);
  };

  const toggleRelated = (slug: string) => {
    setForm((f) => ({
      ...f,
      related_services: f.related_services.includes(slug)
        ? f.related_services.filter((s) => s !== slug)
        : [...f.related_services, slug],
    }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.slug.trim() || !form.title.trim()) {
      setError('Cần có slug và tiêu đề trước khi lưu.');
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      type: tab,
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      question: form.question.trim(),
      answer: form.answer.trim(),
      details: form.details.map((d) => d.trim()).filter(Boolean),
      related_services: form.related_services,
      faqs: form.faqs
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
        .filter((f) => f.question && f.answer),
    };

    if (editingId === 'new') {
      const sameType = items.filter((i) => i.type === tab);
      const nextOrder = sameType.length ? Math.max(...sameType.map((i) => i.sort_order)) + 1 : 0;
      const { data, error } = await supabase
        .from('content_pages')
        .insert({ ...payload, sort_order: nextOrder, is_active: true })
        .select(SELECT)
        .single();
      if (error) {
        setError(error.message);
      } else if (data) {
        setItems((prev) => [...prev, data]);
        closeForm();
      }
    } else if (editingId) {
      const { error } = await supabase.from('content_pages').update(payload).eq('id', editingId);
      if (error) {
        setError(error.message);
      } else {
        setItems((prev) => prev.map((it) => (it.id === editingId ? { ...it, ...payload } : it)));
        closeForm();
      }
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    setSavingId(id);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, is_active } : it)));
    const { error } = await supabase.from('content_pages').update({ is_active }).eq('id', id);
    setSavingId(null);
    if (error) setError(error.message);
  };

  const removeItem = async (id: string) => {
    if (!confirm('Xóa trang nội dung này? Hành động không thể hoàn tác.')) return;
    const { error } = await supabase.from('content_pages').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= visible.length) return;
    const a = visible[index];
    const b = visible[target];
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === a.id) return { ...it, sort_order: b.sort_order };
        if (it.id === b.id) return { ...it, sort_order: a.sort_order };
        return it;
      }),
    );
    await Promise.all([
      supabase.from('content_pages').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('content_pages').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Nội dung SEO</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý nội dung hiển thị tại <code>/dich-vu</code> và <code>/kien-thuc</code>. Chỉ trang đang "Hiện" mới xuất bản công khai.
          </p>
        </div>
        {editingId === null && (
          <button
            onClick={openNew}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            Thêm trang
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTab(t.value);
              closeForm();
            }}
            className={`px-3 py-1.5 text-xs font-semibold border rounded-none ${
              tab === t.value ? 'bg-[#1ba8e8] text-white border-[#1ba8e8]' : 'bg-white text-slate-600 border-[#d8dbe2] hover:border-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-none px-3 py-2">
          {error}
        </div>
      )}

      {editingId !== null ? (
        <form onSubmit={submitForm} className="mt-6 bg-white border border-[#dbdfe5] rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              {editingId === 'new' ? 'Trang mới' : 'Sửa trang'} — {TABS.find((t) => t.value === tab)?.label}
            </h2>
            <button type="button" onClick={closeForm} className="p-1.5 rounded-none text-slate-500 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Slug (URL) *
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                required
                placeholder="vi-du-duong-dan-url"
                className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-normal text-slate-900 outline-none focus:border-[#1ba8e8]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Tiêu đề (H1) *
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-normal text-slate-900 outline-none focus:border-[#1ba8e8]"
              />
            </label>
          </div>

          <label className="text-xs font-semibold text-slate-700 space-y-1 block">
            Mô tả ngắn (meta description + hiển thị ở trang danh mục)
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-normal text-slate-900 outline-none focus:border-[#1ba8e8]"
            />
          </label>

          <label className="text-xs font-semibold text-slate-700 space-y-1 block">
            Câu hỏi chính (H2, dạng "X là gì?")
            <input
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-normal text-slate-900 outline-none focus:border-[#1ba8e8]"
            />
          </label>

          <label className="text-xs font-semibold text-slate-700 space-y-1 block">
            Câu trả lời chính
            <textarea
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-normal text-slate-900 outline-none focus:border-[#1ba8e8]"
            />
          </label>

          {/* Details */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700">Đoạn chi tiết bổ sung</span>
            {form.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <textarea
                  value={detail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, details: f.details.map((d, i) => (i === idx ? e.target.value : d)) }))
                  }
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, details: f.details.filter((_, i) => i !== idx) }))}
                  className="p-2 rounded-none text-red-500 hover:bg-red-50 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, details: [...f.details, ''] }))}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0b6fa8]"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm đoạn
            </button>
          </div>

          {/* FAQs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700">Câu hỏi thường gặp (FAQ)</span>
            {form.faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#e5e7ec] rounded-none p-3 space-y-2 bg-[#f5f6f8]">
                <div className="flex items-start gap-2">
                  <input
                    value={faq.question}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        faqs: f.faqs.map((it, i) => (i === idx ? { ...it, question: e.target.value } : it)),
                      }))
                    }
                    placeholder="Câu hỏi"
                    className="flex-1 px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm font-semibold text-slate-900 outline-none focus:border-[#1ba8e8]"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, i) => i !== idx) }))}
                    className="p-2 rounded-none text-red-500 hover:bg-red-100 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      faqs: f.faqs.map((it, i) => (i === idx ? { ...it, answer: e.target.value } : it)),
                    }))
                  }
                  rows={2}
                  placeholder="Câu trả lời"
                  className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] }))}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0b6fa8]"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm FAQ
            </button>
          </div>

          {/* Related services */}
          {servicePages.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">Dịch vụ liên quan (hiển thị link cuối trang)</span>
              <div className="flex flex-wrap gap-2">
                {servicePages
                  .filter((s) => s.slug !== form.slug)
                  .map((s) => (
                    <label
                      key={s.slug}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border text-xs cursor-pointer ${
                        form.related_services.includes(s.slug)
                          ? 'bg-[#1ba8e8]/10 border-[#1ba8e8] text-[#0b6fa8] font-semibold'
                          : 'bg-white border-[#d8dbe2] text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.related_services.includes(s.slug)}
                        onChange={() => toggleRelated(s.slug)}
                        className="accent-[#1ba8e8]"
                      />
                      {s.title}
                    </label>
                  ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e5e7ec]">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 rounded-none bg-[#e5e7ec] text-slate-700 font-semibold text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Lưu trang
            </button>
          </div>
        </form>
      ) : loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
        </div>
      ) : (
        <div className="space-y-2 mt-6">
          {visible.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 bg-white border border-[#dbdfe5] rounded-none p-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded-none text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Lên"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === visible.length - 1}
                  className="p-1 rounded-none text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Xuống"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">{item.title}</div>
                <div className="text-xs text-slate-500 truncate font-mono">/{tab === 'service' ? 'dich-vu' : 'kien-thuc'}/{item.slug}</div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 select-none whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={item.is_active}
                  onChange={(e) => toggleActive(item.id, e.target.checked)}
                  className="accent-[#1ba8e8]"
                />
                Hiện
              </label>

              {savingId === item.id && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}

              <button
                onClick={() => openEdit(item)}
                className="px-3 py-1.5 rounded-none bg-[#e8e8ee] text-slate-700 hover:text-slate-900 text-xs font-semibold"
              >
                Sửa
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-none text-red-500 hover:bg-red-50"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">Chưa có trang nào.</div>
          )}
        </div>
      )}
    </div>
  );
}
