import { API } from ".";
import { Server } from "../types/types";

export const serversAPI = {
  getAllServers: (): Promise<Server[] | undefined> => {
    return API.get("servers").then((res) => res.data);
  },
};
