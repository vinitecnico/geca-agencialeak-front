import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class

// Services
import { StartupConfigService } from 'src/app/shared/services/startup.config.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmailService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    // getAllPeople(): Observable<any[]> {
    //     const url = `${this.apiConfig.domain}api/maps`;
    //     return this.http.get<any[]>(url, httpOptions);
    // }

    sendEmail(request) {
        const url = `${this.apiConfig.domain}api/maps`;
        return this.http.post(url, request);
    }
}
