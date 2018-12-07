import { API_KEY, API_HOSTNAME, API_ENDPOINT } from "./constants.js";

async function request(query) {
  const url = new URL(API_HOSTNAME + API_ENDPOINT);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("q", query);

  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

export default request;
