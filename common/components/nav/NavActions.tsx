import Link from "next/link";
import Button from "@/common/components/ui/Button";

export default function NavActions() {
  return (
    <>
      <Button variant="inverted-tealwave" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="tealwave" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </>
  );
}
