# Google Sheets Extension - Hello World

A simple Google Sheets extension (add-on) that demonstrates basic functionality including reading spreadsheet data, updating cells, and providing a custom sidebar interface.

## 🚀 Features

- **Custom Menu**: Adds a "Hello World Extension" menu to Google Sheets
- **Interactive Sidebar**: Beautiful sidebar with spreadsheet information
- **Cell Operations**: Read and update active cell values
- **Real-time Info**: Display current spreadsheet, sheet, and cell information
- **Modern UI**: Clean, responsive design with gradient styling

## 📁 Project Structure

```
google-spread-sheet-translator/
├── appsscript.json          # Apps Script manifest
├── Code.gs                  # Main backend logic
├── Sidebar.html            # Frontend HTML interface
└── README.md               # This file
```

## 🛠️ Step-by-Step Setup Guide

### Prerequisites

1. **Install clasp CLI** (for advanced development):
   ```bash
   npm install -g @google/clasp
   ```

2. **Clone and setup the project**:
   ```bash
   git clone <your-repo-url>
   cd google-spread-sheet-translator
   ```

3. **Create configuration files**:
   ```bash
   # Copy the template files
   cp .clasp.json.example .clasp.json
   cp .claspignore.example .claspignore
   ```

4. **Configure your project**:
   - Edit `.clasp.json` and replace `YOUR_SCRIPT_ID_HERE` and `YOUR_SPREADSHEET_ID_HERE` with your actual IDs
   - Customize `.claspignore` if needed

### Step 1: Create a New Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default `Code.gs` content
4. Copy the contents of our `Code.gs` file into the editor

### Step 2: Add the HTML File

1. In the Apps Script editor, click the **"+"** button next to "Files"
2. Select **"HTML"**
3. Name it `Sidebar`
4. Copy the contents of our `Sidebar.html` file into the editor

### Step 3: Configure the Manifest

1. Click on `appsscript.json` in the file list
2. If it doesn't exist, create it by clicking **"+"** → **"JSON"**
3. Copy the contents of our `appsscript.json` file

### Step 4: Test the Extension

1. **Save the project**: Press `Ctrl+S` (or `Cmd+S` on Mac)
2. **Run the onOpen function**:
   - Click on `Code.gs` in the file list
   - Select `onOpen` from the function dropdown
   - Click the **"Run"** button
   - Grant permissions when prompted

3. **Test in Google Sheets**:
   - Open a new Google Sheets document
   - You should see a new menu called "Hello World Extension"
   - Click on it and select "Open Hello World"
   - The sidebar should appear with spreadsheet information

### Step 5: Development with Clasp (Optional but Recommended)

If you want to use clasp for easier development:

1. **Login to clasp**:
   ```bash
   clasp login
   ```

2. **Create a bound project**:
   ```bash
   # Option A: Create from existing spreadsheet
   clasp create --type sheets --title "Hello World Extension" --parentId YOUR_SPREADSHEET_ID
   
   # Option B: Create new spreadsheet with bound script
   clasp create --type sheets --title "Hello World Extension"
   ```

3. **Push your code**:
   ```bash
   clasp push
   ```

4. **Open in Apps Script editor**:
   ```bash
   clasp open
   ```

5. **Development workflow**:
   ```bash
   # Push changes to Google Apps Script
   clasp push
   
   # Pull changes from Google Apps Script
   clasp pull
   
   # View logs
   clasp logs
   ```

### Step 6: Deploy as an Extension

#### Option A: Install for Personal Use

1. In Apps Script editor, click **"Deploy"** → **"New deployment"**
2. Choose **"Add-on"** as the type
3. Fill in the details:
   - **Description**: "Hello World Extension for Google Sheets"
   - **Version**: "1"
4. Click **"Deploy"**
5. Copy the deployment ID

#### Option B: Publish to Google Workspace Marketplace (Advanced)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API and Google Apps Script API
4. Create OAuth 2.0 credentials
5. Configure the add-on in Apps Script with proper permissions

## 🎯 How to Use

1. **Open the Extension**: 
   - In any Google Sheets document, go to **Extensions** → **Hello World Extension** → **Open Hello World**

2. **View Information**:
   - The sidebar shows current spreadsheet name, sheet name, active cell, and cell value

3. **Update Cells**:
   - Type a new value in the input field
   - Click **"Update Cell"** to set the active cell to that value

4. **Say Hello**:
   - Click **"Say Hello"** to add a hello message to the active cell

5. **Refresh Info**:
   - Click **"Refresh Info"** to update the displayed information

## 🔧 Customization

### Adding New Features

1. **Backend Functions** (in `Code.gs`):
   ```javascript
   function yourNewFunction() {
     // Your code here
     return "result";
   }
   ```

2. **Frontend Integration** (in `Sidebar.html`):
   ```javascript
   function callYourFunction() {
     google.script.run
       .withSuccessHandler(function(result) {
         // Handle success
       })
       .withFailureHandler(function(error) {
         // Handle error
       })
       .yourNewFunction();
   }
   ```

### Styling Changes

Modify the CSS in the `<style>` section of `Sidebar.html` to customize:
- Colors and gradients
- Button styles
- Layout and spacing
- Typography

## 🐛 Troubleshooting

### Common Issues

1. **"Script function not found"**:
   - Make sure function names match exactly
   - Check that functions are in `Code.gs`

2. **Permission errors**:
   - Re-run the `onOpen` function to grant permissions
   - Check that all required APIs are enabled

3. **Sidebar not appearing**:
   - Verify the HTML file is named exactly `Sidebar.html`
   - Check browser console for JavaScript errors

4. **Menu not showing**:
   - Refresh the Google Sheets page
   - Re-run the `onOpen` function in Apps Script

### Debug Tips

1. **Use `console.log()`** in your Apps Script functions
2. **Check the Apps Script execution log** for errors
3. **Use browser developer tools** to debug frontend issues
4. **Test functions individually** using the Apps Script editor

## 📚 Next Steps

Once you have the basic extension working, you can:

1. **Add more functionality**:
   - Read/write multiple cells
   - Create charts and graphs
   - Import/export data
   - Connect to external APIs

2. **Improve the UI**:
   - Add more interactive elements
   - Implement data validation
   - Create custom dialogs

3. **Deploy publicly**:
   - Submit to Google Workspace Marketplace
   - Add proper error handling
   - Implement user authentication

## 🔗 Useful Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [Apps Script HTML Service](https://developers.google.com/apps-script/guides/html)
- [Google Workspace Marketplace](https://workspace.google.com/marketplace)

## 📄 License

This project is open source and available under the MIT License.

