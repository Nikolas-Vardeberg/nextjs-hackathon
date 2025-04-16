import Link from "next/link";
import NotFoundBack from "./not-found-back";
import { buttonVariants } from "../ui/Button/Button";
import { Home } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-black mb-2">404</h1>
      <p className="text-2xl text-black mb-5">
        the page you&apos;re looking for could not be found
      </p>

      <div className="flex items-center justify-center gap-x-3">
        <NotFoundBack />

        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <Home />
          Home
        </Link>
      </div>
    </div>
  );
}
