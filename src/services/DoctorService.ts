import Endpoints from "../config/Endpoints";
import { getAxiosConfig, getFormattedError } from "./AxiosService";

const getDoctors = async (params: {}) => {
 const actionUrl = `${Endpoints.getDoctors}`;
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

const getDoctorById = async (params: { id: any }) => {
  console.log(params);
 const actionUrl = `${Endpoints.getDoctorById(params?.id)}`;
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

const addDoctor = async (params: {}) => {
  const actionUrl = `${Endpoints.addDoctor}`;
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

const updateDoctor = async (params: {}) => {
  const actionUrl = `${Endpoints.updateDoctor}`;
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

const deleteDoctor = async (params: { id: any }) => {
  const actionUrl = `${Endpoints.deleteDoctor(params?.id)}`;
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
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor
}