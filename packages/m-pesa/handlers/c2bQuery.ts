
import { DateTime, routes } from "../utils";
import axios from "axios";
import { GetToken } from "./getToken";
import {
  C2BQueryRequestBody,
  ConsumerCredentials,
} from "../utils/interfaces";

export const C2BQuery = async ({ consumerSecret, consumerKey, passKey, environment }: ConsumerCredentials, { businessShortCode, checkoutRequestID }: C2BQueryRequestBody) => {

  try {
    const token = await GetToken({ consumerSecret, consumerKey, environment });
    const url = routes.production + routes.stkquery;
    const time_stamp = DateTime();

    const data = {
      BusinessShortCode: Number(businessShortCode),
      Password: Buffer.from(
        `${businessShortCode}${passKey}${time_stamp}`
      ).toString("base64"),
      Timestamp: time_stamp,
      CheckoutRequestID: checkoutRequestID,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.request({
      method: "POST",
      url,
      headers,
      data,
    });

    return response
  } catch (error) {
    console.log({ message: "Something went wrong", error });
  }
}
