import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

// Services
import { PeopleService } from '../../services/people.service';

declare var swal: any;

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
    _id: string;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private peopleService: PeopleService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.firstFormGroup = this.formBuilder
            .group({
                name: [null, Validators.required],
                cpf: [null, Validators.required],
                rg: [null],
                birthDate: [null, Validators.required],
                etnia: [null, Validators.required],
                motherName: [null],
                sexo: [null, Validators.required],
                transgenero: [null],
                orientacosexusal: [null],
                socialName: [null]
            });

        this.secondFormGroup = this.formBuilder
            .group({
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

        this.thirdFormGroup = this.formBuilder
            .group({
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

        this.fourthFormGroup = this.formBuilder
            .group({
                score: [null],
                history: [null]
            });
    }

    save() {
        if (!this.firstFormGroup.valid) {
            // this.formService.validateAllFormFields(this.form);
            return;
        }

        const request = this.firstFormGroup.value;
        this.peopleService.createOrUpdatePeople(request)
            .subscribe((response) => {
                swal({
                    text: `Pessoa ${!request._id ? 'criada' : 'alterada'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/registration/people-list');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar Pessoa!',
                    type: 'error'
                });
            });
    }

}
