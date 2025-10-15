const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Paths
const excelPath = path.resolve('cypress/fixtures/redirects-excel.xlsx');
const jsonPath = path.resolve('cypress/fixtures/redirects.json');

// Read Excel
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// Map to desired format
const redirects = data.map(row => ({
  path: row['Source'] ? row['Source'].trim() : '',
  expectedRedirect: row['Target'] ? row['Target'].trim() : ''
})).filter(row => row.path && row.expectedRedirect);

// Ensure output folder exists
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });

// Write JSON
fs.writeFileSync(jsonPath, JSON.stringify(redirects, null, 2));
console.log(`Redirects saved to ${jsonPath} (${redirects.length} entries)`);
