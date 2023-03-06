
// import { dateTime } from "./utils/date";
import { routes } from "./utils/routes";
import axios from "axios";
import { C2BRegistrationRequestBody, C2BSimulationRequestBody, ConsumerCredentials } from "./interfaces";

// const ACCOUNT_REFERENCE = "Account Reference";
// const TIMESTAMP = dateTime();

export const GetToken = async (credentials: ConsumerCredentials) => {
  const CONSUMER_KEY = credentials.consumerKey;
  const CONSUMER_SECRET = credentials.consumerSecret;
  const tokenUrl = routes.production + routes.oauth;

  const url = tokenUrl;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  const headers = { Authorization: `Basic ${auth}` };

  const res = await axios.request({ method: "GET", url, headers });

  return res.data.access_token;
}

export const C2BRegistration = async (credentials: ConsumerCredentials, req: C2BRegistrationRequestBody) => {
  try {
    const BUSINESS_SHORT_CODE = req.ShortCode;

    const VALIDATION_URL = req.ValidationURL;
    const CONFIRMATION_URL = req.ConfirmationURL;

    const token = await GetToken(credentials);
    const url = routes.production + routes.c2bregister;

    const data = {
      ShortCode: Number(BUSINESS_SHORT_CODE),
      ConfirmationURL: `${CONFIRMATION_URL}`,
      ValidationURL: `${VALIDATION_URL}`,
      ResponseType: "Completed",
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

export const C2BSimulation = async (credentials: ConsumerCredentials, req: C2BSimulationRequestBody) => {
  try {
    const short_code = req.ShortCode;
    const msisdn = req.Msisdn;
    const amount = req.Amount;
    const command_id = req.CommandID;
    const bill_ref = req.BillRefNumber;
    const token = await GetToken(credentials);
    const url = routes.production + routes.c2bsimulate;

    const data = {
      ShortCode: short_code,
      Amount: amount,
      Msisdn: msisdn,
      CommandID: command_id,
      BillRefNumber: `${bill_ref}`,
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
    // return response.data
    // res.status(200).json(response.data);
  } catch (error) {

    console.log({ message: "Something went wrong", error });
  }

}

  // async function lipaNM() {
  //   try {
  //     const { PhoneNumber, Amount, BusinessShortCode } = req.body;
  //     const token = await GetToken();
  //     const url = routes.production + routes.stkpush;
  //
  //     const data = {
  //       BusinessShortCode: BusinessShortCode,
  //       Password: Buffer.from(
  //         `${BUSINESS_SHORT_CODE}${PASS_KEY}${TIMESTAMP}`
  //       ).toString("base64"),
  //       Timestamp: TIMESTAMP,
  //       TransactionType: TRANSACTION_TYPE,
  //       Amount,
  //       PartyA: PhoneNumber,
  //       PartyB: BUSINESS_SHORT_CODE,
  //       PhoneNumber,
  //       CallBackURL: CALLBACK_URL,
  //       AccountReference: ACCOUNT_REFERENCE,
  //       TransactionDesc: "Payment of loan services",
  //     };
  //
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //
  //     const response = await axios.request({
  //       method: "POST",
  //       url,
  //       headers,
  //       data,
  //     });
  //
  //     res.status(200).json(response.data);
  //   } catch (error) {
  //     console.log(error);
  //
  //     res.status(500).json({ message: "Something went wrong", error });
  //   }
  // }
  //
  // async function c2bSim() {
  //   try {
  //     const { PhoneNumber, Amount, BusinessShortCode, BillRef } = req.body;
  //     const token = await getToken();
  //     const url = routes.production + routes.c2bsimulate;
  //
  //     const data = {
  //       ShortCode: BusinessShortCode,
  //       Amount: Amount,
  //       Msisdn: PhoneNumber,
  //       CommandID: TRANSACTION_TYPE,
  //       BillRefNumber: `${BillRef}`,
  //     };
  //
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //
  //     const response = await axios.request({
  //       method: "POST",
  //       url,
  //       headers,
  //       data,
  //     });
  //
  //     res.status(200).json(response.data);
  //   } catch (error) {
  //     console.log(error);
  //
  //     res.status(500).json({ message: "Something went wrong", error });
  //   }
  // }
  //
  // async function c2bQry() {
  //   try {
  //     const token = await getToken();
  //     const url = routes.production + routes.stkquery;
  //
  //     const data = {
  //       BusinessShortCode: Number(BUSINESS_SHORT_CODE),
  //       Password: Buffer.from(
  //         `${BUSINESS_SHORT_CODE}${PASS_KEY}${TIMESTAMP}`
  //       ).toString("base64"),
  //       Timestamp: TIMESTAMP,
  //       CheckoutRequestID: "ws_CO_22072022083144984768858280",
  //     };
  //
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //
  //     const response = await axios.request({
  //       method: "POST",
  //       url,
  //       headers,
  //       data,
  //     });
  //
  //     res.status(200).json(response.data);
  //   } catch (error) {
  //     console.log(error);
  //
  //     res.status(500).json({ message: "Something went wrong", error });
  //   }
  // }
  //
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
