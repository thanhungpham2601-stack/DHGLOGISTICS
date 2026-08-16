-- Bảng "Dự án" (Projects) quản lý qua trang admin + Storage bucket cho ảnh dự án
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> Run

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_type text not null default '',
  cargo text not null default '',
  weight text not null default '',
  dimension text not null default '',
  route text not null default '',
  highlight text not null default '',
  image_url text not null,
  image_position text,
  gallery text[] not null default '{}',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============ QUYỀN MỚI: projects.manage ============

insert into public.permissions (code, description) values
  ('projects.manage', 'Thêm / sửa / xóa / sắp xếp dự án tiêu biểu')
on conflict (code) do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code = 'projects.manage'
where r.name in ('admin', 'editor')
on conflict do nothing;

-- ============ ROW LEVEL SECURITY ============

alter table public.projects enable row level security;

drop policy if exists "projects_public_select_active" on public.projects;
create policy "projects_public_select_active" on public.projects
  for select using (is_active = true or public.has_permission('projects.manage'));

drop policy if exists "projects_write_manage" on public.projects;
create policy "projects_write_manage" on public.projects
  for all using (public.has_permission('projects.manage'))
  with check (public.has_permission('projects.manage'));

-- ============ STORAGE BUCKET CHO ẢNH DỰ ÁN ============

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "project_images_public_read" on storage.objects;
create policy "project_images_public_read" on storage.objects
  for select using (bucket_id = 'project-images');

drop policy if exists "project_images_manage" on storage.objects;
create policy "project_images_manage" on storage.objects
  for all using (bucket_id = 'project-images' and public.has_permission('projects.manage'))
  with check (bucket_id = 'project-images' and public.has_permission('projects.manage'));
