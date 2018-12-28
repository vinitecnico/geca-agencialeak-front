import { Component, Input, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import * as _ from 'lodash';

// Classes
import { Marker } from '../../classes/marker.class';
import { PeopleMap } from '../../classes/people-map.class';

// Services
import { MapService } from '../../services/map.service';
import { FairMap } from '../../classes/Fair-map.class';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Input() type: string;
  items: any;
  zoom: Number = 10;

  // initial center position for the map
  lat: Number = -23.5489;
  lng: Number = -46.6388;
  name: string;

  constructor(private mapService: MapService) {

  }

  getWeekImgURL(day) {
    switch (day) {
      case 'Terca':
        return 'assets/images/Feiras/feira-ciano.png';
      case 'Quarta':
        return 'assets/images/Feiras/feira-laranja.png';
      case 'Quinta':
        return 'assets/images/Feiras/feira-magenta.png';
      case 'Sexta':
        return 'assets/images/Feiras/feira-marrom.png';
      case 'Sabado':
        return 'assets/images/Feiras/feira-verde.png';
      default:
        return 'assets/images/Feiras/feira-violeta.png';
    }

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
              icon: 'assets/images/map-people.png',
              draggable: false
            };
          });
        }, (erro) => {
          console.log(erro);
        });
    } else if (this.type === 'fair') {
      this.mapService.getAllFair()
        .subscribe((response) => {
          this.items = _.map(response, (x: FairMap) => {
            const position = _.split(x.gps, ',');
            return {
              name: x.name,
              lat: parseFloat(_.trim(_.first(position))),
              lng: parseFloat(_.trim(_.last(position))),
              icon: this.getWeekImgURL(x.weekday),
              weekday: x.weekday,
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
