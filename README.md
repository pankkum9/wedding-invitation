# Wedding Invitation Scrape Results

## Overview
This directory contains all scraped data from the WedMeGood wedding invitation page:
**URL:** https://www.wedmegood.com/invite/gv/S-P/2153071

## Directory Structure

```
wedding_invitation_scrape/
├── README.md                    # This file
├── raw_page.html               # Original HTML content
├── enhanced_raw_page.html      # Enhanced HTML content
├── summary.txt                 # Basic scrape summary
├── enhanced_summary.txt        # Detailed scrape summary
├── data/                       # Structured data files
│   ├── content.json           # All text content extracted
│   ├── images.json            # Image metadata
│   ├── metadata.json          # Page metadata
│   ├── wedding_details.json   # Wedding-specific extracted data
│   └── enhanced_images.json   # Enhanced image metadata
└── images/                     # Downloaded images
    ├── [15 wedding-related images]
    └── [Various formats: JPG, PNG, SVG]
```

## What Was Extracted

### ✅ Successfully Extracted:
- **Page Title:** "S P Wedding Invite"
- **Images:** 15+ images downloaded (3.85 MB total)
- **Raw HTML:** Complete page source saved
- **All Text Content:** 233+ lines of text extracted
- **Metadata:** Page meta tags and links

### ⚠️ Partially Extracted:
- **Names:** Pattern matching found "Star" and "Above" (may be from page navigation)
- **Wedding Details:** Limited specific wedding information found

### ❌ Not Found:
- Specific bride/groom names
- Wedding date and time
- Venue details
- Event schedule
- RSVP information

## Technical Notes

1. **Content Loading:** The wedding invitation appears to use dynamic JavaScript loading
2. **Access Restrictions:** Some content may require authentication or special access
3. **Scraping Method:** Used both basic HTTP requests and enhanced pattern matching
4. **Image Downloads:** Successfully downloaded wedding-related photos and graphics

## Files Description

- **`raw_page.html`** - Original HTML as received from the server
- **`data/content.json`** - All extracted text content in structured format
- **`data/wedding_details.json`** - Attempted extraction of wedding-specific information
- **`images/`** - All downloaded images from the invitation page

## Usage

All data is saved in easily readable formats:
- JSON files can be opened with any text editor or JSON viewer
- Images are in standard formats (JPG, PNG, SVG)
- HTML files can be opened in any web browser

## Limitations

This scrape captured the publicly available content from the WedMeGood invitation page. The specific wedding details may be:
1. Loaded dynamically via JavaScript (requiring browser automation)
2. Protected behind authentication
3. Embedded in a format not easily extractable via standard web scraping

For more detailed extraction, consider:
- Using Selenium WebDriver for JavaScript rendering
- Checking if the invitation requires login/authentication
- Manual inspection of the page source for embedded data
