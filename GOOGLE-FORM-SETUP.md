# Google Form Integration Setup Guide

## 🎯 Current Status
Your website form is now ready to integrate with Google Forms! You just need to get the field IDs from your Google Form.

## 📋 Step-by-Step Instructions

### Step 1: Get Google Form Field IDs

1. **Open your Google Form**: 
   https://docs.google.com/forms/d/e/1FAIpQLScqSiiztU3o0vFpqcU4SALvgA93QRVA_5z4ubUbXy1S6uluZQ/viewform

2. **Right-click on the page** → **View Page Source**

3. **Search for "entry."** (Ctrl+F or Cmd+F)

4. **Find the field IDs** that look like this:
   ```
   entry.123456789
   entry.987654321
   ```

5. **Match them to your form fields**:
   - Name field → `entry.XXXXXXXXX`
   - Email field → `entry.XXXXXXXXX`
   - Phone field → `entry.XXXXXXXXX`
   - Attendance field → `entry.XXXXXXXXX`
   - Guests field → `entry.XXXXXXXXX`
   - Message field → `entry.XXXXXXXXX`

### Step 2: Update the JavaScript

Once you have the field IDs, replace the `XXXXXXXXX` placeholders in `script.js` (lines 155-160):

```javascript
// Replace these with your actual Google Form entry IDs
formData.append('entry.123456789', data.name);        // Name field
formData.append('entry.987654321', data.email);       // Email field  
formData.append('entry.555666777', data.phone);       // Phone field
formData.append('entry.111222333', data.attendance);  // Attendance field
formData.append('entry.444555666', data.guests || 'Just me'); // Guests field
formData.append('entry.777888999', data.message || ''); // Message field
```

## 🔧 Alternative: Easy Method

If you're having trouble finding the field IDs, here's an easier approach:

### Method 2: Direct Google Form Link

1. **Update your RSVP button** to link directly to your Google Form:

```html
<a href="https://docs.google.com/forms/d/e/1FAIpQLScqSiiztU3o0vFpqcU4SALvgA93QRVA_5z4ubUbXy1S6uluZQ/viewform" 
   target="_blank" class="rsvp-btn">
    <i class="fas fa-heart"></i>
    Send RSVP
</a>
```

2. **Replace the entire form** with this button in your HTML.

## 🎨 Method 3: Prefilled Google Form (Recommended)

Create a prefilled link that opens Google Form with some data:

```javascript
function openPrefillForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Create prefilled URL (you'll need to get the prefill IDs)
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScqSiiztU3o0vFpqcU4SALvgA93QRVA_5z4ubUbXy1S6uluZQ/viewform';
    const prefillUrl = `${baseUrl}?usp=pp_url&entry.XXXXXX=${encodeURIComponent(name)}&entry.YYYYYY=${encodeURIComponent(email)}`;
    
    window.open(prefillUrl, '_blank');
}
```

## 🚀 Testing

1. **Test the form** by filling it out on your website
2. **Check your Google Form responses** to see if data is being recorded
3. **Verify all fields** are mapping correctly

## 🔍 Troubleshooting

### If submissions aren't working:
1. **Check browser console** for errors (F12 → Console)
2. **Verify field IDs** are correct
3. **Test Google Form directly** to ensure it's working
4. **Check for CORS issues** (Google Forms sometimes blocks cross-origin requests)

### Fallback Options:
- **Direct Google Form link** (always works)
- **WhatsApp integration**: `https://wa.me/8892257020?text=RSVP%20for%20Wedding`
- **Email integration**: `mailto:your-email@gmail.com?subject=Wedding%20RSVP`

## 📱 Next Steps

1. **Get the field IDs** from your Google Form
2. **Update script.js** with the correct entry IDs
3. **Test the integration**
4. **Add fallback options** if needed

Let me know the field IDs and I'll update the code for you!
