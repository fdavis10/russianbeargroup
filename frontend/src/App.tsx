import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnalyticsTracker } from "./analytics/AnalyticsTracker";
import { AuthProvider } from "./dashboard/AuthContext";
import { ProtectedRoute } from "./dashboard/ProtectedRoute";
import { DashboardPage } from "./dashboard/pages/DashboardPage";
import { LoginPage } from "./dashboard/pages/LoginPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <LanguageProvider>
                <AnalyticsTracker />
                <HomePage />
              </LanguageProvider>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
