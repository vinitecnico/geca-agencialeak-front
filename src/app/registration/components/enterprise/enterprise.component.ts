import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
declare var swal: any;

// Services
import { EnterpriseService } from '../../services/enterprise.service';
import { Enterprise } from '../../classes/enterprise.class';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprise.component.html'
})

export class EnterpriseComponent implements OnInit {
    maskCNPJ = this.utilsService.inputMask('cnpj');
    maskPhone = this.utilsService.inputMask('phone');
    maskMobile = this.utilsService.inputMask('mobile');
    form: any;
    _id: string;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private enterpriseService: EnterpriseService,
        private utilsService: UtilsService,
        private zipcodeService: ZipcodeService) {
        this.route.queryParams.subscribe(params => {
            this._id = params['_id'];
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            _id: [null],
            name: [null, Validators.required],
            cnpj: [null, Validators.required],
            segment: [null],
            activity: [null],
            zipcode: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            state: [null],
            gps: [null],
            mainContact: [null],
            phone: [null],
            mobile: [null],
            email: [null, Validators.email],
            facebook: [null],
            instagram: [null],
            twitter: [null]
        });

        if (this._id) {
            this.enterpriseService.getById(this._id)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                    } else {
                        this.router.navigateByUrl('/registration/enterprise-list');
                    }
                }, () => {
                    this.router.navigateByUrl('/registration/enterprise-list');
                });
        }
    }

    onSearchChangeCnpj(cnpj: string) {
        if (cnpj.length === 18) {
            const onlyNumbers = this.utilsService.onlyNumbers(cnpj);
            this.getByCnpj(onlyNumbers);
        }
    }

    getByCnpjWs(cnpj: string) {
        this.enterpriseService.getByCnpjWs(cnpj)
            .subscribe((data: any) => {
                if (data && data.status === 'ERROR' && data.message === 'CNPJ inválido') {
                    swal({
                        text: data.message || 'Erro para buscar CNPJ!',
                        type: 'error'
                    });
                    return ;
                }

                this._id = null;
                const segment: any = _.first(data.atividade_principal);
                const activity: any = _.first(data.atividades_secundarias);
                const mainContact: any = _.first(data.qsa);
                const zipcode = this.utilsService.onlyNumbers(data.cep);
                this.zipcodeService.getLocation(zipcode)
                    .subscribe((dataLocation: any) => {
                        let gps = null;
                        if (dataLocation && dataLocation.results && _.isArray(dataLocation.results)) {
                            const result: any = _.first(dataLocation.results);
                            if (result && result.geometry && result.geometry.location) {
                                const location = result.geometry.location;
                                gps = `${location.lat}, ${location.lng}`;
                            }
                        }

                        const enterprise: Enterprise = {
                            _id: null,
                            name: _.lowerCase(data.nome),
                            activity: activity ? _.lowerCase(activity.text) : null,
                            address: _.lowerCase(data.logradouro),
                            city: _.lowerCase(data.municipio),
                            cnpj: data.cnpj,
                            complement: _.lowerCase(data.complemento),
                            email: data.email,
                            facebook: null,
                            dataUpdate: null,
                            datacreate: null,
                            instagram: null,
                            mainContact: mainContact ? _.lowerCase(mainContact.nome || mainContact.nome_rep_legal) : null,
                            mobile: null,
                            phone: data.telefone,
                            neighborhood: _.lowerCase(data.bairro),
                            numberAddress: data.numero,
                            segment: segment ? _.lowerCase(segment.text) : null,
                            state: data.uf,
                            twitter: null,
                            zipcode: zipcode,
                            gps: gps
                        };
                        this.setValueData(enterprise);
                    });
            }, (error) => {
                swal({
                    text: error.message || 'Erro para buscar CNPJ!',
                    type: 'error'
                });
            });
    }

    getByCnpj(cnpj: string) {
        if (cnpj) {
            this.enterpriseService.getById(cnpj)
                .subscribe((response) => {
                    if (_.isArray(response)) {
                        this.setValueData(_.first(response));
                        this._id = cnpj;
                    }
                }, (e: any) => {
                    if (e.error === 'Empresa nao encontrada.') {
                        this.getByCnpjWs(cnpj);
                    } else {
                        console.log(e);
                    }
                });
        }
    }

    setValueData(request: Enterprise): void {
        const data = {
            _id: request._id,
            name: request.name,
            cnpj: request.cnpj,
            segment: request.segment,
            activity: request.activity,
            zipcode: request.zipcode,
            address: request.address,
            numberAddress: request.numberAddress,
            complement: request.complement,
            neighborhood: request.neighborhood,
            city: request.city,
            state: request.state,
            gps: request.gps,
            mainContact: request.mainContact,
            phone: request.phone,
            mobile: request.mobile,
            email: request.email,
            facebook: request.facebook,
            twitter: request.twitter,
            instagram: request.instagram
        };

        this.form.setValue(data);
    }

    save() {
        if (!this.form.valid) {
            // this.formService.validateAllFormFields(this.form);
            return;
        }

        const request = this.form.value;
        request.cnpj = request.cnpj.replace(/\D/g, '');
        this.enterpriseService.createOrUpdateEnterprise(request)
            .subscribe((response) => {
                swal({
                    text: `Empresa ${!request._id ? 'criada' : 'alterada'} com sucesso!`,
                    type: 'success'
                }).then(() => {
                    this.router.navigateByUrl('/registration/enterprise-list');
                });
            }, (error) => {
                swal({
                    text: 'Erro para criar empresa!',
                    type: 'error'
                });
            });
    }
}
