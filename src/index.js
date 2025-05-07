import { ChatLLM7 } from 'langchain-llm7';
import { llmatch } from 'llmatch-js';

export class Findora {
  constructor(modelName = 'searchgpt') {
    this.chat = new ChatLLM7({ modelName });
  }

  async search(query) {
    if (!query.trim()) throw new Error('Empty query provided');

    const llm = {
      invoke: async (messages, options = {}) => {
        const response = await this.chat.invoke(messages);
        return { content: response.content, raw: response };
      },
    };

    const result = await llmatch({
      llm,
      query: `Search about: ${query}. Return JSON in format {"results":[{"name":"","url":"","description":""}]} with 10 results please.`,
      pattern: /```json\n([\s\S]*?)```/,
      verbose: false,
    });

    if (result.success) {
      const parsed = JSON.parse(result.extractedData[0]);
      return parsed.results || [];
    } else {
      throw new Error(result.errorMessage || 'Unknown extraction error');
    }
  }
}

export default Findora;
