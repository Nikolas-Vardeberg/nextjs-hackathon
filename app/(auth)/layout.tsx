import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        Auth nav/wrapper with logo and links to home, and legal pages
        <br />
        <Link href="/">Home</Link>
      </nav>

      {children}
    </>
  );
}
