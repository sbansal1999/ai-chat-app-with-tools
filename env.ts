import { z } from "zod/v4";

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  SNOWFLAKE_ACCOUNT: z.string(),
  SNOWFLAKE_USERNAME: z.string(),
  SNOWFLAKE_PASSWORD: z.string(),
  SNOWFLAKE_DATABASE: z.string(),
  SNOWFLAKE_SCHEMA: z.string(),
  SNOWFLAKE_WAREHOUSE: z.string(),
  SNOWFLAKE_ROLE: z.string(),
});

export const env = envSchema.parse(process.env);
