import { App } from './src';

App.start()
  .catch((error: any) => {
    process.stderr.write(String(error));
    process.exit(1);
  })
