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
  token2? : string;
  id?: string;
  user_verified?: boolean;
  message?: string;
  status?: number;
  email? : string;
};

export type Login = {
  email: string;
  password: string;
};
