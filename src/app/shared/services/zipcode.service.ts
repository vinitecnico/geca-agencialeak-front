import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ZipcodeService {

    constructor(private http: HttpClient) { }

    getZipCode(zipcode: string) {
        const url = `https://viacep.com.br/ws/${zipcode}/json/`;

        return this.http
            .get(url);
    }

    getLocation(zipcode: string) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyAdyvRIRT1iMFRzE4v8BzfGXc-Oc9OFTwk`;
        return this.http
            .get(url);
    }

}
