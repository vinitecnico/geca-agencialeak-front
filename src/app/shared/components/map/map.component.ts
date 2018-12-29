import { Component, Input, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import * as _ from 'lodash';

// Classes
import { Marker } from '../../classes/marker.class';
import { PeopleMap } from '../../classes/people-map.class';
import { FairMap } from '../../classes/fair-map.class';
import { EnterpriseMap } from '../../classes/enterprise-map.class';

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

  setWeekName(value) {
    switch (value) {
      case 'Segunda':
        return 'Segunda-Feira';
      case 'Terca':
        return 'Terça-Feira';
      case 'Quarta':
        return 'Quarta-Feira';
      case 'Quinta':
        return 'Quinta-Feira';
      case 'Sexta':
        return 'Sexta-Feira';
      case 'Sabado':
        return 'Sábado';
      case 'Domingo':
        return 'Domingo';
    }
  }

  ngOnInit() {
    switch (this.type) {
      case 'people':
        this.mapService.getAllPeople()
          .subscribe((data) => {
            this.items = this.setPeople(data);
          }, (erro) => {
            console.log(erro);
          });
        break;
      case 'fair':
        this.mapService.getAllFair()
          .subscribe((data) => {
            this.items = this.setFair(data);
          }, (erro) => {
            console.log(erro);
          });
        break;
      case 'enterprise':
        this.mapService.getAllEnterprise()
          .subscribe((data) => {
            this.items = this.setEnterprise(data);
          }, (erro) => {
            console.log(erro);
          });
        break;
      default:
        this.mapService.getAll()
          .subscribe((response) => {
            const data = _.first(response);
            this.items = _.union(this.setPeople(data.pessoa), this.setFair(data.feira));
          }, (erro) => {
            console.log(erro);
          });
        break;
    }
  }

  setPeople(data) {
    return _.chain(data)
      .filter((x: any) => {
        return x.endereco_contato && x.endereco_contato.gps;
      })
      .map((x: PeopleMap) => {
        const position = _.split(x.endereco_contato.gps, ',');
        return {
          name: x.dados_pessoais.name,
          lat: parseFloat(_.trim(_.first(position))),
          lng: parseFloat(_.trim(_.last(position))),
          icon: 'assets/images/map-people.png',
          draggable: false
        };
      })
      .value();
  }

  setFair(data) {
    return _.chain(data)
      .filter((x: any) => {
        return x.gps;
      })
      .map((x: FairMap) => {
        const position = _.split(x.gps, ',');
        return {
          name: x.name,
          lat: parseFloat(_.trim(_.first(position))),
          lng: parseFloat(_.trim(_.last(position))),
          icon: this.getWeekImgURL(x.weekday),
          weekday: this.setWeekName(x.weekday),
          draggable: false
        };
      })
      .value();
  }

  setEnterprise(data) {
    return _.chain(data)
      .filter((x: any) => {
        return x && x.gps;
      })
      .map((x: EnterpriseMap) => {
        const position = _.split(x.gps, ',');
        return {
          name: x.name,
          lat: parseFloat(_.trim(_.first(position))),
          lng: parseFloat(_.trim(_.last(position))),
          icon: 'assets/images/enterprise.png',
          draggable: false
        };
      })
      .value();
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
