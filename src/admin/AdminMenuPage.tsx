import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { MenuItemRow } from '../types';

export function AdminMenuPage() {
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('');
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, label, href, sort_order, is_active')
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

  const updateItem = async (id: string, patch: Partial<MenuItemRow>) => {
    setSavingId(id);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    const { error } = await supabase.from('menu_items').update(patch).eq('id', id);
    setSavingId(null);
    if (error) setError(error.message);
  };

  const removeItem = async (id: string) => {
    if (!confirm('Xóa mục menu này?')) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
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
      supabase.from('menu_items').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('menu_items').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);
  };

  const createItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newHref.trim()) return;
    setCreating(true);
    setError(null);
    const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from('menu_items')
      .insert({ label: newLabel.trim(), href: newHref.trim(), sort_order: nextOrder, is_active: true })
      .select('id, label, href, sort_order, is_active')
      .single();
    setCreating(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data) {
      setItems((prev) => [...prev, data]);
      setNewLabel('');
      setNewHref('');
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Quản lý Menu</h1>
      <p className="text-sm text-slate-500 mb-6">
        Thay đổi ở đây sẽ cập nhật ngay trên thanh menu của trang chủ (chỉ mục đang "Hiện" mới xuất hiện).
      </p>

      {error && (
        <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-none px-3 py-2">
          {error}
        </div>
      )}

      <form
        onSubmit={createItem}
        className="flex flex-wrap gap-3 mb-6 bg-[#ebebf1] border border-[#dbdfe5] rounded-none p-4"
      >
        <input
          placeholder="Tên mục (VD: TRANG CHỦ)"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="flex-1 min-w-[160px] px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
        />
        <input
          placeholder="Liên kết (VD: #services)"
          value={newHref}
          onChange={(e) => setNewHref(e.target.value)}
          className="flex-1 min-w-[160px] px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
        />
        <button
          type="submit"
          disabled={creating}
          className="flex items-center gap-2 px-4 py-2 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs disabled:opacity-60"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Thêm mục
        </button>
      </form>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-[#ebebf1] border border-[#dbdfe5] rounded-none p-3"
            >
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
                  disabled={index === items.length - 1}
                  className="p-1 rounded-none text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Xuống"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                defaultValue={item.label}
                onBlur={(e) => e.target.value !== item.label && updateItem(item.id, { label: e.target.value })}
                className="flex-1 px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
              />
              <input
                defaultValue={item.href}
                onBlur={(e) => e.target.value !== item.href && updateItem(item.id, { href: e.target.value })}
                className="flex-1 px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
              />

              <label className="flex items-center gap-2 text-xs text-slate-700 select-none whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={item.is_active}
                  onChange={(e) => updateItem(item.id, { is_active: e.target.checked })}
                  className="accent-[#1ba8e8]"
                />
                Hiện
              </label>

              {savingId === item.id && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-none text-red-500 hover:bg-red-50"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">Chưa có mục menu nào.</div>
          )}
        </div>
      )}
    </div>
  );
}
