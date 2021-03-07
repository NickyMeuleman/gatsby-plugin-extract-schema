const write = require("write");
const path = require("path");
const { printSchema } = require("gatsby/graphql");

exports.onPostBootstrap = async ({ store }, options) => {
  try {
    const defaultLocation = path.resolve(process.cwd(), "schema.graphql");
    const defaultGetSchema = async (obj) =>
      printSchema(obj, { commentDescriptions: true });
    const defaultWriteSchema = async (location, schema) =>
      write(location, schema);

    const location = options.dest ?? defaultLocation;
    const { schema: internalSchemaObj } = store.getState();
    let schema =
      (await options.getSchema?.(internalSchemaObj)) ??
      (await defaultGetSchema(internalSchemaObj));
    schema = (await options.adjustSchema?.(schema)) ?? schema;

    (await options?.writeSchema?.(location, schema)) ??
      (await defaultWriteSchema(location, schema));

    console.log("[gatsby-plugin-extract-schema] Wrote schema");
  } catch (error) {
    console.error(
      "[gatsby-plugin-extract-schema] Failed to write schema: ",
      error
    );
  }
};
