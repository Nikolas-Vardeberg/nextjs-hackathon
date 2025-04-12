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
      <div className="w-2/4 justify-center hidden md:flex">
        <ul className="flex items-center gap-6 text-neutral-800">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-black font-medium">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/4 justify-end gap-4 flex-shrink-0 hidden md:flex">
        <NavActions />
      </div>
    </>
  );
}
