import axios from "axios";

const nodeAxios = async (method, api_uri, body = null) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  try {
    const response = await axios({
      method,
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        refresh_token: tokens.refreshToken,
        idToken: tokens.idToken,
      },
      url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/${api_uri}`,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export default nodeAxios;
