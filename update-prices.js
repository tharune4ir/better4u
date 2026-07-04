const fs = require('fs');
let content = fs.readFileSync('lib/store-data.ts', 'utf8');

const prices = {
  'alive': 85,
  'josh': 110,
  'batch': 140,
  'pulp': 135,
  'steep': 75,
  'grit': 95
};

const regex = /price:\s*60\s*,([\s\S]*?)brandId:\s*['"]([a-z]+)['"]/g;
content = content.replace(regex, (match, p1, brand) => {
  if (prices[brand]) {
    return `price: ${prices[brand]},${p1}brandId: "${brand}"`;
  }
  return match;
});

fs.writeFileSync('lib/store-data.ts', content);
console.log('Prices updated successfully!');
