import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  /* istanbul ignore next */
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  /* istanbul ignore next */
  .catch(
    /* istanbul ignore next */
    err =>
      /* istanbul ignore next */
      console.error(err));
