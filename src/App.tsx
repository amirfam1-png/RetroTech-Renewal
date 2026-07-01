import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from '@/context/SiteContext';
import { LandingRoute } from '@/routes/LandingRoute';
import { LoginRoute } from '@/routes/LoginRoute';
import { DashboardRoute } from '@/routes/DashboardRoute';

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <Routes>
          <Route path="/" element={<LandingRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/app" element={<DashboardRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteProvider>
    </BrowserRouter>
  );
}
