import { tap, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ShipsCacheInterceptor implements HttpInterceptor {
  private cache: Map<string, HttpResponse<any>> = new Map();
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(
      JSON.stringify(request)
    );

    if (cachedResponse) {
      console.log('CACHED --> HTTP response');
      return of(cachedResponse.clone());
    } else {
      return next.handle(request).pipe(
        tap((stateEvent) => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(JSON.stringify(request), stateEvent.clone());
          }
        }),
        share()
      );
    }
  }
}
