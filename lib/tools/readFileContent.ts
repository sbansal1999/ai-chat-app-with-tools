import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";

export const readFileContentTool = tool({
  description: "Reads a file from the filesystem and returns its content as a string.",
  parameters: z.object({
    filePath: z.string().describe("Absolute or relative path to the file to read."),
  }),
  execute: async ({ filePath }) => {
    try {
      const content = await fs.readFile(filePath, { encoding: "utf-8" });
      const numberedContent = content
        .split(/\r?\n/)
        .map((line, idx) => `${idx + 1}: ${line}`)
        .join("\n");
      return {
        filePath,
        content: numberedContent,
      };
    } catch (error: any) {
      return {
        filePath,
        error: error.message || String(error),
      };
    }
  },
});
