const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

function readUrlPairsFromExcel(filePath) {
  // Always resolve from project root
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Excel file not found at path: ${resolvedPath}`);
  }

  const workbook = XLSX.readFile(resolvedPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map(row => ({
    path: row['Source'] ? row['Source'].trim() : '',
    expectedRedirect: row['Target'] ? row['Target'].trim() : ''
  })).filter(row => row.path && row.expectedRedirect);
}

module.exports = { readUrlPairsFromExcel };
