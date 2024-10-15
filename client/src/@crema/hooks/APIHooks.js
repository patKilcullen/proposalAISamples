import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { isRequestSuccessful, sanitizeData } from '@crema/helpers/ApiHelper';
import jwtAxios from '../services/auth/jwt-auth';
import { fetchError } from '../../toolkit/actions';

export const useGetDataApi = (
  url,
  initialData = undefined,
  params = {},
  initialCall = true,
  callbackFun,
) => {
  const [initialUrl, setInitialUrl] = useState(url);
  const [allowApiCall, setAllowApiCall] = useState(initialCall);
  const [loading, setLoading] = useState(initialCall);
  const [apiData, setData] = useState(initialData);
  const [queryParams, updateQueryParams] = useState(params);
  const resStateRef = useRef(false);
  const didCancelRef = useRef(false);

  const updateInitialUrl = (value) => {
    setAllowApiCall(true);
    setInitialUrl(value);
  };

  const reCallAPI = () => {
    setQueryParams(queryParams);
  };

  const setQueryParams = (queryParams) => {
    setLoading(true);
    updateQueryParams({ ...queryParams });
    setAllowApiCall(true);
  };

  useEffect(() => {
    didCancelRef.current = false;
    const fetchData = () => {
      resStateRef.current = true;
      let params = {};
      if (!_.isEmpty(queryParams)) {
        params = {
          ...trimObjectValues(queryParams),
        };
      }
      jwtAxios
        .get(initialUrl, { params: sanitizeData(params) })
        .then((data) => {
          console.log(
            initialUrl,
            data.data,
            didCancelRef.current,
            isRequestSuccessful(data.status),
          );
          resStateRef.current = false;
          if (!didCancelRef.current) {
            if (isRequestSuccessful(data.status)) {
              setLoading(false);
              setData(data.data);
              if (callbackFun) callbackFun(data.data);
            } else {
              setLoading(false);
              console.log('Error', data.data);
              fetchError(data.data.error ? data.data.error : data.data.message);
              setData(initialData);
              if (callbackFun) callbackFun(data.data);
            }
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            console.log(initialUrl, error.response.data.message);
            if (callbackFun) callbackFun(error.response.data);
            fetchError(error.response.data.message);
          } else {
            fetchError(error.message);
            if (callbackFun) callbackFun(error);
          }
          setLoading(false);
        });
    };
    if (allowApiCall && !resStateRef.current) fetchData();
    return () => {
      didCancelRef.current = true;
    };
  }, [initialUrl, queryParams, allowApiCall]);
  return [
    {
      loading,
      apiData,
      initialUrl,
    },
    {
      setData,
      setLoading,
      updateInitialUrl,
      setQueryParams,
      reCallAPI,
    },
  ];
};

export const trimObjectValues = (obj) => {
  if (_.isEmpty(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};

const handleApiResponse = (url, fetchSuccess, data, resolve, reject) => {
  console.log(url, data.data);
  fetchSuccess();
  if (isRequestSuccessful(data.status)) {
    return resolve(data.data);
  } else {
    return reject(data.data);
  }
};

const handleAPIError = (url, fetchSuccess, error, reject) => {
  console.log(url, error.response.data.message);
  fetchSuccess();
  if (error?.response?.data?.message) {
    return reject(error.response.data);
  } else {
    return reject(error);
  }
};

export const postDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
  headers,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(url, sanitizeData(payload), headers ? { headers } : {})
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const putDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, sanitizeData(payload))
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const getDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
  headers,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url, { params: sanitizeData(params), headers })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const deleteDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .delete(url, { params })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const uploadDataApi = (
  url,
  infoViewContext,
  payload = {},
  isHideLoader = false,
  onUploadProgress = () => {
    console.log('');
  },
  allowDownload = false,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(url, payload, {
        onUploadProgress,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        responseType: allowDownload ? 'arraybuffer' : 'stream',
      })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const uploadPutDataApi = (
  url,
  infoViewContext,
  payload = {},
  isHideLoader = false,
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, payload, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};
