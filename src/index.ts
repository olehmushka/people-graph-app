import { HttpApp } from './http-server';

export class App {
  public static async start() {
    return Promise.all([
      HttpApp.start(),
    ]);
  }
}
