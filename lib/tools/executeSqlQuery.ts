import { tool } from "ai";
import { z } from "zod";
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

export const executeSqlQueryTool = tool({
  description: "Executes a SELECT SQL query on Snowflake and returns the result. Fetches at most 100 rows.",
  parameters: z.object({
    query: z.string().describe("SQL SELECT query to execute."),
    numRows: z.number().describe("Number of rows to return (maximum 100)."),
  }),
  execute: async ({ query, numRows }) => {
    let connection: any;
    try {
      const trimmedQuery = query.trim().toUpperCase();
      if (!trimmedQuery.startsWith("SELECT ")) {
        return {
          query,
          result: "Error: Only SELECT queries are allowed for security reasons.",
        };
      }

      if (trimmedQuery.includes(";") && !trimmedQuery.endsWith(";")) {
        return {
          query,
          result: "Error: Multiple SQL statements are not allowed.",
        };
      }

      connection = await connect();

      const rowLimit = Math.min(numRows, 100);
      const limitedQuery = `SELECT * FROM (${query.trim().replace(/;?\s*$/, "")}) LIMIT ${rowLimit};`;

      const result = await new Promise((resolve, reject) => {
        const statement = connection.execute({
          sqlText: limitedQuery,
          complete: (err: any, stmt: any, rows: any) => {
            if (err) {
              console.error("Failed to execute statement due to the following error: " + err.message);
              connection.destroy((err: any, conn: any) => {
                if (err) {
                  console.error("Unable to disconnect from Snowflake:", err);
                } else {
                  console.log("Disconnected from Snowflake");
                }
              });
              reject({
                query,
                result: `Error: ${err.message}`,
              });
            } else {
              const rowCount = Array.isArray(rows) ? rows.length : 0;
              console.log("Number of rows produced: " + rowCount);
              connection.destroy((err: any, conn: any) => {
                if (err) {
                  console.error("Unable to disconnect from Snowflake:", err);
                } else {
                  console.log("Disconnected from Snowflake");
                }
              });
              resolve({
                query,
                result: JSON.stringify(rows),
              });
            }
          },
        });
      });

      return result;
    } catch (error: any) {
      console.error("Error executing query:", error);
      return {
        query,
        result: `Error: ${error.message}`,
      };
    }
  },
});
