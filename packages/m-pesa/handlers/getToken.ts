

import { routes } from "../utils";
import axios from "axios";
import {
  ConsumerCredentials,
} from "../utils/interfaces";

export const GetToken = async ({ consumerKey, consumerSecret, environment }: ConsumerCredentials) => {

  let tokenUrl = "";
  if (environment === "development" || environment === "sandbox") {
    tokenUrl = routes.sandbox + routes.oauth;
  }
  if (environment === "production") {
    tokenUrl = routes.production + routes.oauth;
  }

  const url = tokenUrl;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const headers = { Authorization: `Basic ${auth}` };

  const res = await axios.request({ method: "GET", url, headers });

  return res.data.access_token;
}
