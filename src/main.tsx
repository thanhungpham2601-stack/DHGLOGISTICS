import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
const seoPages = () => import('./pages/SeoPages.tsx');
const KnowledgeIndexPage = lazy(() => seoPages().then((m) => ({default: m.KnowledgeIndexPage})));
const KnowledgePage = lazy(() => seoPages().then((m) => ({default: m.KnowledgePage})));
const ProjectsPage = lazy(() => seoPages().then((m) => ({default: m.ProjectsPage})));
const ServicePage = lazy(() => seoPages().then((m) => ({default: m.ServicePage})));
const ServicesIndexPage = lazy(() => seoPages().then((m) => ({default: m.ServicesIndexPage})));

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
        <Route path="/dich-vu" element={<Suspense fallback={null}><ServicesIndexPage /></Suspense>} />
        <Route path="/dich-vu/:slug" element={<Suspense fallback={null}><ServicePage /></Suspense>} />
        <Route path="/du-an" element={<Suspense fallback={null}><ProjectsPage /></Suspense>} />
        <Route path="/kien-thuc" element={<Suspense fallback={null}><KnowledgeIndexPage /></Suspense>} />
        <Route path="/kien-thuc/:slug" element={<Suspense fallback={null}><KnowledgePage /></Suspense>} />
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
