import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { FairService } from '../../services/fair.service';
import { AlertService } from 'ngx-alerts';

@Component({
    selector: 'app-fair',
    templateUrl: './fair.component.html'
})

export class FairComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder,
        private fairService: FairService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
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
                this.alertService.success('Feira criada com sucesso!');
                this.createForm();
            }, (error) => {
                this.alertService.danger('Erro para criar Feira!');
            });
    }
}
