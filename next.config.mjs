/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/alerts/details/:alertId",
        destination: "/alerts/details/:alertId/alert_details",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
