import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default client;
