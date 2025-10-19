// Google Apps Script for RSVP Backend Integration
// This code should be deployed as a Google Apps Script Web App

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const spreadsheetId = '1YJpRPGuhG2ssz3WQvYOmMkgx0rZWwfzTyMuZA6swvss'; // Replace with your Google Sheets ID
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
    
    // Send Email notification
    sendEmailNotification(data);
    
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

function sendArattaiNotification(data) {
  try {
    // Arattai.in API configuration
    const arattaiConfig = {
      apiKey: 'YOUR_ARATTAI_API_KEY', // Replace with your Arattai API key
      recipientNumber: 'YOUR_WHATSAPP_NUMBER', // Replace with your WhatsApp number (with country code, no +)
      templateId: 'YOUR_TEMPLATE_ID' // Optional: Replace with your template ID if using templates
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
    
    // Arattai API endpoint
    const url = 'https://api.arattai.in/api/v1/send-message';
    
    // Prepare the payload
    const payload = {
      api_key: arattaiConfig.apiKey,
      to: arattaiConfig.recipientNumber,
      message: message,
      type: 'text'
    };
    
    // Send the message
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    
    if (responseData.success) {
      console.log('Arattai notification sent successfully:', responseData);
    } else {
      console.error('Arattai notification failed:', responseData);
    }
    
  } catch (error) {
    console.error('Error sending Arattai notification:', error);
    // Don't throw error here to avoid breaking the main flow
  }
}

// Email notification for RSVP submissions
function sendEmailNotification(data) {
  try {
    const subject = `🎉 New Wedding RSVP: ${data.name}`;
    
    // Create a nicely formatted HTML email
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf8f5;">
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #d4a574; text-align: center; margin-bottom: 30px;">🎉 New RSVP Received!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #2c2c2c; margin-top: 0;">Guest Details:</h3>
            <p><strong>👤 Name:</strong> ${data.name}</p>
            <p><strong>📧 Email:</strong> ${data.email}</p>
            <p><strong>📱 Phone:</strong> ${data.phone}</p>
            <p><strong>✅ Attendance:</strong> <span style="color: ${data.attendance === 'yes' ? '#4CAF50' : '#f44336'}; font-weight: bold;">${data.attendance === 'yes' ? 'Will Attend ✅' : 'Cannot Attend ❌'}</span></p>
            <p><strong>👥 Number of Guests:</strong> ${data.guests || 'Not specified'}</p>
          </div>
          
          ${data.message ? `
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4CAF50;">
            <h4 style="color: #2c2c2c; margin-top: 0;">💬 Special Message:</h4>
            <p style="font-style: italic; color: #555;">"${data.message}"</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">📅 Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p style="color: #d4a574; font-weight: bold;">Pankaj & Sima Wedding</p>
          </div>
        </div>
      </div>
    `;
    
    // Plain text version for email clients that don't support HTML
    const textBody = `New RSVP Received for Pankaj & Sima Wedding!\n\n` +
                     `👤 Name: ${data.name}\n` +
                     `📧 Email: ${data.email}\n` +
                     `📱 Phone: ${data.phone}\n` +
                     `✅ Attendance: ${data.attendance === 'yes' ? 'Will Attend' : 'Cannot Attend'}\n` +
                     `👥 Guests: ${data.guests || 'Not specified'}\n` +
                     `💬 Message: ${data.message || 'No special message'}\n\n` +
                     `📅 Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
    
    // Replace with your email address
    const recipientEmail = 'pankkum9@zohomail.in'; // UPDATE THIS WITH YOUR EMAIL
    
    // Send the email
    GmailApp.sendEmail(recipientEmail, subject, textBody, {
      htmlBody: htmlBody,
      name: 'Pankaj & Sima Wedding RSVP'
    });
    
    console.log('Email notification sent successfully to:', recipientEmail);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error to avoid breaking the main flow
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
  sendEmailNotification(testData);
}
