"use client";

import Link from "next/link";
import Button from "@/common/components/ui/Button";
import { useUser, useClerk } from "@clerk/nextjs";

function UserActions() {
  const { signOut } = useClerk();

  return (
    <>
      <Button variant="inverted-tealwave" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
}

function GuestActions() {
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

export default function NavActions() {
  const { user } = useUser();

  return user ? <UserActions /> : <GuestActions />;
}
