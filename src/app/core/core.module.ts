import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { CoreRoutingModule } from './core-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { LayoutModule } from '../layout/layout.module';
import { ConfigService } from './init/config.service';
import { ApiModule, Configuration } from './api/generated';
import { initApp } from './init/app-init.factory';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    KeycloakAngularModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [CoreRoutingModule],
  providers: [
    AuthGuard,
    KeycloakService,
    ConfigService,
    ApiModule,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [KeycloakService, ConfigService, HttpClient],
    },
    {
      provide: Configuration,
      useFactory: (config: ConfigService): Configuration => {
        return new Configuration({
          basePath: config.config?.apiBasePath,
        });
      },
      deps: [ConfigService],
    },
  ],
})
export class CoreModule {}
