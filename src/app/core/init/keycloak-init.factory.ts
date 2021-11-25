import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { ConfigService } from './config.service';

export function initializeKeycloak(
  keycloak: KeycloakService,
  config: ConfigService,
): Promise<boolean> {
  if (!config.config) return of(false).toPromise();
  console.log('initializeKeycloak got config', config);
  return keycloak.init({
    config: {
      url: config.config.keycloakUrl,
      realm: config.config.keycloakRealm,
      clientId: config.config.keycloakClientId,
    },
    initOptions: {
      checkLoginIframe: false,
    },
  });
}
