import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";

export const modifyFileContentTool = tool({
  description: "Modifies a file by replacing specified text with new text.",
  parameters: z.object({
    filePath: z.string().describe("Absolute or relative path to the file to modify."),
    searchText: z.string().describe("The text to search for and replace in the file."),
    replaceText: z.string().describe("The text to replace the searchText with."),
  }),
  execute: async ({ filePath, searchText, replaceText }) => {
    try {
      const content = await fs.readFile(filePath, { encoding: "utf-8" });
      const modifiedContent = content.split(searchText).join(replaceText);
      await fs.writeFile(filePath, modifiedContent, { encoding: "utf-8" });
      return {
        filePath,
        success: true,
        message: `Replaced all occurrences of the specified text.`,
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
