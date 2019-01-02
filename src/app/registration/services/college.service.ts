import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// classes
import { College } from '../classes/college.class';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CollegeService {

    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService,
        @Inject('LocalStorage') localStorage,
        private utilsService: UtilsService) { }

    getAll(request): Observable<any[]> {
        const url = `${this.apiConfig.domain}api/colegio`;
        return this.http.get<any[]>(url, {
            headers: httpOptions.headers,
            params: this.utilsService.setParameters(request)
        });
    }

    getById(_id: string): Observable<College[]> {
        const url = `${this.apiConfig.domain}api/colegio/${_id}`;
        return this.http.get<College[]>(url, httpOptions);
    }

    createOrUpdateCollege(college: College): Observable<any> {
        const url = `${this.apiConfig.domain}api/colegio`;

        if (college._id) {
            return this.http.put(`${url}/${college._id}`, college, httpOptions);
        } else {
            return this.http.post(url, college, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.domain}api/colegio/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
