import DashboardNavbar from "./_components/Nav/DashboardNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
