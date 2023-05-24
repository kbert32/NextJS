/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const development_nextConfig = {
  //environment variables for development
  reactStrictMode: true,
  env: {
    mongodb_username: "new",
    mongodb_password: "3YuucnfFdonyoJJy",
    mongodb_clustername: "cluster0",
    mongodb_database: "Blog",
  },
};

const production_nextConfig = {
  //environment variables for production
  reactStrictMode: true,
  env: {
    mongodb_username: "new",
    mongodb_password: "3YuucnfFdonyoJJy",
    mongodb_clustername: "cluster0",
    mongodb_database: "Blog",
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return development_nextConfig;
  }

  return production_nextConfig;
};
