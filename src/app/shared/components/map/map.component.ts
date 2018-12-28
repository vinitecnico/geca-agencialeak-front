import { Component, Input, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import * as _ from 'lodash';

// Classes
import { Marker } from '../../classes/marker.class';
import { PeopleMap } from '../../classes/people-map.class';

// Services
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Input() type: string;
  items: any;
  zoom: Number = 10;
  ico: String = 'assets/images/map-people.png';

  // initial center position for the map
  lat: Number = -23.5489;
  lng: Number = -46.6388;
  name: string;

  constructor(private mapService: MapService) {

  }

  ngOnInit() {
    if (this.type === 'people') {
      this.mapService.getAllPeople()
        .subscribe((response) => {
          this.items = _.map(response, (x: PeopleMap) => {
            const position = _.split(x.endereco_contato.gps, ',');
            return {
              name: x.dados_pessoais.name,
              lat: parseFloat(_.trim(_.first(position))),
              lng: parseFloat(_.trim(_.last(position))),
              draggable: false
            };
          });
        }, (erro) => {
          console.log(erro);
        });
    }
  }

  clickedMarker(label: string, index: number) {
    this.name = _.capitalize(this.items[index].name);
    console.log(`clicked the marker: ${name}`);
  }

  mapClicked($event: any) {
    this.items.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
