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
