import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LogOut, ListTree, FolderKanban } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export function AdminLayout() {
  const { session, profile, loading, signOut, hasPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff4f2] text-slate-700 text-sm">
        Đang tải...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!hasPermission('menu.manage') && !hasPermission('projects.manage')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eff4f2] text-slate-700 text-sm px-4 text-center">
        Tài khoản {profile?.email ?? ''} chưa được cấp quyền truy cập trang quản trị.
        <br />
        Liên hệ quản trị viên để được cấp vai trò admin/editor.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eff4f2] text-slate-900 flex">
      <aside className="w-60 shrink-0 border-r border-[#dde5e1] bg-[#edf2f0] p-5 flex flex-col">
        <div className="mb-8">
          <div className="font-extrabold text-lg text-slate-900">DHG Admin</div>
          <div className="text-[11px] text-slate-500 truncate">{profile?.email}</div>
          {profile?.role_name && (
            <span className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#5cb83a]/20 text-[#1f6b12] border border-[#5cb83a]/40 uppercase">
              {profile.role_name}
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-1">
          {hasPermission('menu.manage') && (
            <Link
              to="/admin/menu"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-[#e5ece8]"
            >
              <ListTree className="w-4 h-4 text-[#1f6b12]" />
              Quản lý Menu
            </Link>
          )}
          {hasPermission('projects.manage') && (
            <Link
              to="/admin/projects"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-[#e5ece8]"
            >
              <FolderKanban className="w-4 h-4 text-[#1f6b12]" />
              Quản lý Dự án
            </Link>
          )}
        </nav>

        <button
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-[#e5ece8]"
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
