import axios from "axios";
import { ICredentials, IJsonResponse, ISignUpFormData, ITerm, IUser } from "interfaces";
import { NewTerm, TermForUpdate } from "types";
import { LsKeys } from "utils";
import { ChangeLevelActions } from "enums";

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
    update: async (term: TermForUpdate) => {
      try {
        await axios.patch(`/terms/${term._id}`, {
          term: term.term,
          definition: term.definition,
        });

        return true;
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
};

export { api };
