import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="text-xl font-bold text-black">
        Logo
      </Link>
    </div>
  );
}
