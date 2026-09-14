import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useNoIndex } from '../hooks/useNoIndex';

export function AdminLoginPage() {
  useNoIndex();
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && session) {
    const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/admin';
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff0f4] text-slate-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#ebebf1] border border-[#dbdfe5] rounded-none p-8 space-y-5"
      >
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Đăng nhập Quản trị</h1>
          <p className="text-xs text-slate-500 mt-1">DHG Transport Admin</p>
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-none px-3 py-2">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-none bg-[#e8e8ee] border border-[#d8dbe2] text-sm text-slate-900 outline-none focus:border-[#1ba8e8]"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-sm disabled:opacity-60"
        >
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
