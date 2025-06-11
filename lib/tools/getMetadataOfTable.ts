import { z } from "zod";
import { tool } from "ai";
import snowflake from "snowflake-sdk";
import { env } from "../../env";

const connect = () => {
  const connection = snowflake.createConnection({
    account: env.SNOWFLAKE_ACCOUNT,
    username: env.SNOWFLAKE_USERNAME,
    password: env.SNOWFLAKE_PASSWORD,
    database: env.SNOWFLAKE_DATABASE,
    schema: env.SNOWFLAKE_SCHEMA,
    warehouse: env.SNOWFLAKE_WAREHOUSE,
    role: env.SNOWFLAKE_ROLE,
  });
  return new Promise((resolve, reject) => {
    connection.connect((err: any, conn: any) => {
      if (err) {
        console.error("Unable to connect to Snowflake:", err);
        reject(err);
      } else {
        console.log("Successfully connected to Snowflake");
        resolve(connection);
      }
    });
  });
};

const DEFAULT_SCHEMA = env.SNOWFLAKE_SCHEMA;
const DEFAULT_DATABASE = env.SNOWFLAKE_DATABASE;

export const getMetadataOfTableTool = tool({
  description:
    "Retrieves metadata information about a table in Snowflake, including column names, data types, and descriptions.",
  parameters: z.object({
    tableName: z.string().describe("Name of the table to get metadata for"),
    schema: z.string().optional().describe(`Schema name (defaults to ${DEFAULT_SCHEMA} if not provided)`),
    database: z.string().optional().describe(`Database name (defaults to ${DEFAULT_DATABASE} if not provided)`),
  }),
  execute: async ({ tableName, schema = DEFAULT_SCHEMA, database = DEFAULT_DATABASE }) => {
    let connection: any;
    try {
      connection = await connect();
      const describeQuery = `DESCRIBE TABLE ${database}.${schema}.${tableName}`;
      const columnMetadata = await new Promise((resolve, reject) => {
        const statement = connection.execute({
          sqlText: describeQuery,
          complete: (err: any, stmt: any, rows: any) => {
            if (err) {
              console.error("Failed to retrieve table metadata: " + err.message);
              connection.destroy((err: any, conn: any) => {
                if (err) {
                  console.error("Unable to disconnect from Snowflake:", err);
                } else {
                  console.log("Disconnected from Snowflake");
                }
              });
              reject(err);
            } else {
              connection.destroy((err: any, conn: any) => {
                if (err) {
                  console.error("Unable to disconnect from Snowflake:", err);
                } else {
                  console.log("Disconnected from Snowflake");
                }
              });
              resolve(rows);
            }
          },
        });
      });
      return {
        tableName,
        schema,
        database,
        columns: columnMetadata,
      };
    } catch (error) {
      console.error(`Error retrieving metadata for table ${tableName}:`, error);
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "object" && error && "message" in error) {
        message = (error as any).message;
      } else if (typeof error === "string") {
        message = error;
      }
      return {
        error: `Failed to retrieve metadata for ${tableName}: ${message}`,
      };
    }
  },
});
