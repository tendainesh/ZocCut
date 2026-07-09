function doGet() {
  return HtmlService.createHtmlOutput('<p>ZOC CUT registration endpoint is running.</p>');
}

function doPost(e) {
  try {
    const sheetName = 'Responses';
    const spreadsheetId = '1x8Cyte_93mVh2mtEfA76DlrxWoqKk8V6DpY-Zn8aYKA';

    // Safely open the spreadsheet directly using the ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
  
    // Create the sheet and headers if they don't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      sheet.appendRow([
        'Timestamp', 'Full Name', 'Email', 'Phone', 
        'Campus', 'Faculty', 'Interest', 'How Heard', 'Updates'
      ]);
    }

    // Safely parse incoming data (Supports both standard Forms and JSON POST requests)
    let data = {};
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    // Map the incoming data to the spreadsheet columns
    const row = [
      new Date(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.campus || '',
      data.faculty || '',
      data.focus || '',      // Maps to "Interest" column
      data.message || '',    // Maps to "How Heard" column
      data.updates === 'true' || data.updates === true ? 'Yes' : 'No'
    ];

    // Append the data to the sheet
    sheet.appendRow(row);

    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Registration recorded successfully.' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return a clean error response if something breaks
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
