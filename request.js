import { API_KEY, API_HOSTNAME } from "./constants.js";

async function request(query) {
  const path = "/v1/gifs/search";
  const url = new URL(API_HOSTNAME + path);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("q", query);

  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

export default request;
