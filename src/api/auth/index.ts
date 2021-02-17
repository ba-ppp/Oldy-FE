import Environment from "api/env";

const login = async ({ username, password }: any) => {
  const data = {
    email: username,
    password,
  };
  const url = Environment.getLoginEndpoint();
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
        resolve(response);
      })
      .catch((e) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

const register = ({ email, name, password, phone }: any) => {
  const data = {
    email,
    password,
    name,
    phone,
  };
  const url = Environment.getRegistrationEndPoint();
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

const verifyOTP = ({ email, OTP }: any) => {
  const data = {
    email,
    OTP,
  };
  const url = Environment.getVerifyOTPEndPoint();
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

const forgot = ({ email }: any) => {
  const data = {
    email,
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

export { login, register, verifyOTP, forgot };
