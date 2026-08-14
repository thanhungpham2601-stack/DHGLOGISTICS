-- Phân quyền (roles / permissions) + quản lý menu cho trang admin
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> Run
-- (hoặc `supabase db push` nếu đã link CLI với project)

create extension if not exists pgcrypto;

-- ============ BẢNG ============

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

-- Hồ sơ người dùng, 1-1 với auth.users, gắn với 1 role
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role_id uuid references public.roles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Mục menu hiển thị trên Navbar, quản lý qua trang admin
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  parent_id uuid references public.menu_items(id) on delete cascade,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ DỮ LIỆU MẶC ĐỊNH ============

insert into public.roles (name, description) values
  ('admin', 'Toàn quyền: quản lý người dùng, phân quyền và menu'),
  ('editor', 'Chỉ quản lý menu, không quản lý người dùng'),
  ('viewer', 'Chỉ xem, không có quyền chỉnh sửa')
on conflict (name) do nothing;

insert into public.permissions (code, description) values
  ('menu.manage', 'Thêm / sửa / xóa / sắp xếp mục menu'),
  ('users.manage', 'Quản lý người dùng, vai trò và phân quyền')
on conflict (code) do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.name = 'admin'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code = 'menu.manage'
where r.name = 'editor'
on conflict do nothing;

-- Menu mặc định = menu tĩnh hiện có trong Navbar.tsx (chỉ seed nếu bảng đang trống)
insert into public.menu_items (label, href, sort_order, is_active)
select v.label, v.href, v.sort_order, true
from (values
  ('TRANG CHỦ', '#hero', 1),
  ('DỊCH VỤ', '#services', 2),
  ('ĐỘI XE', '#fleet', 3),
  ('DỰ ÁN', '#projects', 4),
  ('NĂNG LỰC', '#capabilities', 5),
  ('QUY TRÌNH', '#process', 6),
  ('LIÊN HỆ', '#contact', 7)
) as v(label, href, sort_order)
where not exists (select 1 from public.menu_items);

-- ============ HÀM KIỂM TRA QUYỀN (dùng security definer để tránh đệ quy RLS) ============

create or replace function public.has_permission(perm_code text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    join public.role_permissions rp on rp.role_id = p.role_id
    join public.permissions perm on perm.id = rp.permission_id
    where p.id = auth.uid() and perm.code = perm_code
  );
$$;

-- ============ TRIGGERS TIỆN ÍCH ============

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_menu_items_updated_at on public.menu_items;
create trigger set_menu_items_updated_at
  before update on public.menu_items
  for each row execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Tự động tạo profile (role mặc định = viewer) khi có user đăng ký mới
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role_id)
  values (new.id, new.email, (select id from public.roles where name = 'viewer'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ ROW LEVEL SECURITY ============

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.profiles enable row level security;
alter table public.menu_items enable row level security;

-- roles / permissions / role_permissions: chỉ user có quyền users.manage mới đọc/ghi
drop policy if exists "roles_rw_admin" on public.roles;
create policy "roles_rw_admin" on public.roles
  for all using (public.has_permission('users.manage'))
  with check (public.has_permission('users.manage'));

drop policy if exists "permissions_rw_admin" on public.permissions;
create policy "permissions_rw_admin" on public.permissions
  for all using (public.has_permission('users.manage'))
  with check (public.has_permission('users.manage'));

drop policy if exists "role_permissions_rw_admin" on public.role_permissions;
create policy "role_permissions_rw_admin" on public.role_permissions
  for all using (public.has_permission('users.manage'))
  with check (public.has_permission('users.manage'));

-- profiles: tự xem/sửa hồ sơ của mình; admin xem/sửa/xóa tất cả
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.has_permission('users.manage'));

drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id or public.has_permission('users.manage'))
  with check (auth.uid() = id or public.has_permission('users.manage'));

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin" on public.profiles
  for insert with check (public.has_permission('users.manage'));

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin" on public.profiles
  for delete using (public.has_permission('users.manage'));

-- menu_items: ai cũng đọc được mục đang active (cho trang chủ); người có quyền menu.manage đọc/ghi tất cả
drop policy if exists "menu_items_public_select_active" on public.menu_items;
create policy "menu_items_public_select_active" on public.menu_items
  for select using (is_active = true or public.has_permission('menu.manage'));

drop policy if exists "menu_items_write_manage" on public.menu_items;
create policy "menu_items_write_manage" on public.menu_items
  for all using (public.has_permission('menu.manage'))
  with check (public.has_permission('menu.manage'));

-- ============ BƯỚC BẮT BUỘC SAU KHI CHẠY MIGRATION ============
-- Đăng ký 1 tài khoản qua Supabase Auth (email/password) trong app hoặc Dashboard > Authentication,
-- sau đó chạy lệnh dưới (thay email) để cấp quyền admin cho chính bạn:
--
-- update public.profiles set role_id = (select id from public.roles where name = 'admin')
-- where email = 'you@example.com';
