export interface IGigToEdit {
  index: string;
  title: string;
  description: string;
  by: string;
  mode: "Remote" | "On-site" | "Hybrid";
  pay: "Commission" | "Hourly" | "Fixed";
  amount: string;
  // mode: string;
  // pay: string;
  eligibility: string;
  image: string;
  date: Date;
  location: string;
}

export type apiCalls = {
  status: number;
  message: any;
  errors: [];
  others: any;
};
export interface IGigToCreate {
  title: string;
  description: string;
  // by: string;
  workmode: "Remote" | "On-site" | "Hybrid";
  remuneration: "Commission" | "Hourly" | "Fixed";
  amount: number;
  eligibility: string;
  // image: string;
  date: Date;
  // location: string;
}
export type CreateOTP = {
  email: string;
};

export type VerifyOTP = {
  token2?: string;
  email: string;
  otp: string;
};

export type ChangePassword = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type createUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dOB: string;
  nationality: string;
  state: string;
  city: string;
  password: string;
};

export type LoggedInRes = {
  token?: string;
  token2?: string;
  id?: string;
  user_verified?: boolean;
  message?: string;
  status?: number;
  email?: string;
};

export type FullUserDetails = {
  KYC_status: string;
  accountNumber: string;
  account_status: string;
  account_tier: string;
  address: string;
  city: string;
  country_of_residence: string;
  firstName: string;
  is_verified: string;
  kyc_verified: string;
  profile_image: string;
  lastName: string;
  username: string;
};

export type Login = {
  email: string;
  password: string;
};
