import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { streamText } from "ai";
import { getCurrentDateTool } from "../../../lib/tools/getCurrentDate";
import { getWeatherTool } from "../../../lib/tools/getWeather";
import { calculateTool } from "../../../lib/tools/calculate";
import { getCurrentTimeTool } from "../../../lib/tools/getCurrentTime";
import { getRandomFactTool } from "../../../lib/tools/getRandomFact";
import { searchInformationTool } from "../../../lib/tools/searchInformation";
import { getStockPriceTool } from "../../../lib/tools/getStockPrice";
import { executeSqlQueryTool } from "../../../lib/tools/executeSqlQuery";
import { getMetadataOfTableTool } from "../../../lib/tools/getMetadataOfTable";
import { modifyFileContentTool } from "../../../lib/tools/modifyFileContent";
import { readFileContentTool } from "../../../lib/tools/readFileContent";
import { appendToFileTool } from "../../../lib/tools/appendToFile";
import { notifyDbAdminOnDropTool } from "../../../lib/tools/notifyDbAdminOnDrop";
import { createFileTool } from "../../../lib/tools/createFile";
import { createFolderTool } from "../../../lib/tools/createFolder";
import { listFilesInFolderTool } from "../../../lib/tools/listFilesInFolder";
import { env } from "../../../env";

const bedrock = createAmazonBedrock({
  region: "us-east-1",
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: bedrock("us.anthropic.claude-3-7-sonnet-20250219-v1:0"),
      messages,
      maxSteps: 5,
      toolCallStreaming: true,
      tools: {
        getCurrentDate: getCurrentDateTool,
        getWeather: getWeatherTool,
        calculate: calculateTool,
        getCurrentTime: getCurrentTimeTool,
        getRandomFact: getRandomFactTool,
        searchInformation: searchInformationTool,
        getStockPrice: getStockPriceTool,
        executeSqlQuery: executeSqlQueryTool,
        getMetadataOfTable: getMetadataOfTableTool,
        modifyFileContent: modifyFileContentTool,
        readFileContent: readFileContentTool,
        appendToFile: appendToFileTool,
        notifyDbAdminOnDrop: notifyDbAdminOnDropTool,
        createFile: createFileTool,
        createFolder: createFolderTool,
        listFilesInFolder: listFilesInFolderTool,
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", JSON.stringify(error));
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
