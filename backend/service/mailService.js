// backend/service/mailService.js
const transporter = require("../config/mail");

const sendAccountCreatedMail = async (
  name,
  email,
  gender,
  dob,
  req
) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const userAgent =
      req.headers["user-agent"] || "Unknown device";

    const emailData = {
      from: "Homygo Corporation <support@homygo.apps24.tech>",
      to: email,
      subject: "🎉 Welcome to Homygo",

      html: `
        <div
          style="
            background:#f4f7fb;
            padding:40px 20px;
            font-family:Arial,sans-serif;
          "
        >

          <div
            style="
              max-width:650px;
              margin:auto;
              background:white;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 4px 18px rgba(0,0,0,0.08);
            "
          >

            <!-- Banner -->
            <img
              src="https://homygo.apps24.tech/homygo_banner.jpg"
              alt="Homygo Banner"
              style="
                width:100%;
                display:block;
                object-fit:cover;
              "
            />

            <!-- Content -->
            <div style="padding:35px;">

              <h1
                style="
                  margin:0;
                  color:#111827;
                  font-size:28px;
                "
              >
                Welcome to Homygo 🚀
              </h1>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  margin-top:18px;
                  line-height:1.7;
                "
              >
                Hi <strong>${name}</strong>,
              </p>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  line-height:1.7;
                "
              >
                Your account has been successfully created.
                We’re excited to have you onboard.
              </p>

              <!-- Account Details -->
              <div
                style="
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  padding:20px;
                  margin-top:30px;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#111827;
                    font-size:18px;
                  "
                >
                  Account Information
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Email
                    </td>

                    <td style="color:#111827;">
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Gender
                    </td>

                    <td style="color:#111827;">
                      ${gender || "Not provided"}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Date of Birth
                    </td>

                    <td style="color:#111827;">
                      ${dob
          ? new Date(dob).toDateString()
          : "Not provided"
        }
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Created At
                    </td>

                    <td style="color:#111827;">
                      ${new Date().toLocaleString()}
                    </td>
                  </tr>

                </table>

              </div>

              <!-- Security Info -->
              <div
                style="
                  margin-top:30px;
                  padding:18px;
                  border-radius:12px;
                  background:#fff7ed;
                  border:1px solid #fdba74;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#9a3412;
                    font-size:17px;
                  "
                >
                  Security Information
                </h3>

                <p style="margin:8px 0; color:#7c2d12;">
                  <strong>IP Address:</strong> ${ip}
                </p>

                <p style="margin:8px 0; color:#7c2d12;">
                  <strong>Device:</strong> ${userAgent}
                </p>

              </div>

              <!-- Footer -->
              <div
                style="
                  margin-top:35px;
                  padding-top:20px;
                  border-top:1px solid #e5e7eb;
                  text-align:center;
                "
              >

                <p
                  style="
                    font-size:13px;
                    color:#9ca3af;
                    line-height:1.6;
                    margin:0;
                  "
                >
                  If this account was not created by you,
                  please contact our support team immediately.
                </p>

                <p
                  style="
                    margin-top:15px;
                    font-size:13px;
                    color:#9ca3af;
                  "
                >
                  © ${new Date().getFullYear()} Homygo Corporation
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    };

    await transporter.emails.send(emailData);

    return true;

  } catch (error) {
    console.error(
      "❌ Account creation email failed:",
      error
    );

    return false;
  }
};

const sendLoginSuccessMail = async (user, req) => {
  try {
    // Extract IP Address
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    // Extract Device Info
    const userAgent =
      req.headers["user-agent"] || "Unknown device";

    const emailData = {
      from: "Homygo Corporation <support@homygo.apps24.tech>",
      to: user.email,
      subject: "🔐 Login Successful - Homygo",

      html: `
        <div
          style="
            background:#f4f7fb;
            padding:40px 20px;
            font-family:Arial,sans-serif;
          "
        >

          <div
            style="
              max-width:650px;
              margin:auto;
              background:white;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 4px 18px rgba(0,0,0,0.08);
            "
          >

            <!-- Banner -->
            <img
              src="https://homygo.apps24.tech/homygo_banner.jpg"
              alt="Homygo Banner"
              style="
                width:100%;
                display:block;
              "
            />

            <!-- Content -->
            <div style="padding:35px;">

              <h1
                style="
                  margin:0;
                  color:#111827;
                  font-size:28px;
                "
              >
                Login Successful 🔐
              </h1>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  margin-top:18px;
                  line-height:1.7;
                "
              >
                Hi <strong>${user.name}</strong>,
              </p>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  line-height:1.7;
                "
              >
                Your Homygo account was successfully
                logged in.
              </p>

              <!-- Login Details -->
              <div
                style="
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  padding:20px;
                  margin-top:30px;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#111827;
                    font-size:18px;
                  "
                >
                  Login Information
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Email
                    </td>

                    <td style="color:#111827;">
                      ${user.email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Login Time
                    </td>

                    <td style="color:#111827;">
                      ${new Date().toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Account Status
                    </td>

                    <td style="color:#111827;">
                      ${user.status}
                    </td>
                  </tr>

                </table>

              </div>

              <!-- Security Info -->
              <div
                style="
                  margin-top:30px;
                  padding:18px;
                  border-radius:12px;
                  background:#eff6ff;
                  border:1px solid #93c5fd;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#1d4ed8;
                    font-size:17px;
                  "
                >
                  Security Information
                </h3>

                <p style="margin:8px 0; color:#1e40af;">
                  <strong>IP Address:</strong> ${ip}
                </p>

                <p style="margin:8px 0; color:#1e40af;">
                  <strong>Device:</strong> ${userAgent}
                </p>

              </div>

              <!-- Warning -->
              <div
                style="
                  margin-top:30px;
                  padding:18px;
                  border-radius:12px;
                  background:#fef2f2;
                  border:1px solid #fca5a5;
                "
              >

                <p
                  style="
                    margin:0;
                    color:#991b1b;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  If this login was not performed by you,
                  please reset your password immediately
                  and secure your account.
                </p>

              </div>

              <!-- Footer -->
              <div
                style="
                  margin-top:35px;
                  padding-top:20px;
                  border-top:1px solid #e5e7eb;
                  text-align:center;
                "
              >

                <p
                  style="
                    font-size:13px;
                    color:#9ca3af;
                    line-height:1.6;
                    margin:0;
                  "
                >
                  This is an automated security notification
                  from Homygo.
                </p>

                <p
                  style="
                    margin-top:15px;
                    font-size:13px;
                    color:#9ca3af;
                  "
                >
                  © ${new Date().getFullYear()} Homygo Corporation
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    };

    await transporter.emails.send(emailData);
    return true;

  } catch (error) {
    console.error(
      "❌ Login email sending failed:",
      error
    );

    return false;
  }
};

