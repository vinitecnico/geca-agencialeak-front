import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { Dashboard } from '../classes/dashboard.class';

// Services
import { StartupConfigService } from 'src/app/shared/services/startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'content': 'application/json'})
};

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    get(): Observable<Dashboard[]> {
        const url = `${this.apiConfig.domain}api/home`;
        return this.http.get<Dashboard[]>(url, httpOptions);
    }
}
