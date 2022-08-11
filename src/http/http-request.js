import axios from "axios";

export const BASEURL =
  "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod";

export async function sendNetworkRequest(url, method, body) {
  const tokens = localStorage.getItem("tokens");
  const myToken = JSON.parse(tokens);
  if (!url) {
    throw new Error("Invalid url provided");
  }
  const config = {
    method: method || "GET",
    url: url,

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken.accessToken}`,
      idToken: myToken.idToken,
      refresh_token: myToken.refreshToken,
    },
    data: body || null,
    // timeout: 1000,
  };
  const response = await axios(config);
  return response;
}
