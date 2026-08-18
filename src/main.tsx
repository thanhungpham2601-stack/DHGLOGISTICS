import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import {AuthProvider} from './lib/AuthContext';
import {AdminLoginPage} from './admin/AdminLoginPage';
import {AdminLayout} from './admin/AdminLayout';
import {AdminMenuPage} from './admin/AdminMenuPage';
import {AdminProjectsPage} from './admin/AdminProjectsPage';
import {AdminQuotesPage} from './admin/AdminQuotesPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminMenuPage />} />
            <Route path="menu" element={<AdminMenuPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="quotes" element={<AdminQuotesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
