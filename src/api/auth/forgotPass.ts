import Environment from "api/env";
import axios from "axios";

type props = {
    email: string
}

export type response = {
  code: string,
  token: string
}


const forgot = ( { email } : props): Promise<response> => {
  const data = {
    email: email
  };
  const url = Environment.getForgotEndPoint();
    return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response: any) => {
        resolve(response)
      })
      .catch((e) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

export default forgot;