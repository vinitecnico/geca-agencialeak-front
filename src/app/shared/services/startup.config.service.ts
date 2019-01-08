import { Injectable } from '@angular/core';

@Injectable()
export class StartupConfigService {
    value: any;

    getConfig(): string {
        const host = window.location.host;

        if (host.indexOf('geca-agencialeak-front-dev.herokuapp.com') >= 0) {
            // dev
            this.value = 'https://geca-agencialeak-api-dev.herokuapp.com/';
            return this.value;
        } else if (host.indexOf('geca-agencialeak-front.herokuapp.com') >= 0) {
            // Prod';
            this.value = 'https://geca-agencialeak-front.herokuapp.com/';
            return this.value;
        } else {
            // local
            this.value = 'https://geca-agencialeak-api-dev.herokuapp.com/';
            return this.value;
        }
    }
}
