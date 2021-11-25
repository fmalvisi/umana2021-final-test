import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { initializeKeycloak } from './keycloak-init.factory';

export function initApp(keycloak: KeycloakService, config: ConfigService) {
  return (): Observable<boolean> => {
    console.log('initApp will start now');
    return new Observable<boolean>(subscriber => {
      config
        .loadConfig()
        .pipe(
          tap(res => {
            console.log('initApp loadConfig tap res', res);
          }),
          mergeMap(() => {
            return initializeKeycloak(keycloak, config);
          }),
          tap(res => {
            console.log('initApp initializeKeycloak tap res', res);
          }),
        )
        .subscribe(res => {
          console.log('initApp res', res);
          subscriber.complete();
        });
    });
  };
}
