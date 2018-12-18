import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import value from '*.json';

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
    firstFormGroup: any;
    secondFormGroup: any;
    thirdFormGroup: any;
    fourthFormGroup: any;
    fifthFormGroup: any;
    isEditable = true;

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
            zipcode: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            state: [null],
            gps: [null],
            phone: [null],
            mobile: [null],
            email: [null, Validators.email],
            facebook: [null],
            instagram: [null],
            twitter: [null]
        });

        this.thirdFormGroup = this.formBuilder.group({
            company: [null],
            admissionDate: [null],
            terminationDate: [null],
            positionCompany: [null],
            workplace: [null],
            sindcalizado: [null],
            associationNumber: [null],
            militante: [null],
            indicacaoDiretor: [null],
            tituloEleitoral: [null],
            zona: [null],
            secao: [null],
            municipio: [null],
            state: [null]
        });

        this.fourthFormGroup = this.formBuilder.group({
            score: [null],
            history: [null]
        });

        this.fifthFormGroup = this.formBuilder.group({
            score: [null],
            history: [null]
        });
    }

}
