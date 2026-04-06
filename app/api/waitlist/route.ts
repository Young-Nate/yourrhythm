import { NextRequest, NextResponse } from "next/server";

const SPREADSHEET_ID = "10MEoPITFsVo56DMmtTVURKA2oMlPJiHyC6wM1iFiYxw";

export async function POST(request: NextRequest) {
  let body: { firstName: string; lastName: string; age: string; email: string; site: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, lastName, age, email, site } = body;

  if (!firstName || !lastName || !age || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    // Parse service account credentials
    const credentials = JSON.parse(serviceAccountKey);

    // Get access token via JWT
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    // Encode JWT
    const encode = (obj: object) =>
      Buffer.from(JSON.stringify(obj))
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    const unsigned = `${encode(header)}.${encode(payload)}`;

    // Sign with RS256
    const crypto = await import("crypto");
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(unsigned);
    const signature = sign
      .sign(credentials.private_key, "base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const jwt = `${unsigned}.${signature}`;

    // Exchange JWT for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const { access_token } = await tokenRes.json();

    if (!access_token) {
      return NextResponse.json({ error: "Auth failed" }, { status: 500 });
    }

    // Append row to Google Sheet
    const timestamp = new Date().toISOString();
    const sheetName = site === "yourrhythm" ? "Your Rhythm" : "PDF Scan Fast";

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[timestamp, firstName, lastName, age, email, site]],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.text();
      console.error("Sheets error:", err);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
