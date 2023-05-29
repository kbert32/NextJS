/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const development_nextConfig = {
  //environment variables for development
  reactStrictMode: true,
  env: {
    mongodb_username: "",
    mongodb_password: "",
    mongodb_clustername: "",
    mongodb_database: "",
  },
};

const production_nextConfig = {
  //environment variables for production
  reactStrictMode: true,
  env: {
    mongodb_username: "",
    mongodb_password: "",
    mongodb_clustername: "",
    mongodb_database: "",
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return development_nextConfig;
  }

  return production_nextConfig;
};
