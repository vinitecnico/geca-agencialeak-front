import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

// Services
import { FairService } from '../../services/fair.service';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { Zipcode } from 'src/app/shared/classes/zipcode.classe';

declare var swal: any;

@Component({
    selector: 'app-fair',
    templateUrl: './fair.component.html'
})

export class FairComponent implements OnInit {
    form: any;
    zipcodeLoading: Boolean = false;
    _id: string;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private fairService: FairService,
        private zipcodeService: ZipcodeService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.createForm();

        if (this._id) {
            this.fairService.getById(this._id)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                    } else {
                        this.router.navigateByUrl('/registration/fair-list');
                    }
                });
        }
    }

    setValueData(request): void {
        const data = {
            _id: request._id,
            name: request.name,
            weekday: request.weekday,
            zipcode: request.zipcode,
            address: request.address,
            numberAddress: request.numberAddress,
            complement: request.complement,
            neighborhood: request.neighborhood,
            city: request.city,
            state: request.state,
            gps: request.gps
        };

        this.form.setValue(data);
    }

    getZipcode() {
        setTimeout(() => {
            const request: any = this.form.value;
            if (request.zipcode.length >= 8) {
                this.zipcodeLoading = true;
                this.zipcodeService.getZipCode(request.zipcode)
                    .subscribe(data => {
                        this.zipcodeLoading = false;
                        const zipcode = this.zipcodeResponse(data);

                        this.form.controls.zipcode.setValue(zipcode.zipcode);
                        this.form.controls.address.setValue(zipcode.address);
                        this.form.controls.complement.setValue(zipcode.complement);
                        this.form.controls.neighborhood.setValue(zipcode.neighborhood);
                        this.form.controls.city.setValue(zipcode.city);
                        this.form.controls.state.setValue(zipcode.state);
                    }, (error) => {
                        this.zipcodeLoading = false;
                    });
            }
        }, 400);
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

    createForm() {
        this.form = this.formBuilder.group({
            _id: [null],
            name: [null, Validators.required],
            weekday: [null, Validators.required],
            zipcode: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            state: [null],
            gps: [null]
        });
    }

    save() {
        if (!this.form.valid) {
            // this.formService.validateAllFormFields(this.form);
            return;
        }

        const request = this.form.value;
        this.fairService.createOrUpdateFair(request)
            .subscribe((response) => {
                swal({
                    text: `Feira ${!request._id ? 'criada' : 'alterada'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/registration/fair-list');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Feira!',
                    type: 'error'
                });
            });
    }
}
