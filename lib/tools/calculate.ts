import { tool } from "ai";
import { z } from "zod";

export const calculateTool = tool({
  description: "Perform mathematical calculations",
  parameters: z.object({
    expression: z.string().describe('Mathematical expression to evaluate, e.g. "2 + 2" or "sqrt(16)"'),
  }),
  execute: async ({ expression }) => {
    try {
      // Simple calculator - in production, use a proper math parser
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, "");
      const result = Function(`"use strict"; return (${sanitized})`)();
      return {
        expression,
        result: result.toString(),
      };
    } catch (error) {
      return {
        expression,
        result: "Error: Invalid mathematical expression",
      };
    }
  },
});
