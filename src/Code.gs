/**
 * Google Sheets Extension - Hello World
 * This is the main Apps Script file that handles the backend logic
 */

/**
 * Creates the menu item in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Hello World Extension')
    .addItem('Open Hello World', showHelloWorld.name)
    .addToUi();
}

/**
 * Shows the Hello World sidebar
 */
function showHelloWorld() {
  const html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Hello World Extension')
    .setWidth(300);

  SpreadsheetApp.getUi().showSidebar(html);
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

/**
 * Translates the current cell content using LanguageApp.translate()
 * @param {string} sourceLanguage - Source language code (e.g., 'en', 'fr', 'auto')
 * @param {string} targetLanguage - Target language code (e.g., 'es', 'de')
 * @return {Object} Result object with success status and message
 */
function translateCurrentCell(sourceLanguage, targetLanguage) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const activeCell = sheet.getActiveCell();

    // Get current cell value
    const cellValue = activeCell.getValue();

    // Check if cell has content
    if (!cellValue || cellValue.toString().trim() === '') {
      return {
        success: false,
        message: 'No content found in the selected cell'
      };
    }

    // Handle auto-detect source language
    let sourceLang = sourceLanguage;
    if (sourceLanguage === 'auto') {
      sourceLang = ''; // LanguageApp.translate uses empty string for auto-detection
    }

    // Use LanguageApp.translate for direct translation
    const translatedText = LanguageApp.translate(cellValue.toString(), sourceLang, targetLanguage);

    // Set the translated result directly in the cell
    activeCell.setValue(translatedText);

    return {
      success: true,
      message: `Translation completed from ${sourceLanguage} to ${targetLanguage}`,
      originalValue: cellValue.toString(),
      translatedValue: translatedText
    };

  } catch (error) {
    return {
      success: false,
      message: `Error during translation: ${error.message}`
    };
  }
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
