import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";

export const appendToFileTool = tool({
  description: "Appends text to the end of a file. Creates the file if it does not exist.",
  parameters: z.object({
    filePath: z.string().describe("Absolute or relative path to the file to append to."),
    text: z.string().describe("The text to append to the file."),
  }),
  execute: async ({ filePath, text }) => {
    try {
      await fs.appendFile(filePath, text, { encoding: "utf-8" });
      return {
        filePath,
        success: true,
        message: "Text appended to file successfully.",
      };
    } catch (error: any) {
      return {
        filePath,
        success: false,
        error: error.message || String(error),
      };
    }
  },
});
