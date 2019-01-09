import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// Class
import { Enterprise } from '../classes/enterprise.class';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';
import { UtilsService } from 'src/app/shared/services/utils.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EnterpriseService {

    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService,
        @Inject('LocalStorage') localStorage,
        private utilsService: UtilsService) { }

    getAll(request): Observable<any[]> {
        const url = `${this.apiConfig.getConfig()}api/empresa`;
        return this.http.get<any[]>(url, {
            headers: httpOptions.headers,
            params: this.utilsService.setParameters(request)
        });
    }

    getById(_id: string): Observable<Enterprise[]> {
        const url = `${this.apiConfig.getConfig()}api/empresa/${_id}`;
        return this.http.get<Enterprise[]>(url, httpOptions);
    }

    getByCnpjWs(cnpj: string) {
        const url = `https://geca-agencialeak-api.herokuapp.com/api/cnpjws/${cnpj}`;
        return this.http.get(url, httpOptions);
    }

    createOrUpdateEnterprise(fair: Enterprise): Observable<any> {
        const url = `${this.apiConfig.getConfig()}api/empresa`;

        if (fair._id) {
            return this.http.put(`${url}/${fair._id}`, fair, httpOptions);
        } else {
            return this.http.post(url, fair, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.getConfig()}api/empresa/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
