import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import logoImage from "@/assets/images/logo/trp.png";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block", className)}>
      <Image src={logoImage} alt="Logo" width={64} />
    </Link>
  );
}
