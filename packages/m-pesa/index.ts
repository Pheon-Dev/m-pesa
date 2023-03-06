
import { dateTime } from "./utils/date";
import { routes } from "./utils/routes";
import axios from "axios";
import { C2BQueryRequestBody, C2BRegistrationRequestBody, C2BSimulationRequestBody, ConsumerCredentials, LipaNaMpesaRequestBody } from "./interfaces";


export const GetToken = async (cred: ConsumerCredentials) => {
  const tokenUrl = routes.production + routes.oauth;

  const url = tokenUrl;
  const auth = Buffer.from(`${cred.consumerKey}:${cred.consumerSecret}`).toString(
    "base64"
  );

  const headers = { Authorization: `Basic ${auth}` };

  const res = await axios.request({ method: "GET", url, headers });

  return res.data.access_token;
}

export const C2BRegistration = async (cred: ConsumerCredentials, req: C2BRegistrationRequestBody) => {
  try {
    const token = await GetToken(cred);
    const url = routes.production + routes.c2bregister;

    const data = {
      ShortCode: Number(req.ShortCode),
      ConfirmationURL: `${req.ConfirmationURL}`,
      ValidationURL: `${req.ValidationURL}`,
      ResponseType: `${req.ResponseType}`,
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

export const C2BSimulation = async (cred: ConsumerCredentials, req: C2BSimulationRequestBody) => {
  try {
    const token = await GetToken(cred);
    const url = routes.production + routes.c2bsimulate;

    const data = {
      ShortCode: req.ShortCode,
      Amount: req.Amount,
      Msisdn: req.Msisdn,
      CommandID: req.CommandID,
      BillRefNumber: `${req.BillRefNumber}`,
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

export const LipaNaMpesa = async (cred: ConsumerCredentials, req: LipaNaMpesaRequestBody) => {
  try {
    const time_stamp = dateTime();
    const token = await GetToken(cred);
    const url = routes.production + routes.stkpush;

    const data = {
      BusinessShortCode: req.BusinessShortCode,
      Password: Buffer.from(
        `${req.BusinessShortCode}${cred.passKey}${time_stamp}`
      ).toString("base64"),
      Timestamp: time_stamp,
      TransactionType: req.TransactionType,
      Amount: req.Amount,
      PartyA: req.PhoneNumber,
      PartyB: req.BusinessShortCode,
      PhoneNumber: req.PhoneNumber,
      CallBackURL: req.CallBackURL,
      AccountReference: req.CallBackURL,
      TransactionDesc: "Payment of loan services",
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

export const C2BQuery = async (cred: ConsumerCredentials, req: C2BQueryRequestBody) => {

  try {
    const token = await GetToken(cred);
    const url = routes.production + routes.stkquery;
    const time_stamp = dateTime();

    const data = {
      BusinessShortCode: Number(req.BusinessShortCode),
      Password: Buffer.from(
        `${req.BusinessShortCode}${cred.passKey}${time_stamp}`
      ).toString("base64"),
      Timestamp: time_stamp,
      CheckoutRequestID: req.CheckoutRequestID,
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
