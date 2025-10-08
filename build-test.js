const fs = require('fs');
const path = require('path');

function buildTestVersion() {
  // Read the main HTML file
  let html = fs.readFileSync(path.join(__dirname, 'src', 'Sidebar.html'), 'utf8');
  
  // Read the stylesheet
  const stylesheet = fs.readFileSync(path.join(__dirname, 'src', 'Stylesheet.html'), 'utf8');
  
  // Read the javascript
  const javascript = fs.readFileSync(path.join(__dirname, 'src', 'Javascript.html'), 'utf8');
  
  // Replace the includes with actual content
  html = html.replace('<?!= include(\'Stylesheet\'); ?>', stylesheet);
  html = html.replace('<?!= include(\'Javascript\'); ?>', javascript);
  
  // Write the merged file
  fs.writeFileSync(path.join(__dirname, 'test', 'Sidebar.html'), html);
  
  console.log('Test version built: test/Sidebar.html');
  console.log('Open this file in your browser for testing');
}

buildTestVersion();
