import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper, MatAutocompleteSelectedEvent, ErrorStateMatcher } from '@angular/material';
import * as _ from 'lodash';
import * as moment from 'moment';

// Class
import { People } from '../../classes/people.class';

// Services
import { PeopleService } from '../../services/people.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { EnterpriseService } from '../../services/enterprise.service';
import { map, debounceTime } from 'rxjs/operators';

declare var swal: any;

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html'
})

export class PeopleComponent implements OnInit {
    @ViewChild('stepper') stepper;
    maskDate = this.utilsService.inputMask('date');
    maskCPF = this.utilsService.inputMask('cpf');
    maskPhone = this.utilsService.inputMask('phone');
    maskMobile = this.utilsService.inputMask('mobile');
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
    filteredCompanies: Observable<any>;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private peopleService: PeopleService,
        private utilsService: UtilsService,
        private enterpriseService: EnterpriseService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
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

    getByCpf(cpf: string) {
        if (cpf) {
            this.peopleService.getById(cpf)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                        this._id = cpf;
                    }
                }, (error) => {
                    console.log(error);
                });
        }
    }

    onSearchChangeCpf(cpf: string) {
        if (cpf.length === 14) {
            const onlyNumbers = this.utilsService.onlyNumbers(cpf);
            if (this.utilsService.validationCPF(onlyNumbers)) {
                this.getByCpf(onlyNumbers);
            } else {
                swal({
                    text: 'CPF inválido!',
                    type: 'error'
                });
            }
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

    save(stepper: MatStepper) {
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

        if (request.notificacoes_anotacoes.email && !request.endereco_contato.email) {
            swal({
                text: 'E-mail deve ser informado!',
                type: 'error'
            }).then(() => {
                stepper.selectedIndex = 1;
            });
            return;
        }

        request.dados_pessoais.cpf = this.utilsService.onlyNumbers(request.dados_pessoais.cpf);
        if (!this.utilsService.validationCPF(request.dados_pessoais.cpf)) {
            swal({
                text: 'CPF inválido!',
                type: 'error'
            }).then(() => {
                stepper.selectedIndex = 0;
            });
            return;
        }

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

    updateCompanyOptions(event) {
        if (event.length < 3) {
            return new Observable<any>((array) => { array.next(null); });
        }

        if (typeof event === 'object') {
            return;
        }

        this.filteredCompanies = this.getCompanies(event)
            .distinctUntilChanged();
    }

    getCompanies(value: string): Observable<any> {
        if (typeof value === 'object') {
            return;
        }

        const request: any = {
            page: 1,
            per_page: 20
        };
        if (value) {
            request.value = value;
        }

        return this.enterpriseService.getAll(request)
            .pipe(debounceTime(1000), map((response: any) => response.data))
            .catch((error) => {
                return new Observable<any>((array) => { array.next(null); });
            });
    }

    onCompanySelected = (event: MatAutocompleteSelectedEvent) => {
        if (event.option.value && event.option.value.name) {
            this.thirdFormGroup.controls.company.setValue(event.option.value.name);
            this.thirdFormGroup.controls.workplace.setValue(event.option.value.gps);
        } else {
            this.thirdFormGroup.controls.company.setValue('');
            this.thirdFormGroup.controls.workplace.setValue('');
        }
    }

    displayFn(val: any): string {
        return val && val.name ? val.name : null;
    }
}
