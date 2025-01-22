import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { BaseMessage } from "@langchain/core/messages";
import type { BaseOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { env } from "../../env.mjs";

const DEFAULT_TIMEOUT = 1000 * 30;

type Provider = "openai" | "anthropic";

export function getLLMProvider({
  provider,
  temperature,
  maxTokens,
  modelName,
  // The following are only supported by openAI
  timeout = DEFAULT_TIMEOUT,
  respondWithJson = false,
}: {
  provider: Provider;
  temperature: number;
  maxTokens: number;
  timeout?: number;
  respondWithJson?: boolean;
  modelName?: string;
}): BaseChatModel {
  switch (provider) {
    case "openai": {
      return new ChatOpenAI({
        model: modelName ?? "gpt-4o",
        temperature,
        maxTokens,
        timeout,
        apiKey: env.OPEN_AI_API_KEY,
        modelKwargs: {
          response_format: {
            type: respondWithJson ? "json_object" : "text",
          },
        },
      });
    }

    case "anthropic": {
      return new ChatAnthropic({
        model: modelName ?? "claude-3-5-sonnet-latest",
        temperature,
        maxTokens,
        apiKey: "",
      });
    }

    default: {
      throw new Error("Unsupported provider:", provider);
    }
  }
}

export async function invokeLLMChain<T extends BaseOutputParser>({
  llm,
  promptMessages,
  parser,
}: {
  llm: BaseChatModel;
  promptMessages: BaseMessage[];
  parser: T;
}): Promise<ReturnType<T["parse"]>> {
  const chain = llm.pipe(parser);

  const response = await chain.invoke(promptMessages);

  return response as ReturnType<T["parse"]>;
}
