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
        <div className="mt-auto md:mt-[unset] flex md:flex-row flex-col gap-2 md:gap-4 pt-4 border-t border-gray-100 w-full md:border-none md:pt-0">
          <Button variant="inverted-primary" onClick={onClose} asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button variant="inverted-primary" onClick={onClose} asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="mt-auto md:mt-[unset] flex md:flex-row flex-col gap-2 md:gap-4 pt-4 border-t border-gray-100 w-full md:border-none md:pt-0">
          <Button variant="primary" onClick={onClose} asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>

          <div className="flex items-center gap-2 justify-center w-full">
            <UserButton
              showName={!!onClose}
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: onClose ? "6px 10px" : "0",
                    borderRadius: "8px",
                    width: "fit-content",
                    flexShrink: 1,
                  },
                  avatarBox: {
                    width: onClose ? "32px" : "32px",
                    height: onClose ? "32px" : "32px",
                    flexShrink: 0,
                  },
                  userButtonBox: {
                    backgroundColor: onClose ? "#f0f9f9" : "transparent",
                    padding: onClose ? "4px" : "0",
                    borderRadius: "8px",
                    border: onClose ? "1px solid #e0f2f2" : "none",
                    flexShrink: 1,
                  },
                  userPreviewTextContainer: {
                    fontSize: onClose ? "14px" : "12px",
                    fontWeight: "500",
                    flexShrink: 1,
                    minWidth: 0,
                  },
                  userPreviewMainIdentifier: {
                    flexShrink: 1,
                    minWidth: 0,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  },
                },
              }}
            />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
