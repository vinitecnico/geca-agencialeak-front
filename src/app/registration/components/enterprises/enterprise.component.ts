import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprise.component.html'
})

export class EnterpriseComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            cnpj: [null, Validators.required],
            segment: [null],
            activity: [null],
            cep: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            uf: [null],
            mainContact: [null],
            phone: [null],
            mobile: [null],
            email: [null, Validators.email],
            facebook: [null],
            instagram: [null],
            twitter: [null]
        });
    }
}
