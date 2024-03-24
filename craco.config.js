/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require("craco-less");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

const { BROTLI_PARAM_QUALITY } = zlib.constants;

module.exports = {
  jest: {
    configure: {
      collectCoverage: true,
      // testMatch: ["<rootDir>/src/test/"],
      // Recommended to use `v8` to support the generation of native v8 coverage reports.
      coverageProvider: "v8",
      coverageReporters: ["none"],
      // testPathIgnorePatterns: ["<rootDir>/src/utils/Title.test.tsx"],
      // Monocart can also support all coverage reports, so there is no need to set up reports here.
      reporters: [
        // If custom reporters are specified, the default Jest reporter will be overridden. If you wish to keep it, 'default' must be passed as a reporters name:
        "default",
        // Monocart custom reporter to generate coverage reports.
        [
          "jest-monocart-coverage",
          {
            name: "Jest Monocart Coverage Report",
            reports: [["v8"], ["console-summary"], ["lcovonly"], ["raw"]],
            outputDir: "./jest-coverage-results",
          },
        ],
      ],
    },
  },
  webpack: {
    plugins: [
      // Add default GZIP compression plugin to compress all JS|TS|TSX files only for files with size > 10KB.
      new CompressionPlugin({
        test: /\.(js|ts|tsx)(\?.*)?$/i, // include .ts and .tsx files
        threshold: 10240,
      }),
      // Add Brotli compression plugin to compress all JS|TS|TSX files with compression quality = 5 only for files with size > 10KB..
      // Brotli compression is better than GZIP compression but it is slower.
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|ts|tsx)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [BROTLI_PARAM_QUALITY]: 5,
          },
        },
        threshold: 10240,
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
