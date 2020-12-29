/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * https://facebook.github.io/metro/docs/configuration
 * @format
 */

module.exports = {
  transformer: {
    minifierConfig: {
      mangle: false,
      compress: false,
    },
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
