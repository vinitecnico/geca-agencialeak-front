import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';

// import { } from '@types/googlemaps';

import * as _ from 'lodash';

// declare var GMaps: any;

// class
import { PeopleMap } from '../../classes/people-map.class';

// services
import { MapService } from '../services/map.service';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
    selector: 'app-map-people',
    templateUrl: './map-people.component.html'
})

export class MapPeopleComponent implements OnInit {
    // google maps zoom level
    zoom: Number = 10;

    // initial center position for the map
    lat: Number = -23.5489;
    lng: Number = -46.6388;
    name: string;
    data: any[];
    markers: any[];

    constructor(private mapService: MapService) {
    }

    clickedMarker(label: string, index: number) {
        this.name = _.capitalize(this.data[index].name);
        console.log(`clicked the marker: ${name}`);
    }

    mapClicked($event: MouseEvent) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        });
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    ngOnInit() {
        const mapId = document.getElementById('map');
        this.mapService.getAllPeople()
            .subscribe((response) => {
                this.data = _.map(response, (x: PeopleMap) => {
                    const position = _.split(x.endereco_contato.gps, ',');
                    return {
                        name: x.dados_pessoais.name,
                        lat: parseFloat(_.trim(_.first(position))),
                        lng: parseFloat(_.trim(_.last(position))),
                        draggable: false
                    };
                });

                this.markers = this.data;

            }, (erro) => {
                console.log(erro);
            });
    }
}
