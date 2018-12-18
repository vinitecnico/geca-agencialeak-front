import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { FairService } from '../../services/fair.service';
import { AlertService } from 'ngx-alerts';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { Zipcode } from 'src/app/shared/classes/zipcode.classe';

@Component({
    selector: 'app-fair',
    templateUrl: './fair.component.html'
})

export class FairComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder,
        private fairService: FairService,
        private alertService: AlertService,
        private zipcodeService: ZipcodeService) {
    }

    ngOnInit() {
        this.createForm();
    }

    getZipcode() {
        setTimeout(() => {
            const request: any = this.form.value;
            if (request.zipcode.length >= 8) {
                this.zipcodeService.getZipCode(request.zipcode)
                    .subscribe(data => {
                        const zipcode = this.zipcodeResponse(data);

                        this.form.controls.zipcode.setValue(zipcode.zipcode);
                        this.form.controls.address.setValue(zipcode.address);
                        this.form.controls.complement.setValue(zipcode.complement);
                        this.form.controls.neighborhood.setValue(zipcode.neighborhood);
                        this.form.controls.city.setValue(zipcode.city);
                        this.form.controls.state.setValue(zipcode.state);
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
