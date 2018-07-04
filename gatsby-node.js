const fs = require("fs");
const path = require("path");
const { introspectionQuery, graphql } = require("gatsby/graphql");

const snapshotLocation = path.resolve(process.cwd(), "schema.json");

exports.onPostBootstrap = ({ store }) =>
  new Promise((resolve, reject) => {
    const { schema } = store.getState();
    graphql(schema, introspectionQuery)
      .then(res => fs.writeFileSync(snapshotLocation, JSON.stringify(res.data)))
      .then(() => {
        console.log("Wrote schema");
        resolve();
      })
      .catch(e => {
        console.log("Failed to write schema: ", e);
        reject();
      });
  });
