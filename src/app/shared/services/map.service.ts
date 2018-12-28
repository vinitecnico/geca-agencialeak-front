import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Class
import { PeopleMap } from '../classes/people-map.class';
import { FairMap } from '../classes/Fair-map.class';

// Services
import { StartupConfigService } from './startup.config.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MapService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    getAllPeople(): Observable<PeopleMap[]> {
        const url = `${this.apiConfig.domain}api/maps`;
        return this.http.get<PeopleMap[]>(url, httpOptions);
    }

    getAllFair(): Observable<FairMap[]> {
        const url = `${this.apiConfig.domain}api/mapfeiras`;
        return this.http.get<FairMap[]>(url, httpOptions);
    }
}
