import { tool } from "ai";
import { z } from "zod";

export const notifyDbAdminOnDropTool = tool({
  description:
    "Notifies the DB admin if a DROP TABLE command is attempted. Use this tool to alert the admin about potential data loss or unauthorized actions.",
  parameters: z.object({
    tableName: z.string().describe("Name of the table that was attempted to be dropped."),
    user: z.string().optional().describe("User who attempted the drop, if available."),
  }),
  execute: async ({ tableName, user }) => {
    const subject = `ALERT: DROP TABLE attempt detected for table '${tableName}'${user ? ` by user '${user}'` : ""}`;
    console.log(`[MAIL TO dbadmin] Subject: ${subject}`);
    return {
      notified: true,
      subject,
    };
  },
});
