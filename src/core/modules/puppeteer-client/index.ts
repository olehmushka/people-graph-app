import puppeteer, { Browser } from 'puppeteer';
import isNil from 'lodash/isNil';

export type LoadEvent =
  | 'load'
  | 'domcontentloaded'
  | 'networkidle0'
  | 'networkidle2';

export interface IPuppeteerLaunchOptions {
  defaultViewport?: {
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
    isLandscape?: boolean;
  } | null;
  headless?: boolean;
  args?: string[];
  userDataDir?: string;
  devtools?: boolean;
  timeout?: number;
  waitUntil?: LoadEvent | LoadEvent[];
}

export interface IPuppeteerClientOptions {
  launch?: IPuppeteerLaunchOptions;
}

export interface IPuppeteerClient {
  launch(): Promise<Browser>;
}

export class PuppeteerClient implements IPuppeteerClient {
  private readonly launchOptions?: IPuppeteerLaunchOptions;
  constructor(private client: typeof puppeteer, options?: IPuppeteerClientOptions) {
    this.launchOptions = {
      headless: false,
      defaultViewport: {
        width: 600,
        height: 800,
      },
      waitUntil: ['load','domcontentloaded','networkidle0','networkidle2'],
      timeout: 30000,
    };
    if (!isNil(options)) {
      this.launchOptions = { ...this.launchOptions, ...options.launch };
    }
  }

  public launch(): Promise<Browser> {
    return this.client.launch(this.launchOptions);
  }
}

export const getPuppeteerClient = (options?: IPuppeteerClientOptions): IPuppeteerClient =>
  new PuppeteerClient(puppeteer, options);
