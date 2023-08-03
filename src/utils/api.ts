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
        ...(body
          ? {
              data: body
            }
          : {}),
        ...config
      })
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          this.handleError(error);
          reject(error);
        });
    });
  }

  private handleError(err: AxiosError) {
    console.log('ERRRROR: ', err);
    if (err.message && typeof err.message === 'string') {
      console.log('ERRRROR: ', err.message);
    } else if (err.message && typeof err.message === 'object') {
      Object.values(err.message).map((errValue) => {
        if (Array.isArray(errValue)) {
          console.log('ERRRROR: ', errValue[0]);
        } else {
          console.log('ERRRROR: ', errValue);
        }
      });
    }
  }

  get<T>(url: string, parameters?: ReqBody, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, parameters, config);
  }
}

const api = new Api();

export { api };
