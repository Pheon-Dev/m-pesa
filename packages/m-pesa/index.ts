
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

// const routes = {
//   production: 'https://api.safaricom.co.ke',
//   sandbox: 'https://sandbox.safaricom.co.ke',
//   oauth: '/oauth/v1/generate?grant_type=client_credentials',
//   b2c: '/mpesa/b2c/v1/paymentrequest',
//   b2b: '/mpesa/b2b/v1/paymentrequest',
//   c2bregister: '/mpesa/c2b/v1/registerurl',
//   c2bsimulate: '/mpesa/c2b/v1/simulate',
//   accountbalance: '/mpesa/accountbalance/v1/query',
//   transactionstatus: '/mpesa/transactionstatus/v1/query',
//   reversal: '/mpesa/reversal/v1/request',
//   stkpush: '/mpesa/stkpush/v1/processrequest',
//   stkquery: '/mpesa/stkpushquery/v1/query',
// };

function doubleDigits(number: number) {
  if (number.toString().length <= 1) return "0" + number;
  return number;
}

function dateDigits(date?: string, separator?: string) {
  let customDate = !date || date === "now" ? new Date() : new Date(date);

  const sep = separator ? separator : "";
  const timeSep = separator ? ":" : "";

  const YYYY = customDate.getFullYear();
  const MM = doubleDigits(customDate.getMonth() + 1);
  const DD = doubleDigits(customDate.getDate());
  const HH = doubleDigits(customDate.getHours());
  const mm = doubleDigits(customDate.getMinutes());
  const ss = doubleDigits(customDate.getSeconds());

  const newDate = YYYY + sep + MM + sep + DD;
  const time = HH + timeSep + mm + timeSep + ss;

  return newDate + " " + time;
}

function date(when?: string, separator?: string) {
  const customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? separator : "";

  const YYYY = customDate.getFullYear();
  const MM = doubleDigits(customDate.getMonth() + 1);
  const DD = doubleDigits(customDate.getDate());

  const newDate = YYYY + sep + MM + sep + DD;

  return newDate;
}

function time(when?: string, separator?: string) {
  let customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? ":" : "";

  const HH = doubleDigits(customDate.getHours());
  const mm = doubleDigits(customDate.getMinutes());
  const ss = doubleDigits(customDate.getSeconds());

  const time = HH + sep + mm + sep + ss;

  return time;
}

// function dateTime(when?: string, separator?: string) {
//   const sep = separator ? ":" : "";
//   return date(when, separator) + sep + time(when, separator);
// }

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
