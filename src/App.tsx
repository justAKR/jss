import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { DataProvider } from '@/context/DataContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import SubjectPage from '@/pages/SubjectPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminResourcesPage from '@/pages/admin/AdminResourcesPage';
import AdminResourceFormPage from '@/pages/admin/AdminResourceFormPage';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ProgressProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/subjects/:slug" element={<SubjectPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="resources" element={<AdminResourcesPage />} />
                  <Route path="resources/new" element={<AdminResourceFormPage />} />
                  <Route path="resources/:id/edit" element={<AdminResourceFormPage />} />
                </Route>
              </Routes>
            </Layout>
          </BrowserRouter>
        </ProgressProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
