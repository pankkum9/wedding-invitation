# RSVP Backend Setup Instructions

## 🚀 Complete Setup Guide for Google Sheets + WhatsApp Integration

### **Step 1: Create Google Spreadsheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Pankaj & Sima Wedding RSVP"
4. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit`
   - ID is: `1ABC123DEF456GHI789JKL`

### **Step 2: Deploy Google Apps Script**

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the content from `google-apps-script.js`
4. **Replace these placeholders:**
   - `YOUR_SPREADSHEET_ID` → Your Google Sheets ID from Step 1
   - `YOUR_WHATSAPP_NUMBER` → Your WhatsApp number (with country code, no +)
   - `YOUR_PHONE_NUMBER_ID` → WhatsApp Business Phone Number ID
   - `YOUR_ACCESS_TOKEN` → WhatsApp Business API Access Token

5. **Deploy as Web App:**
   - Click "Deploy" → "New Deployment"
   - Choose "Web app" as type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - **Copy the Web App URL** (you'll need this)

### **Step 3: Update Website Configuration**

1. Open `script.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the Web App URL from Step 2

### **Step 4: WhatsApp Business API Setup**

#### **Option A: WhatsApp Business API (Advanced)**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add WhatsApp Business API
4. Get Phone Number ID and Access Token
5. Update the Google Apps Script with these values

#### **Option B: Simple Email Notifications (Easier)**
If WhatsApp setup is complex, you can use email notifications instead:

1. In `google-apps-script.js`, replace the `sendWhatsAppNotification(data);` line with:
   ```javascript
   sendEmailNotification(data);
   ```
2. Update the email address in the `sendEmailNotification` function

### **Step 5: Test the Setup**

1. Open your website
2. Fill out the RSVP form
3. Check your Google Sheets for the new entry
4. Check WhatsApp/Email for notification

## 🔧 **Alternative: Zapier Integration (No Coding)**

If the above seems complex, you can use Zapier:

1. **Create Google Form** with same fields
2. **Set up Zapier automation:**
   - Trigger: New Google Form Response
   - Action: Send WhatsApp message (via ClickSend or similar)
3. **Embed Google Form** in your website

## 📱 **WhatsApp Integration Services**

- **Twilio WhatsApp API** (easiest)
- **ClickSend WhatsApp**
- **MessageBird WhatsApp**
- **WhatsApp Business API** (most features)

## 🆘 **Need Help?**

If you need assistance with any step, I can:
1. Set up a simpler email-only version
2. Help with Zapier integration
3. Provide alternative solutions

## 📊 **What You'll Get**

✅ **Google Sheets Database** with all RSVP responses
✅ **Instant WhatsApp notifications** for each submission  
✅ **Beautiful form design** (unchanged)
✅ **Automatic data organization**
✅ **Real-time updates**

## 🔒 **Security Notes**

- Keep your API tokens secure
- Don't commit sensitive data to version control
- Use environment variables for production deployment
