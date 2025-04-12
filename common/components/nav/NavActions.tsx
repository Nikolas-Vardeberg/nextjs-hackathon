import Link from "next/link";
import Button from "@/common/components/ui/Button";

export default function NavActions() {
  return (
    <>
      <Button variant="inverted-tealwave" asChild>
        <Link href="/sign-in" className="text-sm font-medium">
          Sign In
        </Link>
      </Button>
      <Button variant="tealwave" asChild>
        <Link
          href="/sign-up"
          className="px-4 py-2 rounded bg-primary text-white text-sm font-medium"
        >
          Get Started
        </Link>
      </Button>
    </>
  );
}
