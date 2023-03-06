
import { dateTime } from "./utils/date";
import { routes } from "./utils/routes";
import axios from "axios";
import {
  C2BQueryRequestBody,
  C2BRegistrationRequestBody,
  C2BSimulationRequestBody,
  ConsumerCredentials,
  LipaNaMpesaRequestBody
} from "./interfaces";

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

export const C2BRegistration = async ({ consumerKey, consumerSecret, environment }: ConsumerCredentials, { shortCode, confirmationURL, validationURL, responseType }: C2BRegistrationRequestBody) => {
  try {
    const token = await GetToken({ consumerSecret, consumerKey, environment });
    const url = routes.production + routes.c2bregister;

    const data = {
      ShortCode: Number(shortCode),
      ConfirmationURL: `${confirmationURL}`,
      ValidationURL: `${validationURL}`,
      ResponseType: `${responseType}`,
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

    // res.status(500).json({ message: "Something went wrong", error });
    console.log({ message: "Something went wrong", error });
  }
}

export const C2BSimulation = async ({ consumerSecret, consumerKey, environment }: ConsumerCredentials, { shortCode, amount, msisdn, commandID, billRefNumber }: C2BSimulationRequestBody) => {
  try {
    const token = await GetToken({ consumerKey, consumerSecret, environment });
    const url = routes.production + routes.c2bsimulate;

    const data = {
      ShortCode: shortCode,
      Amount: amount,
      Msisdn: msisdn,
      CommandID: commandID,
      BillRefNumber: `${billRefNumber}`,
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

    // return response
    return response.data
    // res.status(200).json(response.data);
  } catch (error) {

    console.log({ message: "Something went wrong", error });
  }

}

export const LipaNaMpesa = async ({ consumerSecret, consumerKey, passKey, environment }: ConsumerCredentials, { businessShortCode, transactionType, amount, phoneNumber, callBackURL, transactionDesc, accountReference }: LipaNaMpesaRequestBody) => {
  try {
    const time_stamp = dateTime();
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

export const C2BQuery = async ({ consumerSecret, consumerKey, passKey, environment }: ConsumerCredentials, { businessShortCode, checkoutRequestID }: C2BQueryRequestBody) => {

  try {
    const token = await GetToken({ consumerSecret, consumerKey, environment });
    const url = routes.production + routes.stkquery;
    const time_stamp = dateTime();

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


  // async function logs() {
  //   try {
  //     const token = LOGTAIL_API_TOKEN;
  //     const url = "https://logtail.com/api/v1/query";
  //
  //     const headers = {
  //       // "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //
  //     const response = await axios.request({
  //       method: "GET",
  //       url,
  //       headers,
  //     });
  //
  //     res.status(200).json(response.data);
  //   } catch (error) {
  //     console.log(error);
  //
  //     res.status(500).json({ message: "Something went wrong", error });
  //   }
  // }
