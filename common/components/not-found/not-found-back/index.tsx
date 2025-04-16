"use client";

import { ArrowLeft } from "lucide-react";
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";

export default function NotFoundBack() {
  const router = useRouter();

  return (
    <Button variant="default" onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  );
}
