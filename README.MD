# gatsby-plugin-extract-schema

A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin that extracts your graphql schema to a file.

You can use this file to check your queries against your schema, by using [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql).

## Installation

`npm install --save gatsby-plugin-extract-schema`

## Usage

Add the plugin to `gatsby-config.js`

```javascript
module.exports = {
  plugins: ["gatsby-plugin-extract-schema"]
};
```

### Optional configuration

#### Custom file destination

```javascript
{
  resolve: "gatsby-plugin-extract-schema",
    options: {
      dest: `${__dirname}/path/to/schema.json`,
    },
  },
}
```

#### Lifecycle hooks

It is possible to change the code that runs by defining optional lifecycle hooks.
They are all asynchronous functions, if you define them, mark the function as `async`, or return a `Promise` manually.

##### getSchema

###### Parameters
- the internal Gatsby schema object

###### Return value
- a Promise

The Promise should resolve to a string that is later written to a file.

##### adjustSchema

###### Parameters
- a string containing the schema

###### Return value
- a Promise

The Promise should resolve to a string that is later written to a file.

##### writeSchema

###### Parameters
- a string with the location to write to
- a string containing the schema

###### Return value
- a Promise

The Promise should resolve when the schema-string is written to a file.

### Example usage

#### Basic

Returns a `schema.graphql` file in the root of the project.

```javascript
// gatsby-config.js
module.exports = {
  plugins: ["gatsby-plugin-extract-schema"]
};
```

#### Advanced

This example will write the schema in the `json` format to a file called `schema.json` in the `src` directory.

```javascript
// gatsby-config.js
const { graphql, getIntrospectionQuery } = require("gatsby/graphql");
const path = require("path");
const fs = require("fs");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-extract-schema",
      options: {
        dest: path.resolve(process.cwd(), "src", "schema.json"),
        getSchema: async (obj) => {
          const res = await graphql(obj, getIntrospectionQuery());
          return JSON.stringify(res.data);
        },
        adjustSchema: async (schema) => {
          // adjust the schema
          return schema;
        },
        writeSchema: async (location, schema) => {
          // custom implementation to write the schema-string
          fs.writeFileSync(location, schema)
        }
      },
    },
  ],
};

```

## Check queries against schema

To use the extracted schema with [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql),
prepare by installing prerequisite packages
`npm install --save-dev eslint @babel/core @babel/eslint-parser babel-preset-gatsby eslint-plugin-graphql`

### Configuration in `.eslintrc.js`

- If the schema you wrote was a `.graphql` file, use the `schemaString` option that `eslint-plugin-graphql` provides.

The file has to be read to a string first.
The code snipped below uses `fs.readFileSync` to do that.

- If the schema you wrote was a `.json` file, use the `schemaJsonFilepath` option that `eslint-plugin-graphql` provides.

```javascript
const path = require("path");
const fs = require("fs");

module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["graphql"],
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: `relay`,
        schemaString: fs.readFileSync(
          path.resolve(__dirname, "./schema.graphql"),
          { encoding: "utf-8", flag: "r" }
        ),
        tagName: `graphql`,
      },
    ],
  },
};
```

### Configuration in `.babelrc`

To get it to work properly I needed to install `babel-preset-gatsby` and configure that too.

```json
{
  "presets": [["babel-preset-gatsby"]]
}
```

Big thanks to [Kurtis Kemple](https://twitter.com/kurtiskemple) for all his help!
