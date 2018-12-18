import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { StartupConfigService } from '../../shared/services/startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FairService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService, @Inject('LocalStorage') localStorage) { }

    //   getAddresses(status: string = ''): Observable<any[]> {

    //     const clientData = JSON.parse(localStorage.getItem('clientData'));
    //     const url = `${this.apiConfig.value}api/CMS/address/${clientData.id}/${status}`;

    //     return this.http.get<any[]>(url, httpOptions);
    //   }

    createOrUpdateFair(fair: any): Observable<any> {
        const url = `${this.apiConfig.domain}api/feira`;

        if (fair.id) {
            return this.http.put(url, fair, httpOptions);
        } else {
            return this.http.post(url, fair, httpOptions);
        }
    }

    //   getAddressById(id: number): Observable<Address> {

    //     const clientData = JSON.parse(localStorage.getItem('clientData'));
    //     const url = `${this.apiConfig.value}api/CMS/address/id/${id}/${clientData.id}`;

    //     return this.http.get<Address>(url, httpOptions);
    //   }

    //   toggleStatus(id: number, isActive: boolean): Observable<any> {

    //     const clientData = JSON.parse(localStorage.getItem('clientData'));
    //     let url = '';

    //     if (isActive) {
    //       url = `${this.apiConfig.value}api/CMS/address/${id}/${clientData.id}/deactivate`;
    //     } else {
    //       url = `${this.apiConfig.value}api/CMS/address/${id}/${clientData.id}/activate`;
    //     }

    //     return this.http.put<any>(url, httpOptions);
    //   }

}
