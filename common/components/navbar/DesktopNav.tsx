import Link from "next/link";
import NavActions from "./NavActions";

type DesktopNavProps = {
  links: {
    label: string;
    href: string;
  }[];
};

export default function DesktopNav({ links }: DesktopNavProps) {
  return (
    <>
      {links.length > 0 && (
        <div className="hidden md:flex items-center ml-8">
          <ul className="flex items-center gap-6 text-neutral-800">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-tealwave font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="ml-auto hidden md:flex items-center gap-4">
        <NavActions />
      </div>
    </>
  );
}
