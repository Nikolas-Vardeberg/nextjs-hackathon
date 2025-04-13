"use client";

import Link from "next/link";
import Button from "@/common/components/ui/Button";
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";

type NavActionsProps = {
  onClose?: () => void;
};

export default function NavActions({ onClose }: NavActionsProps) {
  return (
    <>
      <SignedOut>
        <Button variant="inverted-tealwave" onClick={onClose} asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="tealwave" onClick={onClose} asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button variant="tealwave" onClick={onClose} asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <UserButton />
      </SignedIn>
    </>
  );
}
