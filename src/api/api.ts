import axios from "axios";
import { ICredentials, IJsonResponse, IImageItem, ISignUpFormData, ITerm, IUser } from "interfaces";
import { NewTerm, TermForUpdate } from "types";
import { LsKeys } from "utils";
import { ChangeLevelActions } from "enums";

// const DEV_CONNECTION = "http://localhost:4000/api/";
const DEV_CONNECTION = "http://192.168.0.3:4000/api";
const PROD_CONNECTION = "https://strange-newt-battledress.cyclic.app/api/";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? DEV_CONNECTION : PROD_CONNECTION;

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
    signIn: async (credentials: ICredentials) => {
      try {
        const { data }: { data: IJsonResponse<IUser> } = await axios.post(
          "/users/login",
          credentials
        );
        const user = data.data;
        token.set(user.token);
        localStorage.setItem(LsKeys.Token, user.token);

        return user;
      } catch (error) {
        throw error;
      }
    },
    signUp: async (credentials: ISignUpFormData) => {
      try {
        const { data }: { data: IJsonResponse<IUser> } = await axios.post(
          "/users/signup",
          credentials
        );

        return data.statusCode;
      } catch (error) {
        throw error;
      }
    },
    signOut: async () => {
      try {
        await axios.get("/users/logout");
        localStorage.removeItem(LsKeys.Token);
        return true;
      } catch (error) {
        throw error;
      }
    },
    getCurrentUser: async () => {
      try {
        const tokenFromLs = localStorage.getItem(LsKeys.Token);
        if (!tokenFromLs) throw new Error();

        token.set(tokenFromLs);
        const { data }: { data: IJsonResponse<IUser> } = await axios.get("/users/current");
        const user = data.data;

        return user;
      } catch (error) {
        throw error;
      }
    },
  },

  terms: {
    get: async () => {
      try {
        interface IData {
          items: ITerm[];
        }
        const { data }: { data: IJsonResponse<IData> } = await axios.get("/terms");
        const terms = data.data.items;

        return terms;
      } catch (error) {
        throw error;
      }
    },
    getForLearn: async () => {
      try {
        interface IData {
          items: ITerm[];
        }
        const { data }: { data: IJsonResponse<IData> } = await axios.get("/terms/for-learn");
        const terms = data.data.items;

        return terms;
      } catch (error) {
        throw error;
      }
    },
    create: async (newTerm: NewTerm) => {
      try {
        await axios.post("/terms", newTerm);

        return true;
      } catch (error) {
        throw error;
      }
    },
    remove: async (_id: string) => {
      try {
        await axios.delete(`/terms/${_id}`);

        return true;
      } catch (error) {
        throw error;
      }
    },
    update: async (_id: string, dataForUpdate: TermForUpdate) => {
      try {
        const { data }: { data: IJsonResponse<ITerm> } = await axios.patch(
          `/terms/${_id}`,
          dataForUpdate
        );

        return data.data;
      } catch (error) {
        throw error;
      }
    },
    changeLevel: async (_id: string, action: ChangeLevelActions) => {
      try {
        await axios.patch(`/terms/${_id}/level`, {
          action,
        });

        return true;
      } catch (error) {
        throw error;
      }
    },
  },

  images: {
    get: async (searchQuery = "", page = 1, perPage = 10, axiosConfig = {}) => {
      const searchParams = new URLSearchParams({
        searchQuery,
        page: String(page),
        perPage: String(perPage),
      });

      try {
        interface IData {
          items: IImageItem[];
          total: number;
          totalPages: number;
          page: number;
        }
        const { data }: { data: IJsonResponse<IData> } = await axios.get(
          `/images?${searchParams}`,
          axiosConfig
        );

        return data.data;
      } catch (error) {
        throw error;
      }
    },
  },
};

export { api };
