
export interface ConsumerCredentials {
  consumerSecret: string;
  consumerKey: string;
  environment: "development" | "production" | "sandbox";
  passKey?: string;
}

export interface C2BRegistrationRequestBody {
  shortCode: string;
  confirmationURL: string;
  validationURL: string;
  responseType: string,
}

export interface C2BSimulationRequestBody {
  shortCode: string,
  amount: string,
  msisdn: string,
  commandID: string,
  billRefNumber: string,
}

export interface LipaNaMpesaRequestBody {
  businessShortCode: string,
  timestamp: string,
  transactionType: string,
  amount: string,
  partyA: string,
  partyB: string,
  phoneNumber: string,
  callBackURL: string,
  accountReference: string,
  transactionDesc: string,
}

export interface C2BQueryRequestBody {
  businessShortCode: string,
  checkoutRequestID: string,
}
