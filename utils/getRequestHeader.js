export const getHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-access-token": token,
    "accept-language": localStorage.getItem("i18nextLng") || "en",
  };
};
