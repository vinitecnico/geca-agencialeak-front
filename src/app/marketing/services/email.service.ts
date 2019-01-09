import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { Email } from '../classes/email.class';

// Services
import { StartupConfigService } from 'src/app/shared/services/startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmailService {

    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService,
        @Inject('LocalStorage') localStorage) {

    }

    sendEmail(request: Email) {
        const url = `${this.apiConfig.getConfig()}api/email`;
        return this.http.post(url, request);
    }
}
