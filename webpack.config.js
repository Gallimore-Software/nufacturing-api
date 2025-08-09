const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // other webpack configurations (entry, output, modules, etc.)
  plugins: [
    // other plugins you might have
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generates a static HTML file for analysis
      openAnalyzer: true, // Opens the report automatically in your default browser
      reportFilename: 'bundle-report.html' // Name of the report file
    })
  ]
};
