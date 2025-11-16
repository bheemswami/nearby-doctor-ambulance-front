import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
} from "axios";
//
// ------------------------------
// TYPES
// ------------------------------
//
export type AxiosConfigMode = "upload" | "download" | "default" | "none";

export interface GetAxiosConfigProps {
  mode?: AxiosConfigMode; // renamed from `type` → fixes TS error
}

export interface FormattedError {
  success: boolean;
  status: number;
  message: string;
  error: any;
}

export interface ApiErrorResponse {
  isError: boolean;
  msg: string;
}

//
// ------------------------------
// getAxiosConfig()
// ------------------------------
//
export const getAxiosConfig = async ({
  mode = "default",
}: GetAxiosConfigProps): Promise<{
  axiosInstance: AxiosInstance;
  source: CancelTokenSource;
  config: AxiosRequestConfig;
}> => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer 1234567`, // change token if needed
  };

  let config: AxiosRequestConfig = {
    baseURL: "",
    cancelToken: source.token,
    headers,
  };

  // upload
  if (mode === "upload") {
    config = {
      ...config,
      onUploadProgress: () => {
        // optional upload handler
      },
    };
  }

  // download
  else if (mode === "download") {
    config = {
      ...config,
      responseType: "blob",
      onDownloadProgress: () => {
        // optional download handler
      },
    };
  }

  // Create axios instance
  const axiosInstance = axios.create(config);

  // ----------------------------------
  // Response Interceptor
  // ----------------------------------
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // Unauthorized handler if needed
      if ((status === 401 || status === 402) && message?.includes("Unauthorized")) {
        console.log("🔴 Unauthorized → Logging out...");

        // Uncomment if using redux auth
        // store.dispatch(logoutSuccess());
        // store.dispatch(getUserProfileClean());
        // store.dispatch(loginClean());
      }

      return Promise.reject(error);
    }
  );

  return { axiosInstance, source, config };
};


//
// ------------------------------
// Error Formatter
// ------------------------------
//
export const getFormattedError = (err: any): FormattedError => {
  const { status, message, success } = err || {};
  return {
    success: success ?? false,
    status: status || 100,
    message: message || "Network issue. Try again.",
    error: err,
  };
};

//
// ------------------------------
// REQUEST TYPES
// ------------------------------
//
export const getRequest = (): AxiosRequestConfig => ({ method: "GET" });

export const getRequestWithParams = (params: any): AxiosRequestConfig => ({
  method: "GET",
  params,
});

export const postRequest = (params: any): AxiosRequestConfig => ({
  method: "POST",
  data: params,
});

export const postRequestWithParams = (params: any): AxiosRequestConfig => ({
  method: "POST",
  params,
});

export const postFormRequest = (params: FormData): AxiosRequestConfig => ({
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },
  data: params,
});

export const deleteRequest = (params: any): AxiosRequestConfig => ({
  method: "DELETE",
  data: params,
});


//
// ------------------------------
// callApi() - Universal API Caller
// ------------------------------
//
export const callApi = async (
  url: string,
  options: AxiosRequestConfig = {},
  headerParams: Record<string, any> = {}
): Promise<any | ApiErrorResponse> => {
  console.log("[callApi URL]:", url);
  console.log("[callApi Params]:", { url, headerParams, options });

  try {
    const finalHeaders = {
      ...options.headers,
      ...headerParams,
    };

    const response = await axios({
      url,
      ...options,
      headers: finalHeaders,
    });

    return response.data;
  } catch (error: any) {
    console.error("[callApi] Error:", error);

    return {
      isError: true,
      msg:
        error?.response?.data?.message ||
        error.message ||
        "API call failed",
    };
  }
};
