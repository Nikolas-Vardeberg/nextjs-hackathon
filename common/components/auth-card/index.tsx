import React, { ReactNode } from "react";
import Link from "next/link";
import Logo from "../logo";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

const AuthCard = ({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm border border-gray-200 bg-white rounded-lg shadow-md space-y-6">
        <div className="flex flex-col p-8 gap-6">
          <div className="border-b border-dashed border-gray-200 pb-6">
            <Logo className="mb-4" />
            <h1 className="text-2xl font-bold">{title}</h1>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
          {children}
        </div>

        {(footerText || footerLinkText) && (
          <div className="text-center text-sm border rounded-md border-gray-200 p-3 m-0.5 bg-gray-50">
            {footerText}{" "}
            {footerLinkText && footerLinkHref && (
              <Link href={footerLinkHref} className="font-bold text-gray-900">
                {footerLinkText}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
