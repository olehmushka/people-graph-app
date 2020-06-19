import logger from 'pino';

export interface ILogger {
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
}

export interface ILoggerOptions {
  level?: string;
}

export const getLogger = (options: ILoggerOptions): ILogger => logger({ ...options });
