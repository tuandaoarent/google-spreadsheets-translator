/**
 * Google Spreadsheet Translator
 * This is the main Apps Script file that handles the backend logic
 */

/**
 * Creates the menu item in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Spreadsheet Translator')
    .addItem('Open Translator', showSidebar.name)
    .addToUi();
}

/**
 * Shows the translator sidebar
 */
function showSidebar() {
  const html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Spreadsheet Translator')
    .setWidth(300);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Translates the current cell content using LanguageApp.translate()
 * @param {string} sourceLanguage - Source language code (e.g., 'en', 'fr', 'auto')
 * @param {string} targetLanguage - Target language code (e.g., 'es', 'de')
 * @return {Object} Result object with success status and message
 */
function translateCurrentCell(sourceLanguage, targetLanguage) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeCell = sheet.getActiveCell();

  // Get current cell value
  const cellValue = activeCell.getValue();

  // Check if cell has content
  if (!cellValue || cellValue.toString().trim() === '') {
    throw new Error('No content found in the selected cell');
  }

  // Handle auto-detect source language
  if (sourceLanguage === 'auto') {
    sourceLanguage = ''; // LanguageApp.translate uses empty string for auto-detection
  }

  // Use LanguageApp.translate for direct translation
  const translatedText = LanguageApp.translate(cellValue.toString(), sourceLanguage, targetLanguage);

  // Set the translated result directly in the cell
  activeCell.setValue(translatedText);
}

function translateCurrentSheet(sourceLanguage, targetLanguage) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange(); // Gets the range with data
  const values = dataRange.getValues();

  if (sourceLanguage === 'auto') {
    sourceLanguage = '';
  }

  // Iterate through rows and columns
  for (let row = 0; row < values.length; row++) {
    for (let col = 0; col < values[row].length; col++) {
      const cellValue = values[row][col];

      if (!cellValue || cellValue.toString().trim() === '') {
        continue;
      }

      const translatedText = LanguageApp.translate(cellValue.toString(), sourceLanguage, targetLanguage)
      sheet.getRange(row + 1, col + 1).setValue(translatedText);;
    }
  }
}

/**
 * Translates only the selected cells in the current sheet
 * @param {string} sourceLanguage - Source language code (e.g., 'en', 'fr', 'auto')
 * @param {string} targetLanguage - Target language code (e.g., 'es', 'de')
 */
function translateSelected(sourceLanguage, targetLanguage) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const selection = sheet.getSelection();
  const activeRange = selection.getActiveRange();

  // Check if there's a valid selection
  if (!activeRange) {
    throw new Error('No cells selected. Please select the cells you want to translate.');
  }

  // Handle auto-detect source language
  if (sourceLanguage === 'auto') {
    sourceLanguage = ''; // LanguageApp.translate uses empty string for auto-detection
  }

  // Get the values from the selected range
  const values = activeRange.getValues();
  const numRows = values.length;
  const numCols = values[0].length;

  // Iterate through the selected cells
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cellValue = values[row][col];

      // Skip empty cells
      if (!cellValue || cellValue.toString().trim() === '') {
        continue;
      }

      try {
        // Translate the cell content
        const translatedText = LanguageApp.translate(cellValue.toString(), sourceLanguage, targetLanguage);
        
        // Set the translated result back to the cell
        activeRange.getCell(row + 1, col + 1).setValue(translatedText);
      } catch (error) {
        console.error(`Error translating cell at row ${row + 1}, col ${col + 1}:`, error);
        // Continue with other cells even if one fails
      }
    }
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Gets the current sheet name
 * @return {string} The name of the active sheet
 */
function getCurrentSheetName() {
  return SpreadsheetApp.getActiveSheet().getName();
}

/**
 * Gets the current cell value
 * @return {string} The value of the active cell
 */
function getCurrentCellValue() {
  const activeCell = SpreadsheetApp.getActiveSheet().getActiveCell();
  return activeCell.getValue();
}

/**
 * Sets a value in the active cell
 * @param {string} value - The value to set
 */
function setActiveCellValue(value) {
  const activeCell = SpreadsheetApp.getActiveSheet().getActiveCell();
  activeCell.setValue(value);
}

/**
 * Duplicates the currently active sheet
 * @return {string} The name of the duplicated sheet
 */
function duplicateActiveSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const originalName = activeSheet.getName();
  
  // Create a copy of the active sheet
  const duplicatedSheet = activeSheet.copyTo(spreadsheet);
  
  // Generate a new name for the duplicated sheet
  const timestamp = new Date().toLocaleString();
  const newName = `${originalName} - Copy (${timestamp})`;
  
  // Set the new name for the duplicated sheet
  duplicatedSheet.setName(newName);
  
  // Activate the duplicated sheet
  duplicatedSheet.activate();
  
  return newName;
}

/**
 * Gets information about the current spreadsheet
 * @return {Object} Spreadsheet information
 */
function getSpreadsheetInfo() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  return {
    spreadsheetName: spreadsheet.getName(),
    sheetName: sheet.getName(),
    lastRow: sheet.getLastRow(),
    lastColumn: sheet.getLastColumn(),
    activeCellAddress: sheet.getActiveCell().getA1Notation()
  };
}
