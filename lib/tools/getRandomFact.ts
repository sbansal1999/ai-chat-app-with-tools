import { tool } from "ai";
import { z } from "zod";

export const getRandomFactTool = tool({
  description: "Get a random interesting fact",
  parameters: z.object({
    category: z.enum(["science", "history", "nature", "technology", "general"]).optional(),
  }),
  execute: async ({ category = "general" }) => {
    const facts = {
      science: [
        "A single cloud can weigh more than a million pounds.",
        "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old.",
        "The human brain contains approximately 86 billion neurons.",
      ],
      history: [
        "The Great Wall of China is not visible from space with the naked eye.",
        "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
        "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar in 1896.",
      ],
      nature: [
        "Octopuses have three hearts and blue blood.",
        'A group of flamingos is called a "flamboyance".',
        "Trees can communicate with each other through underground fungal networks.",
      ],
      technology: [
        "The first computer bug was an actual bug - a moth trapped in a Harvard computer in 1947.",
        "More than 90% of the world\'s data was created in the last two years.",
        "The first iPhone had the same computing power as NASA used to send humans to the moon.",
      ],
      general: [
        "Bananas are berries, but strawberries aren\'t.",
        'A group of pandas is called an "embarrassment".',
        "The unicorn is Scotland\'s national animal.",
      ],
    };

    const categoryFacts = facts[category];
    const randomFact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];

    return {
      fact: randomFact,
      category,
    };
  },
});
