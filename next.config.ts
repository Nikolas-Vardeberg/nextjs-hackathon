import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "common", "i18n", ".storybook", "lib"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    deviceSizes: [640, 828, 1200],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "places.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
