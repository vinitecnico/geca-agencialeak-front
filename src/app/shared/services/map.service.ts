import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { PeopleMap } from '../classes/people-map.class';
import { FairMap } from '../classes/fair-map.class';
import { EnterpriseMap } from '../classes/enterprise-map.class';
import { CollegeMap } from '../classes/college-map.class';

// Services
import { StartupConfigService } from './startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'content': 'application/json' })
};

@Injectable()
export class MapService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    getAll(): Observable<any[]> {
        const url = `${this.apiConfig.domain}api/map`;
        return this.http.get<any[]>(url, httpOptions);
    }

    getAllPeople(): Observable<PeopleMap[]> {
        const url = `${this.apiConfig.domain}api/map/pessoa`;
        return this.http.get<PeopleMap[]>(url, httpOptions);
    }

    getAllEnterprise(): Observable<EnterpriseMap[]> {
        const url = `${this.apiConfig.domain}api/map/empresa`;
        return this.http.get<EnterpriseMap[]>(url, httpOptions);
    }

    getAllCollege(): Observable<CollegeMap[]> {
        const url = `${this.apiConfig.domain}api/map/colegio`;
        return this.http.get<CollegeMap[]>(url, httpOptions);
    }

    getAllFair(): Observable<FairMap[]> {
        const url = `${this.apiConfig.domain}api/map/feira`;
        return this.http.get<FairMap[]>(url, httpOptions);
    }
}
