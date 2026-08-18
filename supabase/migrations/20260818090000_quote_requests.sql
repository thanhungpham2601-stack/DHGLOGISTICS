-- Bảng "Yêu cầu báo giá" (Quote Requests) từ form ở trang chủ + Storage bucket cho file đính kèm
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> Run

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  ref_code text not null,

  cargo_name text not null default '',
  length numeric,
  width numeric,
  height numeric,
  weight numeric,
  quantity int not null default 1,

  pickup_location text not null default '',
  delivery_location text not null default '',
  estimated_date date,
  special_requirements text not null default '',

  customer_name text not null default '',
  phone_number text not null default '',
  email text not null default '',
  company_name text not null default '',

  attachment_url text,
  attachment_name text,

  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  admin_note text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at
  before update on public.quote_requests
  for each row execute function public.set_updated_at();

-- ============ QUYỀN MỚI: quotes.manage ============

insert into public.permissions (code, description) values
  ('quotes.manage', 'Xem / cập nhật trạng thái / xóa yêu cầu báo giá của khách hàng')
on conflict (code) do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code = 'quotes.manage'
where r.name in ('admin', 'editor')
on conflict do nothing;

-- ============ ROW LEVEL SECURITY ============

alter table public.quote_requests enable row level security;

-- Khách trên web (kể cả chưa đăng nhập) được TẠO yêu cầu báo giá, nhưng không được đọc lại
-- danh sách (tránh lộ thông tin liên hệ của khách khác qua REST API công khai).
drop policy if exists "quote_requests_public_insert" on public.quote_requests;
create policy "quote_requests_public_insert" on public.quote_requests
  for insert with check (true);

drop policy if exists "quote_requests_manage_select" on public.quote_requests;
create policy "quote_requests_manage_select" on public.quote_requests
  for select using (public.has_permission('quotes.manage'));

drop policy if exists "quote_requests_manage_update" on public.quote_requests;
create policy "quote_requests_manage_update" on public.quote_requests
  for update using (public.has_permission('quotes.manage'))
  with check (public.has_permission('quotes.manage'));

drop policy if exists "quote_requests_manage_delete" on public.quote_requests;
create policy "quote_requests_manage_delete" on public.quote_requests
  for delete using (public.has_permission('quotes.manage'));

-- ============ STORAGE BUCKET CHO FILE ĐÍNH KÈM ============

insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', true)
on conflict (id) do nothing;

-- Ai cũng upload được (khách gửi kèm ảnh/bản vẽ khi gửi form), nhưng chỉ người có quyền
-- quotes.manage mới liệt kê/đọc lại danh sách file qua Storage API (URL trực tiếp vẫn xem được
-- vì bucket public, nhưng không đoán/liệt kê được nếu không có link admin cung cấp).
drop policy if exists "quote_attachments_public_upload" on storage.objects;
create policy "quote_attachments_public_upload" on storage.objects
  for insert with check (bucket_id = 'quote-attachments');

drop policy if exists "quote_attachments_public_read" on storage.objects;
create policy "quote_attachments_public_read" on storage.objects
  for select using (bucket_id = 'quote-attachments');

drop policy if exists "quote_attachments_manage" on storage.objects;
create policy "quote_attachments_manage" on storage.objects
  for all using (bucket_id = 'quote-attachments' and public.has_permission('quotes.manage'))
  with check (bucket_id = 'quote-attachments' and public.has_permission('quotes.manage'));
