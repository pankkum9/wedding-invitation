// Google Apps Script for RSVP Backend Integration
// This code should be deployed as a Google Apps Script Web App

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([
        ['Timestamp', 'Name', 'Email', 'Phone', 'Attendance', 'Guests', 'Message']
      ]);
    }
    
    // Add the new response
    const timestamp = new Date();
    const newRow = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attendance || '',
      data.guests || '',
      data.message || ''
    ];
    
    sheet.appendRow(newRow);
    
    // Send WhatsApp notification
    sendWhatsAppNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing RSVP:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error submitting RSVP. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendWhatsAppNotification(data) {
  try {
    // WhatsApp Business API configuration
    const whatsappConfig = {
      phoneNumberId: 'YOUR_PHONE_NUMBER_ID', // Replace with your WhatsApp Business Phone Number ID
      accessToken: 'YOUR_ACCESS_TOKEN', // Replace with your WhatsApp Business API token
      recipientNumber: 'YOUR_WHATSAPP_NUMBER' // Replace with your WhatsApp number (with country code, no +)
    };
    
    // Format the message
    const message = `🎉 *New RSVP Received!*\n\n` +
                   `👤 *Name:* ${data.name}\n` +
                   `📧 *Email:* ${data.email}\n` +
                   `📱 *Phone:* ${data.phone}\n` +
                   `✅ *Attendance:* ${data.attendance === 'yes' ? 'Will Attend' : 'Cannot Attend'}\n` +
                   `👥 *Guests:* ${data.guests || 'Not specified'}\n` +
                   `💬 *Message:* ${data.message || 'No message'}\n\n` +
                   `📅 *Submitted:* ${new Date().toLocaleString()}`;
    
    // WhatsApp API endpoint
    const url = `https://graph.facebook.com/v18.0/${whatsappConfig.phoneNumberId}/messages`;
    
    // Prepare the payload
    const payload = {
      messaging_product: 'whatsapp',
      to: whatsappConfig.recipientNumber,
      type: 'text',
      text: {
        body: message
      }
    };
    
    // Send the message
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(url, options);
    console.log('WhatsApp notification sent:', response.getContentText());
    
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    // Don't throw error here to avoid breaking the main flow
  }
}

// Alternative: Simple email notification (if WhatsApp setup is complex)
function sendEmailNotification(data) {
  try {
    const subject = `New RSVP: ${data.name}`;
    const body = `New RSVP Received!\n\n` +
                 `Name: ${data.name}\n` +
                 `Email: ${data.email}\n` +
                 `Phone: ${data.phone}\n` +
                 `Attendance: ${data.attendance === 'yes' ? 'Will Attend' : 'Cannot Attend'}\n` +
                 `Guests: ${data.guests || 'Not specified'}\n` +
                 `Message: ${data.message || 'No message'}\n\n` +
                 `Submitted: ${new Date().toLocaleString()}`;
    
    // Replace with your email
    GmailApp.sendEmail('your-email@gmail.com', subject, body);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Test function to verify setup
function testFunction() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    attendance: 'yes',
    guests: '2',
    message: 'Looking forward to the wedding!'
  };
  
  console.log('Testing with data:', testData);
  sendWhatsAppNotification(testData);
}
