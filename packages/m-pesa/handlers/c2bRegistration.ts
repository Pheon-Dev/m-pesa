
import { routes } from "../utils";
import axios from "axios";
import { GetToken } from "./getToken";
import {
  C2BRegistrationRequestBody,
  ConsumerCredentials,
} from "../utils/interfaces";

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
