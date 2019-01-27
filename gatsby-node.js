const write = require("write");
const path = require("path");
const { introspectionQuery, graphql } = require("gatsby/graphql");

const snapshotLocation = path.resolve(process.cwd(), "schema.json");

exports.onPostBootstrap = ({ store }, options) => {
  const dest = options.dest || snapshotLocation;
  new Promise((resolve, reject) => {
    const { schema } = store.getState();
    graphql(schema, introspectionQuery)
      .then(res => write.sync(dest, JSON.stringify(res.data)))
      .then(() => {
        console.log("[gatsby-plugin-extract-schema] Wrote schema");
        resolve();
      })
      .catch(e => {
        console.error("[gatsby-plugin-extract-schema] Failed to write schema: ", e);
        reject();
      });
  });
}
