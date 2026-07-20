import { MotionConfig } from "framer-motion";
import { Outlet } from "react-router-dom";
import { useLiteMotion } from "../hooks/useLiteMotion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  const lite = useLiteMotion();

  return (
    <MotionConfig reducedMotion={lite ? "always" : "user"}>
      <Header />
      <Outlet />
      <Footer />
    </MotionConfig>
  );
}
