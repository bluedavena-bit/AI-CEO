# AI-CEO

A personalized 90-day action plan generator to help you achieve your goals and build your path to success.

## Features

- **Personalized Assessment** - Answer questions about your goals, skills, and challenges
- **PayPal Integration** - Secure one-time payment of $49 for your blueprint
- **CEO Scoring System** - Get a starting CEO score based on your input
- **90-Day Blueprint** - Receive a customized action plan divided into three 30-day phases:
  - **Days 1-30: Foundation** - Build your base
  - **Days 31-60: Growth** - Scale your efforts
  - **Days 61-90: Expansion** - Prepare for the next level
- **Dark Theme UI** - Modern, professional design with smooth animations
- **Mobile Responsive** - Optimized for all screen sizes

## How to Use

1. Open `index.html` in your web browser
2. Click "Start Your Blueprint"
3. Fill out the assessment form with:
   - Your name
   - Your email
   - Your main goal
   - Current monthly income
   - Target monthly income
   - Your top skills
   - Your biggest challenge
   - Available hours per week
4. Click "Proceed to Payment ($49)"
5. Complete PayPal checkout
6. Review your personalized 90-day action plan

## Setup Instructions

### Prerequisites
- PayPal Business Account (https://www.paypal.com/en-us/business)

### Configuration

1. **Get Your PayPal Client ID**:
   - Go to https://developer.paypal.com
   - Sign in with your PayPal Business account
   - Navigate to **Apps & Credentials**
   - Copy your **Client ID**

2. **Update index.html**:
   - Open `index.html`
   - Find the line: `client-id=YOUR_PAYPAL_CLIENT_ID`
   - Replace `YOUR_PAYPAL_CLIENT_ID` with your actual Client ID
   - Save and commit

3. **Test the Integration**:
   - Open `index.html` locally
   - Fill out the form
   - Click "Proceed to Payment"
   - PayPal checkout should appear

## Files

- `index.html` - Main HTML structure with PayPal integration
- `styles.css` - Styling with dark theme
- `script.js` - JavaScript functionality and PayPal payment handling
- `README.md` - This file

## Payment Flow

1. User completes assessment form
2. Clicks "Proceed to Payment ($49)"
3. PayPal checkout modal appears
4. User completes secure payment
5. Blueprint is generated and displayed
6. User can create another blueprint or download their plan

## Scoring System

Your starting CEO score is calculated as follows:
- Base score: 50 points
- +10 points if skills description is longer than 5 characters
- +10 points if you can dedicate 5+ hours per week
- +5 points if challenge description is longer than 5 characters

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- PayPal SDK

## Security Notes

- All payments are processed securely through PayPal
- Email addresses are captured for order records
- No sensitive payment data is stored locally

## License

Open source - feel free to use and modify

## Support

For PayPal integration issues, visit https://developer.paypal.com/docs/
