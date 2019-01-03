import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// import * as moment from 'moment';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient,
        private router: Router,
        private apiConfig: StartupConfigService,
        @Inject('LocalStorage') localStorage) {
    }

    login(authData): Observable<any> {
        const url = `${this.apiConfig.domain}api/login`;
        return this.http.post(url, authData);
    }

    checkLocalData() {
        const auth = localStorage.getItem('authData');
        const client = localStorage.getItem('clientData');

        if (auth) {
            localStorage.removeItem('authData');
        }

        if (client) {
            localStorage.removeItem('clientData');
        }
    }
}
