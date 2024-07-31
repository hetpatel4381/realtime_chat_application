// import { serverRoutes } from "@/utils/constants";
import axios from "axios";
import { config } from "@/utils/config";

const apiClient = axios.create({
  baseURL: config.serverOrigin,
});

export default apiClient;
