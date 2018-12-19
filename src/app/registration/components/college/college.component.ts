import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { College } from '../../classes/college.class';
import * as _ from 'lodash';
declare var swal: any;

// services
import { CollegeService } from '../../services/college.service';



@Component({
    selector: 'app-college',
    templateUrl: './college.component.html'
})

export class CollegeComponent implements OnInit {
    form: any;
    _id: string;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private collegeService: CollegeService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            _id: [null],
            name: [null, Validators.required],
            numbervoters: [null],
            electoralzone: [null, Validators.required],
            section: [null, Validators.required],
            specialsection: [null, Validators.required],
            zipcode: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            state: [null],
            gps: [null]
        });

        if (this._id) {
            this.collegeService.getById(this._id)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                    } else {
                        this.router.navigateByUrl('/registration/fair-list');
                    }
                });
        }
    }

    setValueData(request: College): void {
        const data = {
            _id: request._id,
            name: request.name,
            numbervoters: request.numbervoters,
            electoralzone: request.electoralzone,
            section: request.section,
            specialsection: request.specialsection,
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

    save() {
        if (!this.form.valid) {
            // this.formService.validateAllFormFields(this.form);
            return;
        }

        const request = this.form.value;
        this.collegeService.createOrUpdateCollege(request)
            .subscribe((response) => {
                swal({
                    text: `Colégio ${!request._id ? 'criado' : 'alterado'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/registration/college-list');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Colégio!',
                    type: 'error'
                });
            });
    }
}
