import Endpoints from "../config/Endpoints";
import { getAxiosConfig, getFormattedError } from "./AxiosService";

const nearbySearch = async (params: {}) => {
 const actionUrl = `${Endpoints.nearbySearch}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "GET",
        params: params,
        headers: {
          ...config.headers
        },
    })
    .then((res: any) => {
        return res?.data || null;
    })
    .catch((error: any) => {
        return getFormattedError(error?.response?.data);
    });
    return response;
};

const dashboardStats = async (params: {}) => {
 const actionUrl = `${Endpoints.dashboardStats}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "GET",
        params: params,
        headers: {
          ...config.headers
        },
    })
    .then((res: any) => {
        return res?.data || null;
    })
    .catch((error: any) => {
        return getFormattedError(error?.response?.data);
    });
    return response;
};

const seedRecords = async (params: {}) => {
 const actionUrl = `${Endpoints.seedRecords}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "GET",
        params: params,
        headers: {
          ...config.headers
        },
    })
    .then((res: any) => {
        return res?.data || null;
    })
    .catch((error: any) => {
        return getFormattedError(error?.response?.data);
    });
    return response;
};

export default {
  nearbySearch,
  dashboardStats,
  seedRecords,
}