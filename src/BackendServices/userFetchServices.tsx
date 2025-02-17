import HttpGetCallerWhole, { HttpOTHERcaller } from ".";
import { apiCalls, ChangePassword, CreateOTP, createUser, Login } from "../types";

export class userFetchService{
    userPerson: {
        token: string;
      } = JSON.parse(localStorage.getItem("userDetails") as string) ?? {
        token: "",
      };


    getAllusers = async (): Promise<apiCalls> => {
        const res = await HttpGetCallerWhole("users", {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userPerson.token}`,
        });
    
        return res;
      };
    
      getUser = async (id: string): Promise<apiCalls> => {
        const res = await HttpGetCallerWhole(`user/${id}`, {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userPerson.token}`,
        });
    
        return res;
      };

      signUp = async (load: createUser): Promise<apiCalls> => {
        // console.log(`create user load`, load);
        const res = await HttpOTHERcaller(
          `create`,
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

      Login = async (load: Login): Promise<apiCalls> => {
        // console.log(`login`, load);
        const res = await HttpOTHERcaller(
          `login`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };
      CreateOTP = async (load: CreateOTP): Promise<apiCalls> => {
        // console.log(`create user load`, load);
        const res = await HttpOTHERcaller(
          `otp/create`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };

      ChangePassword = async (load: ChangePassword): Promise<apiCalls> => {
        // console.log(`create user load`, load);
        const res = await HttpOTHERcaller(
          `change-password`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };
}