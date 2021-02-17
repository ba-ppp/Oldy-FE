import Environment from "api/env";

type props = {
    email: string
}

const forgot = ( { email } : props) => {

  const data = {
    email: email
  };
  const url = Environment.getForgotEndPoint();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.errorCode === 0) {
          // SUCCESS
          resolve(response.data);
        } else {
          // FAIL
          reject(response);
        }
      })
      .catch((e) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

export default forgot;