import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { PeopleMap } from '../classes/people-map.class';
import { FairMap } from '../classes/fair-map.class';
import { EnterpriseMap } from '../classes/enterprise-map.class';

// Services
import { StartupConfigService } from './startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MapService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    getAll(): Observable<any[]> {
        const url = `${this.apiConfig.domain}api/mapfeiraspessoas`;
        return this.http.get<any[]>(url, httpOptions);
    }

    getAllPeople(): Observable<PeopleMap[]> {
        const url = `${this.apiConfig.domain}api/maps`;
        return this.http.get<PeopleMap[]>(url, httpOptions);
    }

    getAllFair(): Observable<FairMap[]> {
        const url = `${this.apiConfig.domain}api/mapfeiras`;
        return this.http.get<FairMap[]>(url, httpOptions);
    }

    getAllEnterprise(): Observable<EnterpriseMap[]> {
        const url = `${this.apiConfig.domain}api/mapempresas`;
        return this.http.get<EnterpriseMap[]>(url, httpOptions);
    }
}
