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
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
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
