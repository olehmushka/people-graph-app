import { interfaces, controller, httpGet, request } from 'inversify-express-utils';
import { Request } from 'express';
import yaml from 'yamljs';
import { resolve } from 'path';
import { version } from '../../../../../package.json';
import config from '../../../../../config';

@controller('/swagger.json')
export class SwaggerController implements interfaces.Controller {
  @httpGet('/')
  public get(@request() req: Request): object {
    const doc = yaml.load(resolve(__dirname, '../../../../../swagger.yml'));

    doc.schemas = ['https', 'http'];
    doc.host = req.get('host');
    doc.basePath = config.servers.http.swaggerBasePath.replace(/\/$/gm, '');
    doc.info.version = version;

    return doc;
  }
}
