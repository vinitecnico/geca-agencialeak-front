import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { StartupConfigService } from './startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ZipcodeService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService) { }

    getZipCode(zipcode: string) {
        const url = `${this.apiConfig.getConfig()}api/map/viacep/${zipcode}`;
        return this.http
            .get(url);
    }

    getLocation(zipcode: string) {
        const url = `${this.apiConfig.getConfig()}api/map/getGoogleMaps/${zipcode}`;
        return this.http
            .get(url);
    }

}
