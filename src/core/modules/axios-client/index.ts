import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILogger } from '../../lib/logger';

export interface IAxiosClientRequest extends AxiosRequestConfig {}

export interface IAxiosClientResponse<T> extends AxiosResponse<T> {}

export interface IAxiosClientInstance {
  interceptors: {
    request: {
      use: (
        onFulfilled?: (value: IAxiosClientRequest) => IAxiosClientRequest | Promise<IAxiosClientRequest>,
        onRejected?: (error: any) => any,
      ) => number;
    };
    response: {
      use: (
        onFulfilled?: <T>(value: IAxiosClientResponse<T>) => IAxiosClientResponse<T> | Promise<IAxiosClientResponse<T>>,
        onRejected?: (error: any) => any,
      ) => number;
    };
  };

  get<T = any, R = IAxiosClientResponse<T>>(url: string, config?: IAxiosClientRequest): Promise<R>;
  post<T = any, R = IAxiosClientResponse<T>>(url: string, data?: any, config?: IAxiosClientRequest): Promise<R>;
  put<T = any, R = IAxiosClientResponse<T>>(url: string, data?: any, config?: IAxiosClientRequest): Promise<R>;
  patch<T = any, R = IAxiosClientResponse<T>>(url: string, data?: any, config?: IAxiosClientRequest): Promise<R>;
  delete<T = any, R = IAxiosClientResponse<T>>(url: string, config?: IAxiosClientRequest): Promise<R>;
  head<T = any, R = IAxiosClientResponse<T>>(url: string, config?: IAxiosClientRequest): Promise<R>;
  options<T = any, R = IAxiosClientResponse<T>>(url: string, config?: IAxiosClientRequest): Promise<R>;
}

export interface IAxiosClientConfig {
  baseURL: string;
  headers: { [key: string]: string };
  fulfilledHandler?: {
    request?: (value: IAxiosClientRequest) => IAxiosClientRequest | Promise<IAxiosClientRequest>;
    response?: <T>(value: IAxiosClientResponse<T>) => IAxiosClientResponse<T> | Promise<IAxiosClientResponse<T>>;
  };
  rejectedHandler?: {
    request?: (error: any) => any;
    response?: (error: any) => any;
  };
  logger: ILogger;
}

export class AxiosClient {
  public instance: IAxiosClientInstance;
  private logger: ILogger;

  constructor(config: IAxiosClientConfig) {
    this.logger = config.logger;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 1000,
      headers: {
        ...config.headers,
      },
    });

    this.instance.interceptors.request.use(
      config?.fulfilledHandler?.request ?? this.defaultRequestFulfilledHandler.bind(this),
      config?.rejectedHandler?.request ?? this.defaultRequestRejectedHandler.bind(this),
    );
    this.instance.interceptors.response.use(
      config?.fulfilledHandler?.response ?? this.defaultResponseFulfilledHandler.bind(this),
      config?.rejectedHandler?.response ?? this.defaultResponseRejectedHandler.bind(this),
    );
  }

  private defaultRequestFulfilledHandler(value: IAxiosClientRequest): IAxiosClientRequest {
    return value;
  }

  private defaultResponseFulfilledHandler<T>(value: IAxiosClientResponse<T>): IAxiosClientResponse<T> {
    return value;
  }

  private defaultRequestRejectedHandler(error: any): never {
    this.logger.error('axios rejected request', error);
    throw error;
  }
  private defaultResponseRejectedHandler(error: any): never {
    this.logger.error('axios rejected response', error);
    throw error;
  }
}
