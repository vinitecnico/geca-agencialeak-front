import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import * as moment from 'moment';

// Services
// import { LocaltSorageService } from '../../shared/services/local-storage.service';
// import { StartupConfigService } from '../../shared/services/startup.config.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient,
        private router: Router,
        @Inject('LocalStorage') localStorage) {
    }

    login(authData): Observable<any> {
        this.checkLocalData();
        const url = '';
        // `${this.apiConfig.value}token`;

        const request = `grant_type=password&username=${authData.username}&password=${authData.password}&domain=${authData.host}`;

        return this.http.post(url, request, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
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
