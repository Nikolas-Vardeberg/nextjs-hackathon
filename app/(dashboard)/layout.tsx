import { DashboardNavbar } from "@/common/components/navbar/DashboardNavbar";
import SkipMain from "@/common/components/ui/SkipMain";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipMain />
      <DashboardNavbar />
      {children}
    </>
  );
}
