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
      query: `Search about: "${query}". Return JSON in format {"results":[{"name":"","url":"","description":""}]} with 10 results please.`,
      pattern: /```json\n([\s\S]*?)```/,
      verbose: false,
    });

    if (result.success) {
      const rawJson = result.extractedData[0].trim();

      try {
        const parsed = JSON.parse(rawJson);

        if (Array.isArray(parsed)) {
          return parsed; // handle case where model returns an array directly
        } else if (parsed && Array.isArray(parsed.results)) {
          return parsed.results;
        } else {
          console.error('Parsed JSON structure is not recognized:', parsed);
          return [];
        }
      } catch (err) {
        console.error('Failed to parse extracted JSON:', rawJson);
        console.error('Parse error:', err.message);
        return [];
      }
    }

  }
}

export default Findora;
