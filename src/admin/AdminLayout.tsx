import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LogOut, ListTree, FolderKanban, FileText, Newspaper } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useNoIndex } from '../hooks/useNoIndex';

export function AdminLayout() {
  const { session, profile, loading, signOut, hasPermission } = useAuth();
  const location = useLocation();
  useNoIndex();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff0f4] text-slate-700 text-sm">
        Đang tải...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (
    !hasPermission('menu.manage') &&
    !hasPermission('projects.manage') &&
    !hasPermission('quotes.manage') &&
    !hasPermission('content.manage')
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff0f4] text-slate-700 text-sm px-4 text-center">
        Tài khoản {profile?.email ?? ''} chưa được cấp quyền truy cập trang quản trị.
        <br />
        Liên hệ quản trị viên để được cấp vai trò admin/editor.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eff0f4] text-slate-900 flex">
      <aside className="w-60 shrink-0 border-r border-[#dddfe5] bg-[#edeef2] p-5 flex flex-col">
        <div className="mb-8">
          <div className="font-extrabold text-lg text-slate-900">DHG Admin</div>
          <div className="text-[11px] text-slate-500 truncate">{profile?.email}</div>
          {profile?.role_name && (
            <span className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-none bg-[#1ba8e8]/20 text-[#0b6fa8] border border-[#1ba8e8]/40 uppercase">
              {profile.role_name}
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-1">
          {hasPermission('menu.manage') && (
            <Link
              to="/admin/menu"
              className="flex items-center gap-2 px-3 py-2 rounded-none text-sm font-semibold text-slate-800 hover:bg-[#e5e7ec]"
            >
              <ListTree className="w-4 h-4 text-[#0b6fa8]" />
              Quản lý Menu
            </Link>
          )}
          {hasPermission('projects.manage') && (
            <Link
              to="/admin/projects"
              className="flex items-center gap-2 px-3 py-2 rounded-none text-sm font-semibold text-slate-800 hover:bg-[#e5e7ec]"
            >
              <FolderKanban className="w-4 h-4 text-[#0b6fa8]" />
              Quản lý Dự án
            </Link>
          )}
          {hasPermission('quotes.manage') && (
            <Link
              to="/admin/quotes"
              className="flex items-center gap-2 px-3 py-2 rounded-none text-sm font-semibold text-slate-800 hover:bg-[#e5e7ec]"
            >
              <FileText className="w-4 h-4 text-[#0b6fa8]" />
              Yêu cầu Báo giá
            </Link>
          )}
          {hasPermission('content.manage') && (
            <Link
              to="/admin/content"
              className="flex items-center gap-2 px-3 py-2 rounded-none text-sm font-semibold text-slate-800 hover:bg-[#e5e7ec]"
            >
              <Newspaper className="w-4 h-4 text-[#0b6fa8]" />
              Nội dung SEO
            </Link>
          )}
        </nav>

        <button
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 rounded-none text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-[#e5e7ec]"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
