import Findora from './src/index.js';

const findora = new Findora();

const results = await findora.search('latest React state management libraries');
console.log(results);

for (const result of results) {
  console.log(`Name: ${result.name}`);
  console.log(`URL: ${result.url}`);
  console.log(`Description: ${result.description}`);
  console.log('---');
}
