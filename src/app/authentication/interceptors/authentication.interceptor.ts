import { Injectable, Injector, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(@Inject('LocalStorage') localStorage, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = localStorage.getItem('authData');
        const authObj = JSON.parse(auth);
        const isTokenValid = this.validateAuthenticationToken(authObj);

        if (req.url.indexOf('api/login') > -1) {
            return next.handle(req);
        }

        if (isTokenValid) {
            // Clone the request to add the new header.
            const authReq = req.clone({
                setHeaders: {
                    'x-access-token': authObj.token
                }
            });

            // headers: req.headers.set('x-access-token', authObj.token)

            // send the newly created request
            return next.handle(authReq)
                .catch((error, caught) => {
                    if (error.status === 401 || error.status === 403) {
                        localStorage.removeItem('authData');
                        this.router.navigateByUrl('/login');
                    }

                    return Observable.throw(error);
                }) as any;
        }

        if (authObj != null && !isTokenValid) {
            this.router.navigateByUrl('/login');
        }

        return next.handle(req);
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
