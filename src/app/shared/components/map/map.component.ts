import { Component, Input, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import * as _ from 'lodash';

// Classes
import { Marker } from '../../classes/marker.class';
import { PeopleMap } from '../../classes/people-map.class';
import { FairMap } from '../../classes/fair-map.class';
import { EnterpriseMap } from '../../classes/enterprise-map.class';
import { CollegeMap } from '../../classes/college-map.class';

// Services
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Input() type: string;
  items: any;
  zoom: Number = 8;

  // initial center position for the map
  lat: Number = -23.5489;
  lng: Number = -46.6388;
  name: string;

  constructor(private mapService: MapService) {

  }

  getWeekImgURL(day) {
    switch (day) {
      case 'terca':
        return 'assets/images/Feiras/feira-ciano.png';
      case 'quarta':
        return 'assets/images/Feiras/feira-laranja.png';
      case 'quinta':
        return 'assets/images/Feiras/feira-magenta.png';
      case 'sexta':
        return 'assets/images/Feiras/feira-marrom.png';
      case 'sabado':
        return 'assets/images/Feiras/feira-verde.png';
      default:
        return 'assets/images/Feiras/feira-violeta.png';
    }
  }

  setWeekName(value) {
    switch (value) {
      case 'segunda':
        return 'Segunda-Feira';
      case 'terca':
        return 'Terça-Feira';
      case 'quarta':
        return 'Quarta-Feira';
      case 'quinta':
        return 'Quinta-Feira';
      case 'sexta':
        return 'Sexta-Feira';
      case 'sabado':
        return 'Sábado';
      case 'domingo':
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
      case 'enterprise':
        this.mapService.getAllEnterprise()
          .subscribe((data) => {
            this.items = this.setEnterprise(data);
          }, (erro) => {
            console.log(erro);
          });
        break;
      case 'college':
        this.mapService.getAllCollege()
          .subscribe((data) => {
            this.items = this.setCollege(data);
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
      default:
        this.mapService.getAll()
          .subscribe((response) => {
            const data = _.first(response);
            this.items = _.union(this.setPeople(data.pessoa), this.setFair(data.feira), this.setEnterprise(data.empresa),
              this.setCollege(data.colegio));
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
          icon: 'assets/images/work.png',
          draggable: false
        };
      })
      .value();
  }

  setCollege(data) {
    return _.chain(data)
      .filter((x: any) => {
        return x && x.gps;
      })
      .map((x: CollegeMap) => {
        const position = _.split(x.gps, ',');
        return {
          name: x.name,
          lat: parseFloat(_.trim(_.first(position))),
          lng: parseFloat(_.trim(_.last(position))),
          icon: 'assets/images/escolas/casa-02.png',
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
