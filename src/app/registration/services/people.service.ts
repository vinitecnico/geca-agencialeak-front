import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { People } from '../classes/people.class';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PeopleService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    getAll(): Observable<People[]> {
        const url = `${this.apiConfig.domain}api/pessoa`;
        return this.http.get<People[]>(url, httpOptions);
    }

    getById(_id: string): Observable<People[]> {
        const url = `${this.apiConfig.domain}api/pessoa/${_id}`;
        return this.http.get<People[]>(url, httpOptions);
    }

    createOrUpdatePeople(fair: People): Observable<any> {
        const url = `${this.apiConfig.domain}api/pessoa`;

        if (fair._id) {
            return this.http.put(`${url}/${fair._id}`, fair, httpOptions);
        } else {
            return this.http.post(url, fair, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.domain}api/pessoa/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
