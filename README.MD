# gatsby-plugin-lint-queries

A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin that warns you about potential errors in your `graphql` queries.

## Install

`npm install --save gatsby-plugin-lint-queries eslint babel-eslint eslint-plugin-graphql`

## How to use

### Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-lint-queries`
    }
  ]
};
```

### Add `.eslintrc.js` to the project root

```javascript
const path = require("path");
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        schemaJsonFilepath: path.resolve(__dirname, "./schema.json"),
        tagName: "graphql"
      }
    ]
  },
  plugins: ["graphql"]
};
```

Big thanks to [Kurtis Kemple](https://twitter.com/kurtiskemple) for all his help!
