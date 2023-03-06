
import { routes } from "../utils";
import axios from "axios";
import { GetToken } from "./getToken";
import {
  C2BSimulationRequestBody,
  ConsumerCredentials,
} from "../utils/interfaces";

export const C2BSimulation = async ({
  consumerSecret,
  consumerKey,
  environment
}: ConsumerCredentials,
  {
    shortCode,
    amount,
    msisdn,
    commandID,
    billRefNumber
  }: C2BSimulationRequestBody
) => {
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
