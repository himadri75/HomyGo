const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: "Homygo <noreply@homygo.apps24.tech>",
      to: email,
      subject: "Welcome to Homygo 🎉",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome to Homygo 🚀</h2>
          <p>Your email integration with Resend is working successfully.</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

// Call immediately
// sendMail("himadrikaran516@gmail.com");

module.exports = sendMail;
