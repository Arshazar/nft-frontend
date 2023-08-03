import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ReqBody {
  limit?: number;
  offset?: number;
}

class Api {
  token: string = '';
  baseUrl: string =
    'https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears';

  private request<T>(
    method: 'post' | 'get' | 'patch' | 'delete',
    url: string,
    body?: ReqBody,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: this.baseUrl + url,
        ...(body && method === 'get' // Check if it's a 'get' request and has a body (parameters)
          ? {
              params: body // Use 'params' property for GET requests
            }
          : {
              data: body // Use 'data' property for other requests (post, patch, delete)
            }),
        ...config
      })
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  get<T>(url: string, parameters?: ReqBody, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, parameters, config);
  }
}

const api = new Api();

export { api };
