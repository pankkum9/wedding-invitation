# RSVP Backend Setup Instructions

## 🚀 Complete Setup Guide for Google Sheets + Email Notifications

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
   - `YOUR_SPREADSHEET_ID` → Your Google Sheets ID from Step 1 (✅ Already done: `1YJpRPGuhG2ssz3WQvYOmMkgx0rZWwfzTyMuZA6swvss`)
   - `your-email@gmail.com` → Your actual email address where you want to receive RSVP notifications

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

### **Step 4: Email Configuration (Already Done!)**

#### **📧 Email Notifications Setup**

✅ **Already Configured!** The system is now set to send beautiful HTML email notifications.

**What you'll receive:**
- 🎉 **Instant email notifications** for each RSVP submission
- 📊 **Formatted HTML emails** with all guest details
- 🎨 **Beautiful design** matching your wedding theme
- 📅 **Indian timezone** timestamps
- 💬 **Special messages** from guests highlighted

**Email Features:**
- ✅ **HTML formatted** with colors and styling
- ✅ **Plain text fallback** for all email clients
- ✅ **Professional sender name** ("Pankaj & Sima Wedding RSVP")
- ✅ **Clear subject lines** with guest names
- ✅ **Attendance status** color-coded (Green = Yes, Red = No)

### **Step 5: Test the Setup**

1. Open your website
2. Fill out the RSVP form
3. Check your Google Sheets for the new entry
4. Check your email for the notification

## 🔧 **Alternative: Zapier Integration (No Coding)**

If the above seems complex, you can use Zapier:

1. **Create Google Form** with same fields
2. **Set up Zapier automation:**
   - Trigger: New Google Form Response
   - Action: Send WhatsApp message (via ClickSend or similar)
3. **Embed Google Form** in your website

## 📱 **Why Arattai.in?**

- ✅ **Simple Setup** - No complex Facebook Developer setup
- ✅ **Direct WhatsApp Integration** - Send messages directly
- ✅ **Affordable Pricing** - Cost-effective for small businesses
- ✅ **Indian Service** - Better support for Indian numbers
- ✅ **Template Support** - Pre-approved message templates
- ✅ **Bulk Messaging** - Send to multiple recipients

## 🆘 **Need Help?**

If you need assistance with any step, I can:
1. Set up a simpler email-only version
2. Help with Zapier integration
3. Provide alternative solutions

## 📊 **What You'll Get**

✅ **Google Sheets Database** with all RSVP responses
✅ **Instant Email notifications** with beautiful HTML formatting  
✅ **Beautiful form design** (unchanged)
✅ **Automatic data organization**
✅ **Real-time updates**
✅ **No external API costs** - completely free!

## 🔒 **Security Notes**

- Keep your API tokens secure
- Don't commit sensitive data to version control
- Use environment variables for production deployment
