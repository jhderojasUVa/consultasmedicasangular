import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ConsultasmedicasModule } from './app/consultasmedicas.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ConsultasmedicasModule)
  .catch(err => console.log(err));
