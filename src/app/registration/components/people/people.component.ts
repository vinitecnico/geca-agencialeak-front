import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html'
})

export class PeopleComponent implements OnInit {
    genders: any = ['Masculino', 'Feminino'];
    transgeneros: any = ['Travesti', 'Transexual'];
    orientacaoSexuals: any = [' Heterosexual', 'Homossexual', 'Bissexual'];
    etnias: any = ['Negro', 'Indígena', 'Mulato/Pardo', 'Asiático', 'Indiano', 'Latino/Hispânico',
        'Branco', 'Árabe/Oriente Médio', 'Outra'];
    form: any;
    firstFormGroup: any;
    secondFormGroup: any;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.firstFormGroup = this.formBuilder.group({
            name: [null, Validators.required],
            birthDate: [null, Validators.required],
            rg: [null, Validators.required],
            cpf: [null, Validators.required],
            etnia: [null],
            gender: [null, Validators.required],
            transgenero: [null],
            orientacaoSexual: [null],
            motherName: [null],
            socialName: [null],
            email: [null, Validators.required, Validators.email],
            phone: [null],
            password: [null],
            confirmPassword: [null]
        });


        this.secondFormGroup = this.formBuilder.group({
            cep: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            uf: [null],
            gps: [null],
            phone: [null],
            mobile: [null],
            email: [null, Validators.email],
            facebook: [null],
            instagram: [null],
            twitter: [null]
        });
    }

}
