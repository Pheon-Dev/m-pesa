

import { DateTime, routes } from "../utils";
import axios from "axios";
import { GetToken } from "./getToken";
import {
  LipaNaMpesaRequestBody,
  ConsumerCredentials,
} from "../utils/interfaces";

export const LipaNaMpesa = async ({ consumerSecret, consumerKey, passKey, environment }: ConsumerCredentials, { businessShortCode, transactionType, amount, phoneNumber, callBackURL, transactionDesc, accountReference }: LipaNaMpesaRequestBody) => {
  try {
    const time_stamp = DateTime();
    const token = await GetToken({ consumerSecret, consumerKey, environment });
    const url = routes.production + routes.stkpush;

    const data = {
      BusinessShortCode: businessShortCode,
      Password: Buffer.from(
        `${businessShortCode}${passKey}${time_stamp}`
      ).toString("base64"),
      Timestamp: time_stamp,
      TransactionType: transactionType,
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callBackURL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
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
    // res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);

    // res.status(500).json({ message: "Something went wrong", error });
    console.log({ message: "Something went wrong", error });
  }
}
