import { tool } from "ai";
import { z } from "zod";

export const getCurrentTimeTool = tool({
  description: "Get the current date and time",
  parameters: z.object({
    timezone: z.string().optional().describe('Timezone (optional), e.g. "America/New_York"'),
  }),
  execute: async ({ timezone }) => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    if (timezone) {
      options.timeZone = timezone;
    }

    return {
      currentTime: now.toLocaleString("en-US", options),
      timestamp: now.toISOString(),
      timezone: timezone || "Local",
    };
  },
});
