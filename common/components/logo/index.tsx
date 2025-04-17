import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import logoImage from "@/assets/images/logo-alt.png";

type LogoProps = {
  className?: string;
  width?: number;
};

export default function Logo({ className, width }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block", className)}>
      <Image src={logoImage} alt="Logo" width={width || 125} />
    </Link>
  );
}
