import { tool } from "ai";
import { z } from "zod";

export const getStockPriceTool = tool({
  description:
    "Get stock price for a given symbol. Returns current price if no dates provided, or price range between start and end dates if both are provided",
  parameters: z.object({
    symbol: z.string().describe('Stock symbol, e.g. "AAPL", "GOOGL", "TSLA"'),
    startDate: z.string().optional().describe("Start date in YYYY-MM-DD format for date range"),
    endDate: z.string().optional().describe("End date in YYYY-MM-DD format for date range"),
  }),
  execute: async ({ symbol, startDate, endDate }) => {
    const symbolUpper = symbol.toUpperCase();

    // If both start and end dates are provided, return price range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const prices = [];

      // Generate prices for each day between start and end
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const basePrice = Math.random() * 500 + 50; // Random price between $50-$550
        const volatility = (Math.random() - 0.5) * 0.1; // ±5% volatility
        const price = basePrice * (1 + volatility);

        prices.push({
          date: currentDate.toISOString().split("T")[0],
          price: `$${price.toFixed(2)}`,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return {
        symbol: symbolUpper,
        type: "range",
        startDate,
        endDate,
        prices,
      };
    }

    // No dates provided - return current price
    const basePrice = Math.random() * 500 + 50;
    const volatility = (Math.random() - 0.5) * 0.1;
    const price = basePrice * (1 + volatility);
    const now = new Date();

    return {
      symbol: symbolUpper,
      type: "current",
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      price: `$${price.toFixed(2)}`,
      currency: "USD",
      exchange: "NASDAQ",
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      change: `${(Math.random() - 0.5) * 10 > 0 ? "+" : ""}${((Math.random() - 0.5) * 10).toFixed(2)}%`,
    };
  },
});
