# gatsby-plugin-extract-schema

A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin that extracts your graphql schema to a `.json` file.

You can use this file to check your queries against your schema, by using [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql).

## Install

Extract schema:
`npm install --save gatsby-plugin-extract-schema`

Use extracted schema:
`npm install --save-dev eslint babel-eslint eslint-plugin-graphql`

## How to use

### Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: ["gatsby-plugin-extract-schema"]
};
```

or

```javascript
{
  resolve: "gatsby-plugin-extract-schema",
    options: {
      dest: `${__dirname}/path/to/schema.json`,
    },
  },
}
```

## Check queries against schema

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
