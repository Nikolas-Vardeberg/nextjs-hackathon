import Link from "next/link";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Link href="/" className="text-xl font-bold text-tealwave">
        Logo
      </Link>
    </div>
  );
}
