import Link from "next/link";
import NotFoundBack from "./not-found-back";
import { Button } from "../ui/Button/Button";
import { Home } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-black mb-2">404</h1>
      <h2 className="text-2xl text-black mb-5">Page Not Found</h2>
      <p className="text-2xl text-black mb-5">
        The page you&apos;re looking for could not be found.
      </p>

      <div className="flex items-center justify-center gap-x-3">
        <NotFoundBack />

        <Button asChild variant="primary">
          <Link href="/">
            <Home />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
