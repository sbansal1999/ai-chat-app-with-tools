import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export const listFilesInFolderTool = tool({
  name: "listFilesInFolder",
  description: "List all file and folder names inside the given folder path.",
  parameters: z.object({
    folderPath: z.string().describe("The relative path to the folder, e.g. 'src/components'")
  }),
  async execute({ folderPath }) {
    const absPath = path.resolve(process.cwd(), folderPath);
    const entries = await fs.readdir(absPath);
    return { files: entries };
  },
});
