"use client";

import Link from "next/link";
import Button from "@/common/components/ui/Button";
import { useUser, useClerk } from "@clerk/nextjs";

function UserActions({ onClose }: NavActionsProps) {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    onClose?.();
  };

  const handleDashboard = () => {
    onClose?.();
  };

  return (
    <>
      <Button variant="inverted-tealwave" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Button variant="tealwave" onClick={handleDashboard} asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </>
  );
}

function GuestActions({ onClose }: NavActionsProps) {
  const handleSignIn = () => {
    onClose?.();
  };

  const handleSignUp = () => {
    onClose?.();
  };

  return (
    <>
      <Button variant="inverted-tealwave" onClick={handleSignIn} asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="tealwave" onClick={handleSignUp} asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </>
  );
}

type NavActionsProps = {
  onClose?: () => void;
};

export default function NavActions({ onClose }: NavActionsProps) {
  const { user } = useUser();

  return user ? (
    <UserActions onClose={onClose} />
  ) : (
    <GuestActions onClose={onClose} />
  );
}
