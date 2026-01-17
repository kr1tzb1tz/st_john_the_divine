// @ts-check
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  output: "export",
};

module.exports = nextConfig;
