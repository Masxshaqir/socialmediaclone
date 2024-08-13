import { SERVER_URL } from "../../utils/constant";
import {
  fetchAPI,
  UnAuthorizedPOSTRequestOption,
  POSTRequestOption,
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
