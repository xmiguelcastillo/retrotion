// api/igdb.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

let accessToken = "";
let expiresAt = 0;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const now = Date.now();

  // Refresh token if expired
  if (!accessToken || now > expiresAt) {
    const tokenRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    );

    const tokenData = await tokenRes.json();
    accessToken = tokenData.access_token;
    expiresAt = now + tokenData.expires_in * 1000;
  }

  // IGDB API request
  const igdbRes = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.CLIENT_ID!,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    body: "fields name, rating, platforms.name; limit 10;",
  });

  const data = await igdbRes.json();
  res.status(200).json(data);
}
