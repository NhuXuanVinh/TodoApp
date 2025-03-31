import axios from './axios';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post('/auth/register', { username, email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Error registering');
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', { username, password });4
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Error logging in');
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.get('auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {

    throw new Error(err.response?.data?.msg || 'Token is not valid');
  }
};
