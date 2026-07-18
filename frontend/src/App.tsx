import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnalyticsTracker } from "./analytics/AnalyticsTracker";
import { AuthProvider } from "./dashboard/AuthContext";
import { ProtectedRoute } from "./dashboard/ProtectedRoute";
import { DashboardPage } from "./dashboard/pages/DashboardPage";
import { LoginPage } from "./dashboard/pages/LoginPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ContactsPage } from "./pages/ContactsPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <>
                    <AnalyticsTracker />
                    <HomePage />
                  </>
                }
              />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
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
    </LanguageProvider>
  );
}
