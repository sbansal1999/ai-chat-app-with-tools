import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export const createFolderTool = tool({
  description: "Create a new folder at the given path.",
  parameters: z.object({
    folderPath: z.string().describe("The relative path to the new folder, e.g. 'notes/new-folder'")
  }),
  async execute({ folderPath }) {
    const absPath = path.resolve(process.cwd(), folderPath);
    await fs.mkdir(absPath, { recursive: true });
    return { success: true, folderPath };
  },
});
