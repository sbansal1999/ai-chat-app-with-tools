import { tool } from "ai";
import { z } from "zod";

export const getCurrentDateTool = tool({
  description: "Get the current date and time in the local timezone",
  parameters: z.object({}),
  execute: async () => {
    const now = new Date();
    return {
      currentDate: now.toISOString().split("T")[0],
      currentTime: now.toTimeString().split(" ")[0],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
});
