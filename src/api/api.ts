import axios from "axios";
import { ICredentials } from "interfaces";

axios.defaults.baseURL = "http://localhost:4000/api/";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const api = {
  user: {
    logIn: async (credentials: ICredentials) => {
      try {
        const { data } = await axios.post("/users/login", credentials);
        token.set(data.token);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export { api };
