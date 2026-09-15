import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, Mail, Paperclip, Phone, Search, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface QuoteRequestRow {
  id: string;
  ref_code: string;
  cargo_name: string;
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
  quantity: number;
  pickup_location: string;
  delivery_location: string;
  estimated_date: string | null;
  special_requirements: string;
  customer_name: string;
  phone_number: string;
  email: string;
  company_name: string;
  attachment_url: string | null;
  attachment_name: string | null;
  status: string;
  admin_note: string;
  created_at: string;
}

const STATUS_OPTIONS: { value: string; label: string; className: string }[] = [
  { value: 'new', label: 'Mới', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'contacted', label: 'Đã liên hệ', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'quoted', label: 'Đã báo giá', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  { value: 'won', label: 'Thành công', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'lost', label: 'Không thành công', className: 'bg-slate-100 text-slate-500 border-slate-200' },
];

const statusMeta = (value: string) => STATUS_OPTIONS.find((s) => s.value === value) ?? STATUS_OPTIONS[0];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

const CSV_COLUMNS: { key: keyof QuoteRequestRow; label: string }[] = [
  { key: 'ref_code', label: 'Mã yêu cầu' },
  { key: 'created_at', label: 'Ngày gửi' },
  { key: 'status', label: 'Trạng thái' },
  { key: 'customer_name', label: 'Khách hàng' },
  { key: 'phone_number', label: 'Số điện thoại' },
  { key: 'email', label: 'Email' },
  { key: 'company_name', label: 'Công ty' },
  { key: 'cargo_name', label: 'Tên hàng hóa' },
  { key: 'weight', label: 'Trọng lượng (tấn)' },
  { key: 'quantity', label: 'Số lượng' },
  { key: 'pickup_location', label: 'Điểm nhận' },
  { key: 'delivery_location', label: 'Điểm giao' },
  { key: 'estimated_date', label: 'Thời gian dự kiến' },
  { key: 'admin_note', label: 'Ghi chú nội bộ' },
];

function csvEscape(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function exportQuotesToCsv(rows: QuoteRequestRow[]) {
  const header = CSV_COLUMNS.map((c) => csvEscape(c.label)).join(',');
  const lines = rows.map((row) =>
    CSV_COLUMNS.map((c) => {
      const value = c.key === 'status' ? statusMeta(row.status).label : c.key === 'created_at' ? formatDate(row.created_at) : row[c.key];
      return csvEscape(value);
    }).join(','),
  );
  const csv = '﻿' + [header, ...lines].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bao-gia-dhg-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function AdminQuotesPage() {
  const [items, setItems] = useState<QuoteRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });
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

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const from = dateFrom ? new Date(dateFrom + 'T00:00:00') : null;
    const to = dateTo ? new Date(dateTo + 'T23:59:59') : null;
    return items.filter((i) => {
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (term && !i.customer_name.toLowerCase().includes(term) && !i.phone_number.toLowerCase().includes(term)) return false;
      const createdAt = new Date(i.created_at);
      if (from && createdAt < from) return false;
      if (to && createdAt > to) return false;
      return true;
    });
  }, [items, statusFilter, search, dateFrom, dateTo]);

  const active = items.find((i) => i.id === activeId) ?? null;

  const openDetail = (item: QuoteRequestRow) => {
    setActiveId(item.id);
    setNoteDraft(item.admin_note);
  };

  const updateStatus = async (id: string, status: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (error) setError(error.message);
  };

  const saveNote = async () => {
    if (!active) return;
    setSaving(true);
    const { error } = await supabase.from('quote_requests').update({ admin_note: noteDraft }).eq('id', active.id);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setItems((prev) => prev.map((it) => (it.id === active.id ? { ...it, admin_note: noteDraft } : it)));
  };

  const removeItem = async (id: string) => {
    if (!confirm('Xóa yêu cầu báo giá này?')) return;
    const { error } = await supabase.from('quote_requests').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const dimensionText = (item: QuoteRequestRow) => {
    const parts = [item.length, item.width, item.height].filter((v): v is number => v !== null);
    return parts.length ? `${parts.join(' × ')} m` : '—';
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Yêu cầu Báo giá</h1>
          <p className="text-sm text-slate-500 mt-1">
            Danh sách khách hàng gửi yêu cầu báo giá từ trang chủ.
          </p>
        </div>
        <button
          onClick={() => exportQuotesToCsv(filtered)}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-xs font-semibold text-slate-700 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title="Xuất danh sách đang lọc ra file Excel/CSV"
        >
          <Download className="w-3.5 h-3.5" />
          Xuất Excel ({filtered.length})
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên khách hoặc số điện thoại..."
            className="w-full pl-8 pr-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-xs text-slate-900 outline-none focus:border-[#1ba8e8]"
          />
        </div>
        <label className="flex items-center gap-1.5 text-xs text-slate-500">
          Từ
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-2 py-2 rounded-none bg-white border border-[#d8dbe2] text-xs text-slate-700 outline-none focus:border-[#1ba8e8]"
          />
        </label>
        <label className="flex items-center gap-1.5 text-xs text-slate-500">
          Đến
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-2 py-2 rounded-none bg-white border border-[#d8dbe2] text-xs text-slate-700 outline-none focus:border-[#1ba8e8]"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-xs font-semibold text-slate-700 outline-none focus:border-[#1ba8e8]"
        >
          <option value="all">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-none px-3 py-2">
          {error}
        </div>
      )}

      {active && (
        <div className="mt-6 bg-white border border-[#dbdfe5] rounded-none p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0b6fa8]">#{active.ref_code}</span>
              <h2 className="text-lg font-bold text-slate-900">{active.cargo_name || '(Chưa đặt tên hàng hóa)'}</h2>
              <span className="text-xs text-slate-500">{formatDate(active.created_at)}</span>
            </div>
            <button onClick={() => setActiveId(null)} className="p-1.5 rounded-none text-slate-500 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-[#f5f6f8] rounded-none p-3 border border-[#e5e7ec]">
              <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Người liên hệ</div>
              <div className="font-semibold text-slate-900">{active.customer_name}</div>
              {active.company_name && <div className="text-xs text-slate-600">{active.company_name}</div>}
              <div className="flex items-center gap-3 mt-1 text-xs">
                <a href={`tel:${active.phone_number}`} className="flex items-center gap-1 text-[#0b6fa8] font-semibold">
                  <Phone className="w-3 h-3" /> {active.phone_number}
                </a>
                {active.email && (
                  <a href={`mailto:${active.email}`} className="flex items-center gap-1 text-[#0b6fa8] font-semibold">
                    <Mail className="w-3 h-3" /> {active.email}
                  </a>
                )}
              </div>
            </div>

            <div className="bg-[#f5f6f8] rounded-none p-3 border border-[#e5e7ec]">
              <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Hàng hóa</div>
              <div>Kích thước: {dimensionText(active)}</div>
              <div>Trọng lượng: {active.weight ?? '—'} tấn × {active.quantity} kiện</div>
            </div>

            <div className="bg-[#f5f6f8] rounded-none p-3 border border-[#e5e7ec] sm:col-span-2">
              <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Hành trình</div>
              <div>Nhận: {active.pickup_location || '—'}</div>
              <div>Giao: {active.delivery_location || '—'}</div>
              <div>Thời gian dự kiến: {active.estimated_date ?? '—'}</div>
            </div>

            {active.special_requirements && (
              <div className="bg-[#f5f6f8] rounded-none p-3 border border-[#e5e7ec] sm:col-span-2">
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Yêu cầu đặc biệt</div>
                <div>{active.special_requirements}</div>
              </div>
            )}

            {active.attachment_url && (
              <a
                href={active.attachment_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-[#0b6fa8] sm:col-span-2"
              >
                <Paperclip className="w-3.5 h-3.5" />
                {active.attachment_name || 'Xem file đính kèm'}
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => updateStatus(active.id, s.value)}
                className={`px-3 py-1.5 rounded-none text-xs font-semibold border transition-all ${
                  active.status === s.value ? s.className : 'bg-white text-slate-500 border-[#d8dbe2] hover:border-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Ghi chú nội bộ</label>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="VD: đã gọi, khách cần báo giá lại vào tuần sau..."
              className="w-full px-3 py-2 rounded-none bg-white border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
            />
            <div className="flex justify-end">
              <button
                onClick={saveNote}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs disabled:opacity-60"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Lưu ghi chú
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
        </div>
      ) : (
        <div className="space-y-2 mt-6">
          {filtered.map((item) => {
            const meta = statusMeta(item.status);
            return (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className={`flex items-center gap-3 bg-white border rounded-none p-3 cursor-pointer transition-colors ${
                  activeId === item.id ? 'border-[#1ba8e8]' : 'border-[#dbdfe5] hover:border-[#c3c7d2]'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0b6fa8]">#{item.ref_code}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-none border ${meta.className}`}>
                      {meta.label}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {item.cargo_name || '(Chưa đặt tên hàng hóa)'}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {item.customer_name} • {item.phone_number}
                  </div>
                </div>
                <div className="text-xs text-slate-400 shrink-0 hidden sm:block">{formatDate(item.created_at)}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="p-2 rounded-none text-red-500 hover:bg-red-50 shrink-0"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">Chưa có yêu cầu báo giá nào.</div>
          )}
        </div>
      )}
    </div>
  );
}
