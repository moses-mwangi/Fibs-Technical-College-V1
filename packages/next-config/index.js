const { createConfig } = require('@repo/next-config');

const config = createConfig({
  experimental: {
    turbo: {
      rules: {
        '@fibs/web': {
          cache: false,
          dependencies: ['@repo/ui', '@repo/utils']
        }
      }
    }
  },
  transpilePackages: ['@repo/ui', '@repo/utils']
});

module.exports = config;
