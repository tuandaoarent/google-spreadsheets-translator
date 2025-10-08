# Google Sheets Extension - Clasp Setup Guide

This guide will help you set up a bound project using clasp to test your extension on a specific Google Spreadsheet.

## 🚀 Prerequisites

1. **Install clasp CLI**:
   ```bash
   npm install -g @google/clasp
   ```

2. **Enable Google Apps Script API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the "Google Apps Script API"
   - Create credentials (OAuth 2.0 Client ID)

## 📋 Step-by-Step Setup

### Step 1: Login to clasp
```bash
clasp login
```
This will open your browser to authenticate with Google.

### Step 2: Create a Bound Project

#### Option A: Create from existing spreadsheet
```bash
# Get the spreadsheet ID from the URL
# https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
clasp create --type sheets --title "Hello World Extension" --parentId SPREADSHEET_ID
```

#### Option B: Create new spreadsheet with bound script
```bash
clasp create --type sheets --title "Hello World Extension"
```

### Step 3: Update .clasp.json
After creating the project, clasp will update your `.clasp.json` with the script ID:
```json
{
  "scriptId": "YOUR_SCRIPT_ID_HERE",
  "rootDir": "./src"
}
```

### Step 4: Push your code
```bash
clasp push
```

### Step 5: Open in Apps Script Editor
```bash
clasp open
```

### Step 6: Test the Extension
1. In the Apps Script editor, run the `onOpen` function
2. Go to your Google Spreadsheet
3. Look for the "Hello World Extension" menu
4. Click "Open Hello World" to test the sidebar

## 🔧 Development Workflow

### Push changes to Google Apps Script
```bash
clasp push
```

### Pull changes from Google Apps Script
```bash
clasp pull
```

### Deploy the extension
```bash
clasp deploy
```

### View deployment status
```bash
clasp deployments
```

## 📁 Project Structure

```
google-spread-sheet-translator/
├── .clasp.json              # Clasp configuration
├── src/                    # Source files directory
│   ├── Code.gs             # Main Apps Script code
│   ├── Sidebar.html        # HTML interface
│   └── appsscript.json     # Apps Script manifest
├── Code.gs                  # Root level files (backup)
├── Sidebar.html
├── appsscript.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **"clasp: command not found"**:
   - Make sure clasp is installed globally: `npm install -g @google/clasp`
   - Check your PATH environment variable

2. **Authentication errors**:
   - Run `clasp logout` then `clasp login` again
   - Make sure you have the correct Google account selected

3. **Permission errors**:
   - Ensure the Google Apps Script API is enabled
   - Check that your OAuth credentials are properly configured

4. **Script not found**:
   - Verify the script ID in `.clasp.json` is correct
   - Make sure you have access to the script

### Useful Commands

```bash
# Check login status
clasp login --status

# List your projects
clasp list

# Get project info
clasp status

# View logs
clasp logs

# Open in browser
clasp open --webapp
```

## 🎯 Next Steps

Once your bound project is set up:

1. **Test locally**: Make changes and push with `clasp push`
2. **Debug**: Use `clasp logs` to view execution logs
3. **Deploy**: Use `clasp deploy` to create a deployment
4. **Share**: Share the spreadsheet with others to test the extension

## 📚 Additional Resources

- [Clasp Documentation](https://github.com/google/clasp)
- [Apps Script CLI Guide](https://developers.google.com/apps-script/guides/clasp)
- [Google Apps Script API](https://developers.google.com/apps-script/api)

