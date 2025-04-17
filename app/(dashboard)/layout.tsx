import { DashboardNavbar } from "@/common/components/navbar/DashboardNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      <main id="main-content">{children}</main>
    </>
  );
}
