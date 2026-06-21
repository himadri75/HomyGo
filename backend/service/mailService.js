// backend/service/mailService.js
const resend = require("../config/mail");
const EMAIL_BANNER = "https://homygo.apps24.tech/homygo_banner.jpg";

const getBanner = () => `
  <div style="margin-bottom: 20px;">
    <img
      src="${EMAIL_BANNER}"
      alt="HomyGo Banner"
      style="
        width: 100%;
        max-width: 600px;
        border-radius: 10px;
        display: block;
        margin: 0 auto;
      "
    />
  </div>
`;

const getISTTime = () => {
  const datetime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return datetime;
}

const sendAccountCreatedMail = async (name, email, gender, dob, req) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const userAgent = req.headers["user-agent"] || "Unknown device";

    const mailOptions = {
      from: `Homygo Corporation <support@homygo.apps24.tech>`,
      to: email,
      subject: "🎉 Account Created Successfully",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">

          ${getBanner()}

          <h2 style="color: #27ae60;">Welcome to Homygo 🎉</h2>

          <p>Hi <strong>${name}</strong>,</p>

          <p>Your account has been created successfully.</p>

          <table style="border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 6px 10px;"><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td style="padding: 6px 10px;"><strong>Gender:</strong></td>
              <td>${gender || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 6px 10px;"><strong>Date of Birth:</strong></td>
              <td>${dob ? new Date(dob).toDateString() : "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 6px 10px;"><strong>Created At:</strong></td>
              <td>${getISTTime()}</td>
            </tr>
          </table>

          <hr style="margin: 20px 0;" />

          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Device:</strong> ${userAgent}</p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: gray;">
            If this wasn’t you, please contact support immediately.
          </p>

        </div>
      `,
    };

    await resend.emails.send(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Account creation email failed:", error);
    return false;
  }
};

const sendLoginSuccessMail = async (user, req) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const userAgent = req.headers["user-agent"] || "Unknown device";

    const mailOptions = {
      from: `"Homygo Corporation" <support@homygo.apps24.tech>`,
      to: user.email,
      subject: "Login Successful Notification",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">

          ${getBanner()}

          <h2 style="color: #2c3e50;">Login Successful</h2>

          <p>Hi <strong>${user.name}</strong>,</p>

          <p>Your account was just logged in successfully.</p>

          <table style="border-collapse: collapse; margin-top: 10px;">

            <tr>
              <td style="padding: 6px 10px;"><strong>Email:</strong></td>
              <td>${user.email}</td>
            </tr>

            <tr>
              <td style="padding: 6px 10px;"><strong>Time:</strong></td>
              <td>${getISTTime()}</td>
            </tr>

            <tr>
              <td style="padding: 6px 10px;"><strong>Status:</strong></td>
              <td>${user.status}</td>
            </tr>

          </table>

          <hr style="margin: 20px 0;" />

          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Device:</strong> ${userAgent}</p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: gray;">
            If this wasn't you, please reset your password immediately.
          </p>

        </div>
      `,
    };

    await resend.emails.send(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Login email sending failed:", error);
    return false;
  }
};

// Emergency SOS Mail
const sendEmergencySOSMail = async (
  emergencyEmail,
  user,
  location,
  req
) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const userAgent = req.headers["user-agent"] || "Unknown device";

    const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    const mailOptions = {
      from: `"Homygo Emergency SOS" <support@homygo.apps24.tech>`,
      to: emergencyEmail,
      subject: "🚨 Emergency SOS Alert",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">

          ${getBanner()}

          <h2 style="color: #e74c3c;">
            Emergency SOS Triggered
          </h2>

          <p>
            An emergency SOS alert has been triggered by
            <strong>${user.name}</strong>.
          </p>

          <table
            style="
              border-collapse: collapse;
              margin-top: 10px;
              width: 100%;
            "
          >

            <tr>
              <td style="padding: 8px;"><strong>Name:</strong></td>
              <td>${user.name}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Email:</strong></td>
              <td>${user.email}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Latitude:</strong></td>
              <td>${location.latitude}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Longitude:</strong></td>
              <td>${location.longitude}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Address:</strong></td>
              <td>${location.address || "Not available"}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Location Source:</strong></td>
              <td>${location.source}</td>
            </tr>

            <tr>
              <td style="padding: 8px;"><strong>Triggered At:</strong></td>
              <td>${getISTTime()}</td>
            </tr>

          </table>

          <hr style="margin: 20px 0;" />

          <p>
            <strong>Live Location:</strong>
          </p>

          <p>
            <a
              href="${googleMapsLink}"
              target="_blank"
              style="
                background: #e74c3c;
                color: white;
                padding: 10px 16px;
                text-decoration: none;
                border-radius: 6px;
                display: inline-block;
              "
            >
              Open in Google Maps
            </a>
          </p>

          <hr style="margin: 20px 0;" />

          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Device:</strong> ${userAgent}</p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: gray;">
            This emergency alert was automatically generated by Homygo SOS System.
          </p>

        </div>
      `,
    };

    await resend.emails.send(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Emergency SOS email failed:", error);
    return false;
  }
};

const sendOTPVerificationMail = async (email, verification_otp) => {
  console.log("OTP EMAIL:", email);
  console.log("OTP EMAIL TYPE:", typeof email);

  try {
    const mailOptions = {
      from: `"Homygo Verification" <support@homygo.apps24.tech>`,
      to: email,
      subject: "🔐 Verify Your Email Address",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">

          ${getBanner()}

          <h2 style="color: #3498db;">
            Email Verification Required
          </h2>

          <p>
            Thank you for choosing <strong>Homygo</strong>.
          </p>

          <p>
            Use the following One-Time Password (OTP) to verify your email address:
          </p>

          <div
            style="
              margin: 24px 0;
              text-align: center;
            "
          >
            <span
              style="
                display: inline-block;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #2c3e50;
                background: #f4f6f8;
                padding: 14px 24px;
                border-radius: 8px;
              "
            >
              ${verification_otp}
            </span>
          </div>

          <p>
            This OTP is valid for a limited time. Do not share it with anyone.
          </p>

          <p>
            Verification Requested At:
            <strong>${getISTTime()}</strong>
          </p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: gray;">
            If you did not request this verification, please ignore this email.
          </p>

        </div>
      `,
    };

    await resend.emails.send(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Email verification OTP sending failed:", error);
    return false;
  }
};

module.exports = {
  sendAccountCreatedMail,
  sendLoginSuccessMail,
  sendEmergencySOSMail,
  sendOTPVerificationMail
};
