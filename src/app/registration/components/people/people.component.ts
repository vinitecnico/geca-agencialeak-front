import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as _ from 'lodash';
import * as moment from 'moment';

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
    maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    maskPhone = ['+', '5', '5', ' ', '(', /[1-9]/,  /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    maskMobile = ['+', '5', '5', ' ', '(', /[1-9]/,  /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
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
        if (request.dados_pessoais && request.dados_pessoais.birthDate) {
            request.dados_pessoais.birthDate = moment(request.dados_pessoais.birthDate, 'YYYY-MM-DD')
                .format('DD/MM/YYYY');
        }
        this.firstFormGroup.setValue(request.dados_pessoais);
        this.secondFormGroup.setValue(request.endereco_contato);
        if (request.profissional_eleitoral && request.profissional_eleitoral.admissionDate) {
            request.profissional_eleitoral.admissionDate = moment(request.profissional_eleitoral.admissionDate, 'YYYY-MM-DD')
                .format('DD/MM/YYYY');
        }
        if (request.profissional_eleitoral && request.profissional_eleitoral.terminationDate) {
            request.profissional_eleitoral.terminationDate = moment(request.profissional_eleitoral.terminationDate, 'YYYY-MM-DD')
                .format('DD/MM/YYYY');
        }
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

        request.dados_pessoais.cpf = request.dados_pessoais.cpf.replace(/\D/g, '');
        if (request.dados_pessoais.birthDate) {
            request.dados_pessoais.birthDate = moment(request.dados_pessoais.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        if (request.profissional_eleitoral.admissionDate) {
            request.profissional_eleitoral.admissionDate = moment(request.profissional_eleitoral.admissionDate, 'DD/MM/YYYY')
                .format('YYYY-MM-DD');
        }

        if (request.profissional_eleitoral.terminationDate && request.profissional_eleitoral.terminationDate !== 'Invalid date') {
            request.profissional_eleitoral.terminationDate = moment(request.profissional_eleitoral.terminationDate, 'DD/MM/YYYY')
                .format('YYYY-MM-DD');
        } else {
            request.profissional_eleitoral.terminationDate = null;
        }

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
