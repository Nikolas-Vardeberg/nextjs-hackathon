import DashboardNavbar from "./_components/Nav/DashboardNavbar";

export default async function DashboardLayout({
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
