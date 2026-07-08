function doGet() {
  return HtmlService.createHtmlOutput('ZOC CUT registration endpoint is running.');
}

function doPost(e) {
  const sheetName = 'Responses';
  const spreadsheetId = 'YOUR_SPREADSHEET_ID';
  let spreadsheet;

  if (spreadsheetId && spreadsheetId !== 'YOUR_SPREADSHEET_ID') {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create('ZOC CUT Registrations');
    }
  }

  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Campus',
      'Faculty',
      'Interest',
      'How Heard',
      'Updates'
    ]);
  }

  const data = e.parameter;
  const row = [
    new Date(),
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.campus || '',
    data.faculty || '',
    data.focus || '',
    data.message || '',
    data.updates === 'true' ? 'Yes' : 'No'
  ];

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}
