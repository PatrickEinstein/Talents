import HttpGetCallerWhole, { HttpOTHERcaller } from ".";
import { apiCalls, IGigToCreate } from "../types";

export class AdsFetches {
  userPerson: {
    token: string;
  } = JSON.parse(localStorage.getItem("user") as string) ?? {
    token: "",
  };
  /**
   *
   */
  constructor() {}

  CreateAds = async (load: IGigToCreate): Promise<apiCalls> => {
    console.log(`verify load`, load);
    const res = await HttpOTHERcaller(
      `ads/create-ad`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "POST",
      load
    );

    return res;
  };

  GetAllAvailableAds = async (): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole("users", {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userPerson.token}`,
    });

    return res;
  };
}
