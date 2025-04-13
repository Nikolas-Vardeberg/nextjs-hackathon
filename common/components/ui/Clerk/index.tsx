import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "../Button";
import Link from "next/link";

const Clerk: React.FC = () => {
  return (
    <>
      <SignedOut>
        <Button variant="inverted-tealwave" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="tealwave" asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button variant="tealwave" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default Clerk;
