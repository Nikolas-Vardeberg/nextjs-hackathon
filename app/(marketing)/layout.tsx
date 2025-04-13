import MarketingNavbar from "@/common/components/marketing-navbar/MarketingNavbar";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingNavbar />
      {children}
    </>
  );
}
