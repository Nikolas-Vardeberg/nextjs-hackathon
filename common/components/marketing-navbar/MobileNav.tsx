import Link from "next/link";
import { X } from "lucide-react";
import NavActions from "./NavActions";

type MobileNavProps = {
  links: {
    label: string;
    href: string;
  }[];
  onClose?: () => void;
};

export default function MobileNav({ links, onClose }: MobileNavProps) {
  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute top-0 right-0 h-full w-64 bg-white p-6 shadow-lg transform transition-transform overflow-y-auto flex flex-col justify-between">
        <button
          className="md:hidden fixed top-4 right-4 text-black z-[60]"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col gap-4 my-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 hover:text-black text-neutral-800 font-medium"
                onClick={onClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 flex-col">
          <NavActions onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
