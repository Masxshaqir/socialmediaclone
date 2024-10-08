import { SERVER_URL } from "../../utils/constant";
import {
  fetchAPI,
  UnAuthorizedPOSTRequestOption,
  POSTRequestOption,
  GETRequestOption,
  DELETERequestOptionWithBody,
} from "./headers";

export const login = async (body) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/login/`,
    UnAuthorizedPOSTRequestOption(body)
  );
};

export const register = async (body) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/register/`,
    UnAuthorizedPOSTRequestOption(body)
  );
};

export const logout = async () => {
  return await fetchAPI(`${SERVER_URL}/accounts/logout/`, POSTRequestOption());
};

export const getProfile = async (eMail) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/get_profile/`,
    POSTRequestOption(eMail)
  );
};

export const getAllUsers = async () => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/get_all_users/`,
    GETRequestOption()
  );
};

export const getFollowingUsers = async () => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/get_following_users/`,
    GETRequestOption()
  );
};

export const addFriend = async (email) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/add_friend/`,
    POSTRequestOption(email)
  );
};

export const deleteFriend = async (email) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/delete_friend/`,
    DELETERequestOptionWithBody(email)
  );
};





