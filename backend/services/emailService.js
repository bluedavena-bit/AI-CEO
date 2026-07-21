const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send assessment complete email
async function sendAssessmentEmail(email, name, ceoScore, ceoLevel, blueprintLink = null) {
  try {
    const blueprintSection = blueprintLink 
      ? `\n\n<p><a href="${blueprintLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Download Your Blueprint</a></p>`
      : '';

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Your AI CEO™ Assessment Results - Score: ${ceoScore}%`,
      html: `
        <h2>Hello ${name}!</h2>
        <p>Your AI CEO™ assessment is complete!</p>
        
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Results:</h3>
          <p><strong>CEO Score:</strong> ${ceoScore}%</p>
          <p><strong>CEO Level:</strong> ${ceoLevel}</p>
        </div>
        
        <p>This assessment is just the beginning of your AI CEO™ journey. Your personalized 90-day blueprint is ready to help you build a business that runs without you.</p>
        
        ${blueprintSection}
        
        <p>Questions? Reply to this email or visit our website.</p>
        <p>Best regards,<br>The AI CEO™ Team</p>
      `
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

// Send blueprint email with attachment
async function sendBlueprintEmail(email, name, blueprintContent, pdfUrl) {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Your AI CEO™ Premium Blueprint - ${name}'s 90-Day Roadmap`,
      html: `
        <h2>Your AI CEO™ Premium Blueprint is Ready!</h2>
        <p>Hello ${name},</p>
        
        <p>Thank you for investing in your business growth! Your personalized 90-day blueprint has been generated.</p>
        
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Blueprint Includes:</h3>
          <ul>
            <li>Week-by-week action plan</li>
            <li>Daily task priorities</li>
            <li>Revenue milestones</li>
            <li>Marketing templates</li>
            <li>Operations checklists</li>
            <li>Key metrics to track</li>
          </ul>
        </div>
        
        <p><a href="${pdfUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Download Blueprint PDF</a></p>
        
        <p>Start with the first week's action items today!</p>
        <p>Questions? Reply to this email.</p>
        <p>Best regards,<br>The AI CEO™ Team</p>
      `
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

// Send subscription confirmation
async function sendSubscriptionEmail(email, name, tier, amount) {
  try {
    const tierInfo = {
      'pro': { name: 'AI CEO Pro', interval: 'month' },
      'teams': { name: 'AI CEO Teams', interval: 'month' }
    };

    const info = tierInfo[tier] || { name: 'AI CEO Blueprint', interval: 'one-time' };

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Welcome to ${info.name}!`,
      html: `
        <h2>Welcome to ${info.name}!</h2>
        <p>Hello ${name},</p>
        
        <p>Thank you for your purchase! Your subscription is now active.</p>
        
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Plan:</strong> ${info.name}</p>
          <p><strong>Amount:</strong> $${amount} per ${info.interval}</p>
        </div>
        
        <p>You can now access all premium features in your dashboard.</p>
        <p>Best regards,<br>The AI CEO™ Team</p>
      `
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

module.exports = {
  sendAssessmentEmail,
  sendBlueprintEmail,
  sendSubscriptionEmail
};
