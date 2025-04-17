import { MarketingNavbar } from "@/common/components/navbar/MarketingNavbar";
import SkipMain from "@/common/components/ui/SkipMain";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipMain />
      <MarketingNavbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
