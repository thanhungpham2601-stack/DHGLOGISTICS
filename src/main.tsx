import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const AuthProvider = lazy(() =>
  import('./lib/AuthContext').then((m) => ({default: m.AuthProvider})),
);
const AdminLoginPage = lazy(() =>
  import('./admin/AdminLoginPage').then((m) => ({default: m.AdminLoginPage})),
);
const AdminLayout = lazy(() =>
  import('./admin/AdminLayout').then((m) => ({default: m.AdminLayout})),
);
const AdminMenuPage = lazy(() =>
  import('./admin/AdminMenuPage').then((m) => ({default: m.AdminMenuPage})),
);
const AdminProjectsPage = lazy(() =>
  import('./admin/AdminProjectsPage').then((m) => ({default: m.AdminProjectsPage})),
);
const AdminQuotesPage = lazy(() =>
  import('./admin/AdminQuotesPage').then((m) => ({default: m.AdminQuotesPage})),
);

function AdminArea() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminMenuPage />} />
          <Route path="menu" element={<AdminMenuPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="quotes" element={<AdminQuotesPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminArea />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
