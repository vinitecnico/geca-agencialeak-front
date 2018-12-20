import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

// Services
import { FairService } from '../../services/fair.service';

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
        private fairService: FairService) {
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
