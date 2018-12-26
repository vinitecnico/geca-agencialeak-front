import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

// Services
import { EmailService } from '../../services/email.service';

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

        const request = this.form.value;
        this.emailService.sendEmail(request)
            .subscribe((response) => {
                swal({
                    text: `E-mail enviado com sucesso!`,
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
