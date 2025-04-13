"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/common/constants/nav-links";
import Container from "@/common/components/atoms/layouts/Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "@/common/components/logo";
export default function MarketingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Prevent scroll when mobile menu is open and add padding to prevent layout shift
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when screen size is greater than 768px (md)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    handleMediaChange();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <header className="w-full bg-white">
      <Container as="nav" className="py-4 flex items-center">
        <Logo className="flex-shrink-0" />
        <DesktopNav links={NAV_LINKS} />

        <button
          className="md:hidden ml-auto text-black"
          onClick={handleToggleMobileMenu}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </Container>

      {isMobileMenuOpen && (
        <MobileNav links={NAV_LINKS} onClose={handleToggleMobileMenu} />
      )}
    </header>
  );
}
