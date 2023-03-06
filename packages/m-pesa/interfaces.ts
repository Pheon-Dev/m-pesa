
export interface ConsumerCredentials {
  consumerSecret: string;
  consumerKey: string;
  passKey: string;
}

export interface C2BRegistrationRequestBody {
  ShortCode: string;
  ConfirmationURL: string;
  ValidationURL: string;
  ResponseType: string,
}

export interface C2BSimulationRequestBody {
  ShortCode: string,
  Amount: string,
  Msisdn: string,
  CommandID: string,
  BillRefNumber: string,
  TransactionType: string,
}

export interface LipaNaMpesaRequestBody {
  BusinessShortCode: string,
  Timestamp: string,
  TransactionType: string,
  Amount: string,
  PartyA: string,
  PartyB: string,
  PhoneNumber: string,
  CallBackURL: string,
  AccountReference: string,
  TransactionDesc: string,
}

export interface C2BQueryRequestBody {
  BusinessShortCode: string,
  Timestamp: string,
  CheckoutRequestID: string,
}
