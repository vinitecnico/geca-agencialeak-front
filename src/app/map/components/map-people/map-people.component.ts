import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-map-people',
    templateUrl: './map-people.component.html'
})

export class MapPeopleComponent implements OnInit {
    // google maps zoom level
    markers: any[];

    constructor() {
    }

    ngOnInit() {
    }
}
