import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/images/logo/trp.png";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Link href="/">
        <Image src={logoImage} alt="Logo" width={100} />
      </Link>
    </div>
  );
}
