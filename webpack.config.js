const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require("eslint-webpack-plugin");

const plugins = defaultConfig.plugins.filter((p) => {
  if (
    Object.values(p).length === 2 &&
    Object.values(p)?.[1]["filename"] &&
    Object.values(p)?.[1]["filename"] === "[name]-rtl.css"
  ) {
    return false;
  }
  return true;
});

module.exports = {
  ...defaultConfig,
  plugins: [...plugins, new ESLintPlugin()],
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.scss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: require("autoprefixer")
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    "@wordpress/blocks": ["wp", "blocks"],
    "@wordpress/element": ["wp", "element"],
    "@wordpress/data": ["wp", "data"],
    "@wordpress/i18n": ["wp", "i18n"],
    "@wordpress/block-editor": ["wp", "blockEditor"],
    "@wordpress/components": ["wp", "components"],
    "@wordpress/blob": ["wp", "blob"],
    "@wordpress/html-entities": ["wp", "htmlEntities"],
    "@wordpress/compose": ["wp", "compose"],
    "@wordpress/rich-text": ["wp", "richText"],
    react: ["wp", "element"],
    "react-dom": ["wp", "element"],
  }, // Externals
};
