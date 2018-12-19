import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
declare var swal: any;

// services
import { CollegeService } from '../../services/college.service';

@Component({
    selector: 'app-college',
    templateUrl: './college.component.html'
})

export class CollegeComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder,
        private collegeService: CollegeService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
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
                    text: 'Colégio criada com sucesso!',
                    type: 'success'
                }).then(() => {
                    this.form.reset();
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Colégio!',
                    type: 'error'
                });
            });
    }
}
