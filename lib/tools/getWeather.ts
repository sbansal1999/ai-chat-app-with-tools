import { tool } from "ai";
import { z } from "zod";

export const getWeatherTool = tool({
  description: "Get current weather information for a specific location",
  parameters: z.object({
    location: z.string().describe('The city and country, e.g. "San Francisco, CA"'),
  }),
  execute: async ({ location }) => {
    // Simulate weather API call
    const weatherConditions = ["sunny", "cloudy", "rainy", "snowy", "partly cloudy"];
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const temperature = Math.floor(Math.random() * 35) + 5; // 5-40°C

    return {
      location,
      temperature: `${temperature}°C`,
      condition,
      humidity: `${Math.floor(Math.random() * 40) + 30}%`,
      windSpeed: `${Math.floor(Math.random() * 20) + 5} km/h`,
    };
  },
});
