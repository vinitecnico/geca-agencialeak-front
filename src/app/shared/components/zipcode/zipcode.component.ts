import { Component, OnInit, Input } from '@angular/core';
import { Zipcode } from '../../classes/zipcode.classe';
import * as _ from 'lodash';

// services
import { ZipcodeService } from '../../services/zipcode.service';

@Component({
    selector: 'app-zipcode',
    templateUrl: './zipcode.component.html'
})

export class ZipcodeComponent implements OnInit {
    @Input() parentForm: any;
    zipcodeLoading: Boolean = false;

    constructor(private zipcodeService: ZipcodeService) {
    }

    ngOnInit() {
    }

    getZipcode() {
        setTimeout(() => {
            const request: any = this.parentForm.value;
            if (request.zipcode.length >= 8) {
                this.zipcodeLoading = true;
                this.zipcodeService.getZipCode(request.zipcode)
                    .subscribe(data => {
                        if (data && _.isObject(data)) {
                            const zipcode = this.zipcodeResponse(data);

                            this.parentForm.controls.zipcode.setValue(zipcode.zipcode);
                            this.parentForm.controls.address.setValue(zipcode.address);
                            this.parentForm.controls.complement.setValue(zipcode.complement);
                            this.parentForm.controls.neighborhood.setValue(zipcode.neighborhood);
                            this.parentForm.controls.city.setValue(zipcode.city);
                            this.parentForm.controls.state.setValue(zipcode.state);

                            this.zipcodeService.getLocation(zipcode.zipcode)
                                .subscribe((dataLocation: any) => {
                                    this.zipcodeLoading = false;
                                    if (dataLocation && dataLocation.results && _.isArray(dataLocation.results)) {
                                        const result: any = _.first(dataLocation.results);
                                        if (result.geometry && result.geometry.location) {
                                          const location = result.geometry.location;
                                          this.parentForm.controls.gps.setValue(`${location.lat}, ${location.lng}`);
                                        }
                                    }
                                }, (error) => {
                                    this.zipcodeLoading = false;
                                });
                        }
                    }, (error) => {
                        this.zipcodeLoading = false;
                    });
            }
        }, 300);
    }

    private zipcodeResponse(data): Zipcode {
        const zipcode = new Zipcode();
        zipcode.zipcode = data.cep;
        zipcode.address = data.logradouro;
        zipcode.complement = data.complemento;
        zipcode.neighborhood = data.bairro;
        zipcode.city = data.localidade;
        zipcode.state = data.uf;

        return zipcode;
    }

}
