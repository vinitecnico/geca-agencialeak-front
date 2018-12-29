import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-map-generic',
    templateUrl: './map-generic.component.html'
})

export class MapGenericComponent implements OnInit {
    type: string;
    constructor(private router: Router) {
        router.events.subscribe((val: NavigationEnd) => {
            if (val.url) {
                switch (val.url) {
                    case '/map/peoplemap':
                        this.type = 'people';
                        break;
                    case '/map/fairmap':
                        this.type = 'fair';
                        break;
                    case '/map/enterprisemap':
                        this.type = 'enterprise';
                        break;
                }

            }
        });
    }

    ngOnInit() {
    }
}
