const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "zlib": require.resolve("browserify-zlib"),
    "querystring": require.resolve("querystring-es3"),
    "path": require.resolve("path-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "http": require.resolve("stream-http"),
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "assert": require.resolve("assert/"),
    "fs": false,
    "net": false
  });
  
  config.resolve.fallback = fallback;
  
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',  // Updated this line
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  
  // Add this if you're getting the "Cannot read properties of undefined" error
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false
    }
  });
  
  return config;
}