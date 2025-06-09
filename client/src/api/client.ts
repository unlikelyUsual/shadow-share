import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000",
});

export const setLocalstorage = (data: unknown) => {
  localStorage.setItem("token_user", JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
  localStorage.getItem(key);
};
