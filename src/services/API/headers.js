
export const getHeaders = () => {
  const myHeaders = new Headers();
  const token = "1234567890";
  if (token !== null) {
    myHeaders.append("clientId", token);
    myHeaders.append("Accept-Language", "en");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  return myHeaders;
};

export const UnAuthorizedHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
};

export const UnAuthorizedPOSTRequestOption = (bodyData) => {
  return {
    method: "POST",
    headers: UnAuthorizedHeaders(),
    body: JSON.stringify(bodyData),
    redirect: "follow",
  };
};

export const POSTRequestOption = (bodyData) => {
  return {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(bodyData),
    redirect: "follow",
  };
};

export const DELETERequestOption = () => {
  return {
    method: "DELETE",
    headers: getHeaders(),
    redirect: "follow",
  };
};

export const GETRequestOption = () => {
  return {
    method: "GET",
    headers: getHeaders(),
    redirect: "follow",
  };
};

export const PUTRequestOption = (bodyData) => {
  return {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(bodyData),
    redirect: "follow",
  };
};

export const PATCHRequestOption = (bodyData) => {
  return {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(bodyData),
    redirect: "follow",
  };
};

export const fetchAPI = async (url, requestOptions) => {
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const responseBody = await response.clone().json();
      throw new Error(`HTTP error! Status: ${responseBody.errors}`);
    }
    const contentLength = response.headers.get("content-length");
    if (contentLength === "0") return null;
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch")
      throw new Error("Network error: Unable to connect to the API.");
    throw error;
  }
};
