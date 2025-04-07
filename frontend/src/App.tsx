import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import theme from './theme';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/clients/ClientsPage';
import NewClientPage from './pages/clients/NewClientPage';
import ClientDetailPage from './pages/clients/ClientDetailPage';
import EditClientPage from './pages/clients/EditClientPage';

// Auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <MainLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/new" element={<NewClientPage />} />
                <Route path="/clients/:id" element={<ClientDetailPage />} />
                <Route path="/clients/:id/edit" element={<EditClientPage />} />
                
                {/* Add more protected routes here */}
              </Route>
              
              {/* Redirect to home page for unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App; 