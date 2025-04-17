import { MarketingNavbar } from "@/common/components/navbar/MarketingNavbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingNavbar />
      <main id="main-content">{children}</main>
    </>
  );
}
