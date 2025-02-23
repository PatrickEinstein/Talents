/* eslint-disable */
// export const uri = "http://16.171.233.55:2300/api";
export const uri = "http://localhost:2300/api";
// export const uri = "https://talents-back.onrender.com/api"



export const HttpGetCallerWhole = async (endpoint: string, headers: any) => {
  try {
    const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    const responseData = await savedUserResponse.json();
    if (responseData?.status === 401) {
      window.location.href = "/";
    }

    return responseData;
  } catch (err) {
    return err;
  }
};

export const HttpGetCallerFileWhole = async (
  endpoint: string,
  headers: any
) => {
  try {
    const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    const responseData = await savedUserResponse;
    if (responseData?.status === 401) {
      window.location.href = "/";
    }

    return responseData;
  } catch (err) {
    return err;
  }
};

export const HttpOTHERcaller = async (
  endpoint: string,
  headers: any,
  method: string,
  body: any
) => {
  try {
    const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

    const responseData = await savedUserResponse.json();
    if (responseData?.status === 401) {
      window.location.href = "/";
    }

    return responseData;
  } catch (err) {
    return err;
  }
};

export const HttpOTHERcallerForm = async (
  endpoint: any,
  headers: any,
  method: string,
  body: any
) => {
  try {
    const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
      method: method,
      headers: headers,
      body: body,
    });

    const responseData = await savedUserResponse.json();
    if (responseData?.status === 401) {
      window.location.href = "/";
    }

    return responseData;
  } catch (err) {
    return err;
  }
};

export default HttpGetCallerWhole;
