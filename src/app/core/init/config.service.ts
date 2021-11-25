import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../interfaces/appConfig';

@Injectable()
export class ConfigService {
  constructor(protected http: HttpClient) {}

  config: AppConfig | undefined;

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('assets/config.json').pipe(
      tap(res => {
        console.log('ConfigService loadConfig tap res', res);
        this.config = res;
      }),
    );
  }
}
