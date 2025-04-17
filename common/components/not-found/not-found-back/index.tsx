"use client";

import { ArrowLeft } from "lucide-react";
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";

export default function NotFoundBack() {
  const router = useRouter();

  return (
    <Button variant="inverted-primary" onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  );
}
