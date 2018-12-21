import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as _ from 'lodash';

// Class
import { People } from '../../classes/people.class';

// Services
import { PeopleService } from '../../services/people.service';

declare var swal: any;

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    providers: [{
        provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})

export class PeopleComponent implements OnInit {
    @ViewChild('stepper') stepper;
    genders: any = ['Masculino', 'Feminino'];
    transgeneros: any = ['Travesti', 'Transexual'];
    orientacaoSexuals: any = [' Heterosexual', 'Homossexual', 'Bissexual'];
    etnias: any = ['Negro', 'Indígena', 'Mulato/Pardo', 'Asiático', 'Indiano', 'Latino/Hispânico',
        'Branco', 'Árabe/Oriente Médio', 'Outra'];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    isEditable = false;
    _id: string;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private peopleService: PeopleService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    changeStep(stepper: MatStepper, form: FormGroup) {
        stepper.next();
    }

    ngOnInit() {
        this.firstFormGroup = this.formBuilder
            .group({
                name: ['', Validators.required],
                cpf: ['', Validators.required],
                rg: '',
                birthDate: '',
                etnia: '',
                motherName: '',
                sexo: [null, Validators.required],
                transgenero: '',
                orientacosexusal: '',
                socialName: ''
            });

        this.secondFormGroup = this.formBuilder
            .group({
                zipcode: ['', Validators.required],
                address: '',
                numberAddress: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                gps: '',
                phone: '',
                mobile: '',
                email: ['', Validators.email],
                facebook: '',
                instagram: '',
                twitter: ''
            });

        this.thirdFormGroup = this.formBuilder
            .group({
                company: '',
                admissionDate: '',
                terminationDate: '',
                positionCompany: '',
                workplace: '',
                Sindicalizado: '',
                associationNumber: '',
                militante: '',
                directorsindication: '',
                electoraltitle: '',
                zone: '',
                section: '',
                county: '',
                state: ''
            });

        this.fourthFormGroup = this.formBuilder
            .group({
                correios: '',
                telefone: '',
                sms: '',
                whatsapp: '',
                email: '',
                score: '',
                history: ''
            });

        if (this._id) {
            this.peopleService.getById(this._id)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                    } else {
                        this.router.navigateByUrl('/registration/people-list');
                    }
                }, () => {
                    this.router.navigateByUrl('/registration/people-list');
                });
        }
    }

    setValueData(request: People): void {
        this.firstFormGroup.setValue(request.dados_pessoais);
        this.secondFormGroup.setValue(request.endereco_contato);
        this.thirdFormGroup.setValue(request.profissional_eleitoral);
        this.fourthFormGroup.setValue(request.notificacoes_anotacoes);
    }

    save() {
        if (!this.firstFormGroup.valid || !this.secondFormGroup.valid ||
            !this.thirdFormGroup.valid || !this.fourthFormGroup.valid) {
            swal({
                text: 'Por favor validar todos os campos antes de finalizar cadastro!',
                type: 'warning'
            });
            return;
        }

        const request = {
            _id: this._id,
            dados_pessoais: this.firstFormGroup.value,
            endereco_contato: this.secondFormGroup.value,
            profissional_eleitoral: this.thirdFormGroup.value,
            notificacoes_anotacoes: this.fourthFormGroup.value
        };

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
