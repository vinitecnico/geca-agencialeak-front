import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { Dashboard } from '../classes/dashboard.class';

// Services
import { StartupConfigService } from 'src/app/shared/services/startup.config.service';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService) { }

    get(): Observable<Dashboard[]> {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/json',
        //       'Authorization': 'res'
        //     })
        //   };

        // let httpHeaders = new HttpHeaders();
        // httpHeaders = httpHeaders.append('Authorization', 'my-auth-token');
        // httpHeaders = httpHeaders.append('ID', '001');
        // httpHeaders.set('Content-Type', 'application/json; charset=utf-8');

        // const options = { headers: httpHeaders };

        const url = `${this.apiConfig.getConfig()}api/home`;
        return this.http.get<Dashboard[]>(url);
    }
}
