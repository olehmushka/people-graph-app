import logger, { BaseLogger } from 'pino';
import { configSchema } from './config.schema';

export interface IConfig {
  logger: {
    level: string;
  };
  formats: {
    datetime: string;
  };
  servers: {
    http: {
      port: number;
      basePath: string;
      swaggerBasePath: string;
    };
    grpc: {
      port: number;
    };
  };
  neo4j: {
    uri: string;
    user: string;
    password: string;
  };
  postgres: {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
  };
  services: {
    wikipedia: {
      host: string;
      paths: {
        countries: string;
      };
    };
    geographic: {
      host: string;
      paths: {
        countryCodes: string;
      };
    };
    restCountries: {
      host: string;
      paths: {
        countriesV2: string;
      };
    };
    instagram: {
      host: string;
      paths: {
        login: string;
      };
      login: {
        email: string;
        password: string;
      };
    };
  };
}

export default ((logger: BaseLogger): IConfig => {
  const configs = {
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    formats: {
      datetime: process.env.DATETIME_FORMAT || 'YYYY-MM-DDTHH:mm:ssZ',
    },
    servers: {
      http: {
        port: parseInt(process.env.HTTP_SERVER_PORT as string, 10) || 3000,
        basePath: process.env.HTTP_BASE_PATH || '/',
        swaggerBasePath: process.env.HTTP_SWAGGER_BASE_PATH || '/',
      },
      grpc: {
        port: parseInt(process.env.GRPC_SERVER_PORT as string, 10) || 3001,
      },
    },
    neo4j: {
      uri: process.env.NEO4J_URI,
      user: process.env.NEO4J_USER,
      password: process.env.NEO4J_PASSWORD,
    },
    postgres: {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    services: {
      wikipedia: {
        host: process.env.WIKIPEDIA_HOST,
        paths: {
          countries: process.env.WIKIPEDIA_COUNTRIES_PATH,
        },
      },
      geographic: {
        host: process.env.GEOGRAPHIC_HOST,
        paths: {
          countryCodes: process.env.GEOGRAPHIC_COUNTRY_CODES,
        },
      },
      restCountries: {
        host: process.env.REST_COUNTRIES_HOST,
        paths: {
          countriesV2: process.env.REST_COUNTRIES_COUNTRIES_V2_PATH,
        },
      },
      instagram: {
        host: process.env.INSTAGRAM_HOST,
        paths: {
          login: process.env.INSTAGRAM_LOGIN_PATH,
        },
        login: {
          email: process.env.INSTAGRAM_LOGIN_EMAIL,
          password: process.env.INSTAGRAM_LOGIN_PASSWORD,
        },
      },
    },
  };
  const { error, value } = configSchema.validate(configs);
  if (error) {
    logger.error('Validation error', error);
  }

  return value;
})(logger());
