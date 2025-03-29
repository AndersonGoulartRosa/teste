import OpenAI from "openai";
import { type Page, TaskMessage, TaskResult } from "./types";
import { prompt } from "./prompt";
import { createActions } from "./createActions";

const defaultDebug = process.env.AUTO_PLAYWRIGHT_DEBUG === "true";



export const completeTask = async (
  page: Page,
  task: TaskMessage
): Promise<TaskResult> => {
  const openai = new OpenAI({
    apiKey: task.options?.openaiApiKey,
    baseURL: task.options?.openaiBaseUrl,
    defaultQuery: task.options?.openaiDefaultQuery,
    defaultHeaders: task.options?.openaiDefaultHeaders,
  });

  let lastFunctionResult: null | { errorMessage: string } | { query: string } =
    null;


  const actions = createActions(page);

  const debug = task.options?.debug ?? defaultDebug;

  const runner = openai.beta.chat.completions
    .runTools({
      model: task.options?.model ?? "gpt-4o",
      messages: [{ role: "user", content: prompt(task) }],
      tools: Object.values(actions).map((action) => ({
        type: "function",
        function: action,
      })),
      tool_choice: "auto", 
    });

    console.log("> runner runner:", JSON.stringify(runner, null, 2));

    if (runner.choices?.[0]?.message?.tool_calls) {
      for (const toolCall of runner.choices[0].message.tool_calls) {
        console.log("Tool chamada:", toolCall.function.name);
    
        if (toolCall.function.name === "clickButton") {
          await page.click(toolCall.function.arguments.selector);
        }
      }
    } else {
      console.log("Nenhuma tool_call foi feita.");
    }
    ll
  

    runner.on("message", (message) => {
      console.log("> Received message:", JSON.stringify(message, null, 2));

    
      if (message.role === "assistant") {
        if (message.tool_calls && message.tool_calls.length > 0) {
          console.log("> tool_calls:", JSON.stringify(message.tool_calls, null, 2));
    
          if (message.tool_calls[0].function?.arguments) {
            try {
              lastFunctionResult = JSON.parse(
                message.tool_calls[0].function.arguments
              );
            } catch (error) {
              console.error("Error parsing function arguments:", error);
            }
          } else {
            console.warn("No function arguments found in tool_calls");
          }
        } else {
          console.warn("No tool calls detected in assistant response!");
        }
      }
    });
    

  const finalContent = await runner.finalContent();

  if (debug) {
    console.log("> finalContent", finalContent);
  }

  if (!lastFunctionResult) {
    console.error("Error: No function result received!");
    return { errorMessage: "No result received from AI" }; 
  }

  if (debug) {
    console.log("> lastFunctionResult", lastFunctionResult);
  }

  return lastFunctionResult;
};
