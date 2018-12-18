import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';

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
            numeroEleitores: [null, Validators.required],
            zona: [null, Validators.required],
            secoes: [null, Validators.required],
            secoesEspeciais: [null, Validators.required],
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
                this.alertService.success('Colégio criada com sucesso!');
                this.form.reset();
            }, (error) => {
                this.alertService.danger('Erro para criar Colégio!');
            });
    }
}
