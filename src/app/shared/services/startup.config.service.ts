import { Injectable } from '@angular/core';

@Injectable()
export class StartupConfigService {
    value: any;
    // domain: String = 'https://geca-agencialeak-api.herokuapp.com/';
    domain: String = 'http://127.0.0.1:3000/';
}
