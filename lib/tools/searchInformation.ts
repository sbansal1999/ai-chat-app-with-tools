import { tool } from "ai";
import { z } from "zod";

export const searchInformationTool = tool({
  description: "Search for information on a specific topic",
  parameters: z.object({
    query: z.string().describe("Search query"),
    type: z.enum(["web", "news", "academic"]).optional().describe("Type of search"),
  }),
  execute: async ({ query, type = "web" }) => {
    // Simulate search results
    const results = [
      {
        title: `Understanding ${query}: A Comprehensive Guide`,
        snippet: `Learn everything you need to know about ${query} with this detailed overview covering key concepts, applications, and recent developments.`,
        url: `https://example.com/guide-to-${query.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        title: `Latest News on ${query}`,
        snippet: `Stay updated with the most recent developments and trends related to ${query} from trusted sources.`,
        url: `https://news.example.com/${query.toLowerCase().replace(/\s+/g, "-")}-updates`,
      },
      {
        title: `${query}: Best Practices and Tips`,
        snippet: `Discover expert tips and best practices for ${query} to help you get the most out of your experience.`,
        url: `https://tips.example.com/${query.toLowerCase().replace(/\s+/g, "-")}-tips`,
      },
    ];

    return {
      query,
      type,
      results,
      totalResults: results.length,
    };
  },
});
