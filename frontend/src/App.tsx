import { LanguageProvider } from "./i18n/LanguageContext";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
