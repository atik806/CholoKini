"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { Toaster } from "../ui/Toaster";
import { ScrollToTop } from "../ui/ScrollToTop";
import { PageLoader } from "../ui/PageLoader";
import { ReportButton } from "../report/ReportButton";

export function RootClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      <PageLoader />
      {!isAdmin && <Header />}
      <main id="main-content" className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      <Toaster />
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <ReportButton />}
    </>
  );
}
