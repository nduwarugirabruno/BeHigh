
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { GlobalsVariables } from './app/shared/globals-variables';
import { LoadingGuard } from './app/shared/guards/loading.guard';

if (environment.production) {
  	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		importProvidersFrom(IonicModule.forRoot({})),
		provideRouter(routes),
		importProvidersFrom(HttpClientModule),
		importProvidersFrom(GlobalsVariables),
		importProvidersFrom(LoadingGuard),
	]
});
