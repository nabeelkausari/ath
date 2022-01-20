// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'qaoe.analyttica.com',
      'uatoe.analyttica.com',
      'qaoedata.analyttica.com',
    ],
  },
};

module.exports = withNx(nextConfig);
