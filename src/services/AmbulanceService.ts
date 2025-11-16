import Endpoints from "../config/Endpoints";
import { getAxiosConfig, getFormattedError } from "./AxiosService";

const getAmbulances = async (params: {}) => {
 const actionUrl = `${Endpoints.getAmbulances}`;
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

const getAmbulanceById = async (params: { id: any }) => {
  console.log(params);
 const actionUrl = `${Endpoints.getAmbulanceById(params.id)}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "GET",
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

const addAmbulance = async (params: {}) => {
  const actionUrl = `${Endpoints.addAmbulance}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "POST",
        data: params,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json, text/plain'
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

const updateAmbulance = async (params: {}) => {
  const actionUrl = `${Endpoints.updateAmbulance}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "POST",
        data: params,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json, text/plain'
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

const deleteAmbulance = async (params: { id: any }) => {
  const actionUrl = `${Endpoints.deleteAmbulance(params.id)}`;
    const { axiosInstance, config } = await getAxiosConfig({ mode: 'none' });
    const response = await axiosInstance({
        url: actionUrl,
        method: "DELETE",
        data: params,
        headers: {
          ...config.headers,
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
  getAmbulances,
  getAmbulanceById,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance
}