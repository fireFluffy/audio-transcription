function buildConfig() {
  const env = `./${process.env.NODE_ENV || 'development'}.webpack.config.js`;
  return require(env);
}

module.exports = buildConfig;
