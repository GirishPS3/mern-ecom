

import axios from '../../utils/service';
import {
  LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERROR,
  LOGOUT, REGISTER_FAIL, REGISTER_REQUEST,
  REGISTER_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
  FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/user';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { 'Content-Type': "application/json" } };

    const { data } = await axios.post(`/api/v1/user/login`, { email, password }, config);
    localStorage.setItem('session', JSON.stringify({ token: data.token }));
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message })
  }
}
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { 'Content-Type': "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/user/register`, userData, config);
    localStorage.setItem('session', JSON.stringify({ token: data.token }));
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.message })
  }
}
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { 'Content-Type': "multipart/form-data" } };
    console.log(userData);
    const { data } = await axios.put(`/api/v1/user/update`, userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message })
  }
}
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { 'Content-Type': "application/JSON" } };
    const { data } = await axios.put(`/api/v1/user/update/password`, JSON.stringify(passwords), config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message })
  }
}
export const forgotPassword = (user) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { 'Content-Type': "application/JSON" } };
    const { data } = await axios.post(`/api/v1/user/forgot-password`, JSON.stringify(user), config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.message })
  }
}
export const resetPassword = (token, pwd) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { 'Content-Type': "application/json" } };
    const { data } = await axios.put(`/api/v1/user/reset-password/${token}`, JSON.stringify(pwd), config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.message })
  }
}
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
}
export const logout = () => (dispatch) => {
  localStorage.removeItem('session');
  dispatch({ type: LOGOUT })
}
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.get(`/api/v1/user/userDetails`);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message })
  }
}
// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/user/getAllusers`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/user/getSingleUser/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/user/update/role/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/delete/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};