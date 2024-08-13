import { SERVER_URL } from "../../utils/constant";
import { fetchAPI, UnAuthorizedPOSTRequestOption } from "./headers";

export const login = async (body) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/login/`,
    UnAuthorizedPOSTRequestOption(body)
  );
};

export const register = async (body) => {
  return await fetchAPI(
    `${SERVER_URL}/accounts/register`,
    UnAuthorizedPOSTRequestOption(body)
  );
};
