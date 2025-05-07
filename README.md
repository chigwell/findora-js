# findora-js

[![npm version](https://badge.fury.io/js/findora-js.svg)](https://badge.fury.io/js/findora-js)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue)](https://www.linkedin.com/in/eugene-evstafev-716669181/)
[![Downloads](https://img.shields.io/npm/dy/findora-js)](https://img.shields.io/npm/dy/findora-js)

JavaScript wrapper for LLM-powered web search using `langchain-llm7` and `llmatch-js`. Returns structured JSON results extracted from LLM outputs.

---

## Installation

```bash
npm install findora
````

---

## Usage

```js
import Findora from 'findora';

const findora = new Findora();

const results = await findora.search('latest React state management libraries');
console.log(results);

for (const result of results) {
  console.log(`Name: ${result.name}`);
  console.log(`URL: ${result.url}`);
  console.log(`Description: ${result.description}`);
  console.log('---');
}
```

---

## API

### `new Findora(modelName = 'searchgpt')`

Creates a new instance. You can optionally pass a custom model name supported by `langchain-llm7`.

---

### `findora.search(query: string): Promise<Array<{ name: string, url: string, description: string }>>`

Performs a search using an LLM and returns an array of structured results.

---

## Project

* **Author**: [Eugene Evstafev](https://www.linkedin.com/in/eugene-evstafev-716669181/)
* **Repository**: [https://github.com/chigwell/findora-js](https://github.com/chigwell/findora-js)
* **License**: ISC

---

## Dependencies

* [langchain-llm7](https://www.npmjs.com/package/langchain-llm7)
* [llmatch-js](https://www.npmjs.com/package/llmatch-js)
