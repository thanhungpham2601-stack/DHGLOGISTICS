import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Plus, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface ProjectRow {
  id: string;
  title: string;
  client_type: string;
  cargo: string;
  weight: string;
  dimension: string;
  route: string;
  highlight: string;
  image_url: string;
  image_position: string | null;
  gallery: string[];
  sort_order: number;
  is_active: boolean;
}

const BLANK_FORM = {
  title: '',
  client_type: '',
  cargo: '',
  weight: '',
  dimension: '',
  route: '',
  highlight: '',
  image_url: '',
  image_position: '',
  gallery: [] as string[],
};

async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('project-images').upload(path, file);
  if (error) throw error;
  return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
}

export function AdminProjectsPage() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, client_type, cargo, weight, dimension, route, highlight, image_url, image_position, gallery, sort_order, is_active')
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

  const openNew = () => {
    setForm(BLANK_FORM);
    setEditingId('new');
  };

  const openEdit = (item: ProjectRow) => {
    setForm({
      title: item.title,
      client_type: item.client_type,
      cargo: item.cargo,
      weight: item.weight,
      dimension: item.dimension,
      route: item.route,
      highlight: item.highlight,
      image_url: item.image_url,
      image_position: item.image_position ?? '',
      gallery: item.gallery ?? [],
    });
    setEditingId(item.id);
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(BLANK_FORM);
  };

  const handleMainImage = async (file: File) => {
    setUploadingMain(true);
    setError(null);
    try {
      const url = await uploadProjectImage(file);
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tải ảnh thất bại');
    } finally {
      setUploadingMain(false);
    }
  };

  const handleGalleryImages = async (files: FileList) => {
    setUploadingGallery(true);
    setError(null);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadProjectImage));
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...urls] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tải ảnh thất bại');
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (url: string) => {
    setForm((f) => ({ ...f, gallery: f.gallery.filter((g) => g !== url) }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image_url) {
      setError('Cần có tiêu đề và ảnh chính trước khi lưu.');
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      client_type: form.client_type.trim(),
      cargo: form.cargo.trim(),
      weight: form.weight.trim(),
      dimension: form.dimension.trim(),
      route: form.route.trim(),
      highlight: form.highlight.trim(),
      image_url: form.image_url,
      image_position: form.image_position.trim() || null,
      gallery: form.gallery,
    };

    if (editingId === 'new') {
      const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
      const { data, error } = await supabase
        .from('projects')
        .insert({ ...payload, sort_order: nextOrder, is_active: true })
        .select('id, title, client_type, cargo, weight, dimension, route, highlight, image_url, image_position, gallery, sort_order, is_active')
        .single();
      if (error) {
        setError(error.message);
      } else if (data) {
        setItems((prev) => [...prev, data]);
        closeForm();
      }
    } else if (editingId) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editingId);
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
    const { error } = await supabase.from('projects').update({ is_active }).eq('id', id);
    setSavingId(null);
    if (error) setError(error.message);
  };

  const removeItem = async (id: string) => {
    if (!confirm('Xóa dự án này?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    const next = [...items];
    next[index] = { ...a, sort_order: b.sort_order };
    next[target] = { ...b, sort_order: a.sort_order };
    next.sort((x, y) => x.sort_order - y.sort_order);
    setItems(next);
    await Promise.all([
      supabase.from('projects').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('projects').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Quản lý Dự án</h1>
          <p className="text-sm text-slate-500 mt-1">
            Thay đổi ở đây cập nhật ngay mục "Dự Án" trên trang chủ (chỉ dự án đang "Hiện" mới xuất hiện).
          </p>
        </div>
        {editingId === null && (
          <button
            onClick={openNew}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            Thêm dự án
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {editingId !== null ? (
        <form onSubmit={submitForm} className="mt-6 bg-white border border-[#dbe5df] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              {editingId === 'new' ? 'Dự án mới' : 'Sửa dự án'}
            </h2>
            <button type="button" onClick={closeForm} className="p-1.5 rounded text-slate-500 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Tiêu đề *
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Loại khách hàng
              <input
                value={form.client_type}
                onChange={(e) => setForm((f) => ({ ...f, client_type: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Hàng hóa
              <input
                value={form.cargo}
                onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Trọng lượng / Badge
              <input
                value={form.weight}
                onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Kích thước / Cấu hình
              <input
                value={form.dimension}
                onChange={(e) => setForm((f) => ({ ...f, dimension: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700 space-y-1">
              Tuyến đường
              <input
                value={form.route}
                onChange={(e) => setForm((f) => ({ ...f, route: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
              />
            </label>
          </div>

          <label className="text-xs font-semibold text-slate-700 space-y-1 block">
            Điểm then chốt
            <textarea
              value={form.highlight}
              onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
            />
          </label>

          <label className="text-xs font-semibold text-slate-700 space-y-1 block">
            Căn khung ảnh (CSS object-position, tùy chọn — VD: center 62%)
            <input
              value={form.image_position}
              onChange={(e) => setForm((f) => ({ ...f, image_position: e.target.value }))}
              placeholder="center"
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8e2dd] text-sm font-normal text-slate-900 outline-none focus:border-[#5cb83a]"
            />
          </label>

          {/* Main image */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700">Ảnh chính *</span>
            <div className="flex items-center gap-3">
              {form.image_url && (
                <img src={form.image_url} alt="" className="w-20 h-16 object-cover rounded-lg border border-[#d8e2dd]" />
              )}
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e8eeec] border border-[#d8e2dd] text-xs font-semibold text-slate-700 cursor-pointer hover:bg-[#e0e8e4]">
                {uploadingMain ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                {form.image_url ? 'Đổi ảnh' : 'Chọn ảnh'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleMainImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700">Album ảnh (tùy chọn, hiện trong popup chi tiết)</span>
            <div className="flex flex-wrap gap-2">
              {form.gallery.map((img) => (
                <div key={img} className="relative w-20 h-16 shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg border border-[#d8e2dd]" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(img)}
                    className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-red-500 text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center w-20 h-16 rounded-lg bg-[#e8eeec] border border-dashed border-[#c7d3cc] text-slate-500 cursor-pointer hover:bg-[#e0e8e4] shrink-0">
                {uploadingGallery ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && e.target.files.length > 0 && handleGalleryImages(e.target.files)}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e5ece8]">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 rounded-lg bg-[#e5ece8] text-slate-700 font-semibold text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving || uploadingMain || uploadingGallery}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Lưu dự án
            </button>
          </div>
        </form>
      ) : loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
        </div>
      ) : (
        <div className="space-y-2 mt-6">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 bg-white border border-[#dbe5df] rounded-xl p-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Lên"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Xuống"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <img src={item.image_url} alt="" className="w-16 h-12 object-cover rounded-lg border border-[#d8e2dd] shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">{item.title}</div>
                <div className="text-xs text-slate-500 truncate">{item.client_type || '—'}</div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 select-none whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={item.is_active}
                  onChange={(e) => toggleActive(item.id, e.target.checked)}
                  className="accent-[#5cb83a]"
                />
                Hiện
              </label>

              {savingId === item.id && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}

              <button
                onClick={() => openEdit(item)}
                className="px-3 py-1.5 rounded-lg bg-[#e8eeec] text-slate-700 hover:text-slate-900 text-xs font-semibold"
              >
                Sửa
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">Chưa có dự án nào.</div>
          )}
        </div>
      )}
    </div>
  );
}
