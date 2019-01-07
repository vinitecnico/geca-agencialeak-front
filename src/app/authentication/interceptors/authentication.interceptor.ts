import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(@Inject('LocalStorage') localStorage, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = localStorage.getItem('authData');
        const authObj = JSON.parse(auth);
        const isTokenValid = this.validateAuthenticationToken(authObj);

        if (request.url.indexOf('api/login') > -1) {
            return next.handle(request);
        }

        if (isTokenValid) {
            const authReq = request.clone({
                headers: request.headers.append('x-access-token', authObj.token)
            });

            console.log('Intercepted HTTP call', authReq);

            // send the newly created request
            return next.handle(authReq)
                .pipe(
                    catchError(error => {
                        // checks if a url is to an admin api or not
                        if (error.status === 401 || error.status === 403) {
                            // attempting to refresh our token
                            localStorage.removeItem('authData');
                            this.router.navigateByUrl('/login');
                        }
                        return Observable.throw(error);
                    }));
            // .catch((error, caught) => {
            //     if (error.status === 401 || error.status === 403) {
            //         localStorage.removeItem('authData');
            //         this.router.navigateByUrl('/login');
            //     }

            //     return Observable.throw(error);
            // }) as any;
        }

        if (authObj != null && !isTokenValid) {
            this.router.navigateByUrl('/login');
        }

        return next.handle(request);
    }

    validateAuthenticationToken(authData): boolean {
        if (!authData) {
            return false;
        }

        // const now = moment();
        // const tokenData = moment(authData.expires_in);

        // if (now.diff(tokenData, 'seconds') > 0) {
        //     return false;
        // }

        return true;
    }
}
