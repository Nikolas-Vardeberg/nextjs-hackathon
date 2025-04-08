import { Button, buttonVariants } from "@/common/components/ui/Button/Button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function Notfound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-black mb-2">404</h1>
      <p className="text-2xl text-black mb-5">
        the page you&apos;re looking for could not be found
      </p>

      <div className="flex items-center justify-center gap-x-3">
        <Button variant="default">
          <ArrowLeft />
          Tilbake
        </Button>

        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <Home />
          Hjem
        </Link>
      </div>
    </div>
  );
}
