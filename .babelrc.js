const presets = ["@babel/preset-react", "@babel/preset-env"];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  [
    "import",
    { "libraryName": "antd", "libraryDirectory": "es", "style": "css" },
    "styled-components"
  ]
];

module.exports = { presets, plugins };