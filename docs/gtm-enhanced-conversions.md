# GTM Enhanced Conversions Setup Guide

This guide provides step-by-step instructions for configuring Google Ads Enhanced Conversions through Google Tag Manager (GTM) for the consumerlawflorida.com website.

## Prerequisites

1. **Google Ads Account**: Ensure Enhanced Conversions is enabled
   - Go to Google Ads → Goals → Conversions
   - Select your conversion action
   - Click "Settings" → Enable "Enhanced Conversions"
   - Accept customer data terms

2. **GTM Container**: Access to your GTM container (GTM-WBZHLG3Z)
   - Ensure you have edit permissions
   - Conversion Linker tag should already exist and fire on all pages

## Data Layer Structure

When a form is submitted, the following data is pushed to `window.dataLayer`:

```javascript
{
  event: "lead_form_submit",
  form_name: "free_case_review" | "contact_form" | "free_case_review_dialog",
  page_path: "/current-path",
  method: "web_form",
  user_data: {
    email: "user@example.com",           // Lowercased, trimmed
    phone_number: "+15612647211",        // E.164 format or empty string
    address: {
      first_name: "Jane",                 // Trimmed or empty string
      last_name: "Doe",                   // Trimmed or empty string
      postal_code: "12345",              // Trimmed or empty string
      country: "US"                       // Always "US"
    }
  }
}
```

## Step 1: Create Data Layer Variables (DLVs)

Create the following Data Layer Variables in GTM:

### Variable Configuration

1. **DLV - user_data.email**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.email`
   - Data Layer Version: Version 2

2. **DLV - user_data.phone_number**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.phone_number`
   - Data Layer Version: Version 2

3. **DLV - user_data.address.first_name**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.address.first_name`
   - Data Layer Version: Version 2

4. **DLV - user_data.address.last_name**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.address.last_name`
   - Data Layer Version: Version 2

5. **DLV - user_data.address.postal_code**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.address.postal_code`
   - Data Layer Version: Version 2

6. **DLV - user_data.address.country**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: `user_data.address.country`
   - Data Layer Version: Version 2

## Step 2: Create or Verify Trigger

1. Go to **Triggers** in GTM
2. Check if a trigger named "lead_form_submit" already exists
   - If it exists: Verify it's set to fire on Custom Event `lead_form_submit`
   - If it doesn't exist: Create a new trigger:
     - Trigger Type: Custom Event
     - Event Name: `lead_form_submit`
     - This trigger fires on: All Custom Events

## Step 3: Configure Google Ads Conversion Tag

1. Go to **Tags** in GTM
2. Find your existing Google Ads Conversion Tag (or create a new one)
3. Click to edit the tag
4. In the tag configuration, find **"Enhanced Conversions"** or **"User-provided data"** section
5. Enable Enhanced Conversions
6. Select **"User-provided data"** as the data source
7. Map the fields using the DLVs created in Step 1:

   - **Email**: `{{DLV - user_data.email}}`
   - **Phone Number**: `{{DLV - user_data.phone_number}}`
   - **First Name**: `{{DLV - user_data.address.first_name}}`
   - **Last Name**: `{{DLV - user_data.address.last_name}}`
   - **Postal Code**: `{{DLV - user_data.address.postal_code}}`
   - **Country**: `{{DLV - user_data.address.country}}`

8. Set the trigger to: `lead_form_submit` (created/verified in Step 2)
9. Save the tag

## Step 4: Verify Conversion Linker Tag

1. Go to **Tags** in GTM
2. Find the **Conversion Linker** tag
3. Ensure it's set to fire on: **All Pages**
4. If it doesn't exist, create it:
   - Tag Type: Conversion Linker
   - Triggering: All Pages

## Step 5: Testing

### Using GTM Preview Mode

1. Open GTM and click **Preview**
2. Enter your website URL: `https://www.consumerlawflorida.com`
3. Navigate to a page with a form (e.g., homepage, locations page)
4. Fill out and submit the form with test data:
   - First Name: Jane
   - Last Name: Doe
   - Email: test@example.com
   - Phone: (561) 264-7211
   - ZIP: 12345
5. In GTM Preview, check:
   - The `lead_form_submit` event fired
   - All DLVs populate with correct values:
     - `user_data.email` = "test@example.com"
     - `user_data.phone_number` = "+15612647211"
     - `user_data.address.first_name` = "Jane"
     - `user_data.address.last_name` = "Doe"
     - `user_data.address.postal_code` = "12345"
     - `user_data.address.country` = "US"
   - The Google Ads Conversion Tag fired
   - Enhanced Conversions data was sent

### Browser Console Verification

1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit a form
4. Type: `window.dataLayer`
5. Find the last `lead_form_submit` event
6. Verify the `user_data` object structure matches the expected format

### Google Ads Verification

1. Go to Google Ads → Tools & Settings → Conversions
2. Select your conversion action
3. Check the "Enhanced Conversions" status
4. After 24-48 hours, verify that enhanced conversions are being received:
   - Look for "Enhanced conversions received" in conversion details
   - Check diagnostics for any errors

## Troubleshooting

### DLVs Not Populating

- **Issue**: Variables show as undefined in Preview mode
- **Solution**: 
  - Verify the dataLayer variable names match exactly (case-sensitive)
  - Check that the form submission is successful
  - Ensure `window.dataLayer` is initialized before the push

### Enhanced Conversions Not Sending

- **Issue**: Conversion fires but enhanced data not received
- **Solution**:
  - Verify all DLVs are mapped correctly in the Google Ads tag
  - Check that Enhanced Conversions is enabled in Google Ads
  - Ensure at least one identifier is present (email is preferred)
  - Verify Conversion Linker tag exists and fires

### Phone Number Format Issues

- **Issue**: Phone number not in E.164 format
- **Solution**: The code automatically converts to E.164 format (`+1XXXXXXXXXX`)
  - If phone is invalid, it will be sent as empty string
  - Verify phone validation is working in the form

## Notes

- **Data Hashing**: Google/GTM will hash the user data automatically. Do NOT hash in the browser.
- **Privacy**: Enhanced Conversions complies with Google's data policies and user privacy requirements.
- **Required Fields**: At least one identifier must be present (email preferred, or full name + postal code + country).
- **Country**: Always set to "US" automatically, no user input required.

## Support

For additional help:
- [Google Ads Enhanced Conversions Help](https://support.google.com/google-ads/answer/13258081)
- GTM Preview mode documentation
- Google Ads tag diagnostics
