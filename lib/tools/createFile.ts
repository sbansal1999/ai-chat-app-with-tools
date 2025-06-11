import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export const createFileTool = tool({
  description: "Create a new file with the given path and content.",
  parameters: z.object({
    filePath: z.string().describe("The relative path to the new file, e.g. 'notes/hello.txt'"),
    content: z.string().describe("The content to write to the new file."),
  }),
  async execute({ filePath, content }) {
    const absPath = path.resolve(process.cwd(), filePath);
    await fs.mkdir(path.dirname(absPath), { recursive: true });
    await fs.writeFile(absPath, content, "utf8");
    return { success: true, filePath };
  },
});
