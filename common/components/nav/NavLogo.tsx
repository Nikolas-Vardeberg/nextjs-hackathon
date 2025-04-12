import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="w-1/4 flex-shrink-0">
      <Link href="/" className="text-xl font-bold text-black">
        Logo
      </Link>
    </div>
  );
}
