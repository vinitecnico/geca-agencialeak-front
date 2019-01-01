import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

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

    private setParameters(parameters: any): HttpParams {
        if (parameters) {
            let Params = new HttpParams();
            _.each(parameters, (value, key) => {
                Params = Params.append(key, value);
            });

            return Params;
        }

        return null;
    }
    
    getAll(request): Observable<any[]> {
        const url = `${this.apiConfig.domain}api/pessoa`;
        return this.http.get<any[]>(url, {params: this.setParameters(request)});
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
