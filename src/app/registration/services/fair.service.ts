import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { Fair } from '../classes/fair.class';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FairService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    getAll(): Observable<Fair[]> {
        const url = `${this.apiConfig.domain}api/feira`;
        return this.http.get<Fair[]>(url, httpOptions);
    }

    getById(_id: string): Observable<Fair[]> {
        const url = `${this.apiConfig.domain}api/feira/${_id}`;
        return this.http.get<Fair[]>(url, httpOptions);
    }

    createOrUpdateFair(fair: Fair): Observable<any> {
        const url = `${this.apiConfig.domain}api/feira`;

        if (fair._id) {
            return this.http.put(`${url}/${fair._id}`, fair, httpOptions);
        } else {
            return this.http.post(url, fair, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.domain}api/feira/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
