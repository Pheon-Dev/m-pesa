
export interface ConsumerCredentials {
  consumerSecret: string;
  consumerKey: string;
}

export interface C2BRegistrationRequestBody {
  ShortCode: string;
  ConfirmationURL: string;
  ValidationURL: string;
  ResponseType: "Completed",
}

export interface C2BSimulationRequestBody {
  ShortCode: string,
  Amount: string,
  Msisdn: string,
  CommandID: string,
  BillRefNumber: string,
  TransactionType: "CustomerPayBillOnline",
}
