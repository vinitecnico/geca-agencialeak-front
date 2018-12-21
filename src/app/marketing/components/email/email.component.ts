import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as jQuery from 'jquery';

import * as _ from 'lodash';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html'
})

export class EmailComponent implements OnInit {
    form: FormGroup;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder
            .group({
                title: ['', Validators.required],
                text: ['', Validators.required]
            });
    }

    sendEmail() {

    }
}
