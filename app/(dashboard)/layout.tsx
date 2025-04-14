import { DashboardNavbar } from "@/common/components/navbar/DashboardNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <DashboardNavbar />
      {children}
    </div>
  );
}
