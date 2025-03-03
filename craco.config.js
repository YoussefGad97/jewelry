module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions = [
        '.jsx',
        '.js',
        '.json',
        // ... other extensions
      ];
      return webpackConfig;
    }
  }
}; 