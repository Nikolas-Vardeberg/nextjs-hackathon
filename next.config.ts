import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "common", "i18n", ".storybook"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