const sendEmergencySOSMail = async (
  emergencyEmail,
  user,
  location,
  req
) => {
  try {
    // Extract IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    // Device Info
    const userAgent =
      req.headers["user-agent"] || "Unknown device";

    // Google Maps Link
    const googleMapsLink = `
      https://www.google.com/maps?q=
      ${location.latitude},
      ${location.longitude}
    `;

    const emailData = {
      from: "Homygo Emergency SOS <support@homygo.apps24.tech>",
      to: emergencyEmail,
      subject: "🚨 Emergency SOS Alert - Immediate Attention Required",

      html: `
        <div
          style="
            background:#f4f7fb;
            padding:40px 20px;
            font-family:Arial,sans-serif;
          "
        >

          <div
            style="
              max-width:650px;
              margin:auto;
              background:white;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 4px 18px rgba(0,0,0,0.08);
            "
          >

            <!-- Banner -->
            <img
              src="https://homygo.apps24.tech/homygo_banner.jpg"
              alt="Homygo Emergency Banner"
              style="
                width:100%;
                display:block;
              "
            />

            <!-- Content -->
            <div style="padding:35px;">

              <!-- Alert Header -->
              <div
                style="
                  background:#fef2f2;
                  border:1px solid #fca5a5;
                  border-radius:12px;
                  padding:20px;
                "
              >

                <h1
                  style="
                    margin:0;
                    color:#b91c1c;
                    font-size:30px;
                  "
                >
                  🚨 Emergency SOS Alert
                </h1>

                <p
                  style="
                    color:#7f1d1d;
                    font-size:16px;
                    margin-top:15px;
                    line-height:1.7;
                  "
                >
                  An emergency SOS alert has been triggered by
                  <strong>${user.name}</strong>.
                  Immediate attention may be required.
                </p>

              </div>

              <!-- User Details -->
              <div
                style="
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  padding:20px;
                  margin-top:30px;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#111827;
                    font-size:18px;
                  "
                >
                  User Information
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Name
                    </td>

                    <td style="color:#111827;">
                      ${user.name}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Email
                    </td>

                    <td style="color:#111827;">
                      ${user.email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#6b7280;
                        font-weight:bold;
                      "
                    >
                      Triggered At
                    </td>

                    <td style="color:#111827;">
                      ${new Date().toLocaleString()}
                    </td>
                  </tr>

                </table>

              </div>

              <!-- Location Details -->
              <div
                style="
                  background:#fff7ed;
                  border:1px solid #fdba74;
                  border-radius:12px;
                  padding:20px;
                  margin-top:30px;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#9a3412;
                    font-size:18px;
                  "
                >
                  📍 Live Location Details
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#7c2d12;
                        font-weight:bold;
                      "
                    >
                      Latitude
                    </td>

                    <td style="color:#7c2d12;">
                      ${location.latitude}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#7c2d12;
                        font-weight:bold;
                      "
                    >
                      Longitude
                    </td>

                    <td style="color:#7c2d12;">
                      ${location.longitude}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#7c2d12;
                        font-weight:bold;
                      "
                    >
                      Address
                    </td>

                    <td style="color:#7c2d12;">
                      ${location.address || "Not available"}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#7c2d12;
                        font-weight:bold;
                      "
                    >
                      Location Source
                    </td>

                    <td style="color:#7c2d12;">
                      ${location.source}
                    </td>
                  </tr>

                </table>

                <!-- Maps Button -->
                <div style="margin-top:25px;">

                  <a
                    href="${googleMapsLink}"
                    target="_blank"
                    style="
                      background:#dc2626;
                      color:white;
                      padding:14px 22px;
                      text-decoration:none;
                      border-radius:10px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Open Live Location in Google Maps
                  </a>

                </div>

              </div>

              <!-- Security Info -->
              <div
                style="
                  margin-top:30px;
                  padding:18px;
                  border-radius:12px;
                  background:#eff6ff;
                  border:1px solid #93c5fd;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#1d4ed8;
                    font-size:17px;
                  "
                >
                  Security Information
                </h3>

                <p style="margin:8px 0; color:#1e40af;">
                  <strong>IP Address:</strong> ${ip}
                </p>

                <p style="margin:8px 0; color:#1e40af;">
                  <strong>Device:</strong> ${userAgent}
                </p>

              </div>

              <!-- Footer -->
              <div
                style="
                  margin-top:35px;
                  padding-top:20px;
                  border-top:1px solid #e5e7eb;
                  text-align:center;
                "
              >

                <p
                  style="
                    font-size:13px;
                    color:#9ca3af;
                    line-height:1.6;
                    margin:0;
                  "
                >
                  This emergency alert was automatically
                  generated by the Homygo SOS System.
                </p>

                <p
                  style="
                    margin-top:15px;
                    font-size:13px;
                    color:#9ca3af;
                  "
                >
                  © ${new Date().getFullYear()} Homygo Corporation
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    };

    await transporter.emails.send(emailData);
    return true;

  } catch (error) {
    console.error(
      "❌ Emergency SOS email failed:",
      error
    );
    return false;
  }
};

module.exports = { sendAccountCreatedMail, sendLoginSuccessMail, sendEmergencySOSMail };

// HomyGo Mail Banner = homygo.apps24.tech/homygo_banner.jpg