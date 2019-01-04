import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Zipcode } from '../../classes/zipcode.classe';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import * as _ from 'lodash';

// services
import { ZipcodeService } from '../../services/zipcode.service';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-zipcode',
    templateUrl: './zipcode.component.html'
})

export class ZipcodeComponent implements OnInit {
    @Input() parentForm: any;
    @ViewChild('zipcodeRef') zipcodeRef: ElementRef;
    @ViewChild('numberAddressRef') numberAddressRef: ElementRef;
    zipcodeLoading: Boolean = false;

    constructor(private zipcodeService: ZipcodeService, private utilsService: UtilsService) {
    }

    ngOnInit() {
        Observable.fromEvent(this.zipcodeRef.nativeElement, 'keyup')
            .map((evt: any) => evt.target.value)
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe((value: string) => this.getZipcode());
    }

    getZipcode() {
        setTimeout(() => {
            const request: any = this.parentForm.value;
            request.zipcode = this.utilsService.onlyNumbers(request.zipcode);
            if (request.zipcode.length >= 8) {
                this.zipcodeLoading = true;
                this.zipcodeService.getZipCode(request.zipcode)
                    .subscribe(data => {
                        this.zipcodeLoading = false;
                        if (data && _.isObject(data)) {
                            const zipcode = this.zipcodeResponse(data);

                            this.parentForm.controls.zipcode.setValue(zipcode.zipcode);
                            this.parentForm.controls.address.setValue(zipcode.address);
                            this.parentForm.controls.complement.setValue(zipcode.complement);
                            this.parentForm.controls.neighborhood.setValue(zipcode.neighborhood);
                            this.parentForm.controls.city.setValue(zipcode.city);
                            this.parentForm.controls.state.setValue(zipcode.state);
                            this.numberAddressRef.nativeElement.focus();
                        }
                    }, (error) => {
                        this.zipcodeLoading = false;
                    });
            }
        });
    }

    setPosition() {
        let value = null;
        if (!this.parentForm.controls.address.value && this.parentForm.controls.numberAddress.value) {
            value = `${this.parentForm.controls.address.value} ${this.parentForm.controls.numberAddress.value}`;
            value = value.replace('+', ' ');
        } else if (this.parentForm.controls.zipcode.value) {
            value = this.parentForm.controls.zipcode.value;
        } else {
            return;
        }
        this.zipcodeService.getLocation(value)
            .subscribe((dataLocation: any) => {
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
