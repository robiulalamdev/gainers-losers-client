import axios from "axios";

export const instance = axios.create({
  baseURL: "https://dummyjson.com", //place here your instance url
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
