import { Component, OnInit } from '@angular/core';

// services
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-map-people',
    templateUrl: './map-people.component.html'
})

export class MapPeopleComponent implements OnInit {
    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this.mapService.getAllPeople()
            .subscribe((response) => {

            }, (erro) => {
                console.log(erro);
            });
    }
}
