
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../hooks/useAuth';
import { Login } from '../components/Login';
import { MainLayout } from '../components/MainLayout';
import { SchoolDashboard } from '../components/SchoolDashboard';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
      {user.type === 'admin' ? <MainLayout /> : <SchoolDashboard />}
    </>
  );
}

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
