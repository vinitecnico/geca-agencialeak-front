import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

// Services
import { EmailService } from '../../services/email.service';
import { Email } from '../../classes/email.class';

declare var swal: any;

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html'
})

export class EmailComponent implements OnInit {
    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private emailService: EmailService) {
    }

    ngOnInit() {
        this.form = this.formBuilder
            .group({
                title: ['', Validators.required],
                text: ['', Validators.required]
            });
    }

    sendEmail() {
        if (!this.form.valid) {
            swal({
                text: 'Por favor validar todos os campos antes de finalizar cadastro!',
                type: 'warning'
            });
            return;
        }

        const data: any = this.form.value;
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(data.text, 'text/html');
        // tslint:disable-next-line:quotemark
        data.text = oDOM.body.innerHTML.replace(/"/g, "'");

        this.emailService.sendEmail(data)
            .subscribe((response) => {
                swal({
                    text: response,
                    type: 'success'
                });
            }, (error) => {
                swal({
                    text: 'Erro para enviar e-mail!',
                    type: 'error'
                });
            });
    }
}
