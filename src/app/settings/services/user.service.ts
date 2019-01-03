import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// Class
import { User } from '../classes/user.class';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';
import { UtilsService } from 'src/app/shared/services/utils.service';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
        private apiConfig: StartupConfigService,
        @Inject('LocalStorage') localStorage,
        private utilsService: UtilsService) { }

    getAll(request): Observable<any[]> {
        const url = `${this.apiConfig.domain}api/user`;
        return this.http.get<any[]>(url, {
            headers: httpOptions.headers,
            params: this.utilsService.setParameters(request)
        });
    }

    getById(_id: string): Observable<User[]> {
        const url = `${this.apiConfig.domain}api/user/${_id}`;
        return this.http.get<User[]>(url, httpOptions);
    }

    createOrUpdate(user: User): Observable<any> {
        const url = `${this.apiConfig.domain}api/user`;

        if (user._id) {
            return this.http.put(`${url}/${user._id}`, user, httpOptions);
        } else {
            return this.http.post(url, user, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.domain}api/user/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
