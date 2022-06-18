import axios from 'axios';

const url = 'https://jwt-authorisation.herokuapp.com';
// const url = 'http://localhost:5000';

export const login = async (email, password, username, check) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await axios.post(url + '/login/', user);

    if (data.message === 'ok') {
      //create a token cookie
      const d = new Date();
      var days = 1;
      if (check) {
        days = 30;
      }

      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = `token=${data.token}; ${expires}; path=/;`;
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const register = async (email, password, username) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await axios.post(url + '/signup/', user);
    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(url + '/forgot/', { email: email });
    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const resetPassword = async (otp, email, password) => {
  try {
    const user = {
      otp: otp,
      password: password,
      email: email,
    };

    const { data } = await axios.post(url + '/reset-password/', user);
    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const authenticate = async () => {
  try {
    var token = decodeURIComponent(document.cookie);
    if (!token || token.length < 6) {
      return false;
    }

    token = token.substring(6);
    const { data } = await axios.post(
      url + '/authenticate/',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.message === 'ok') {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
