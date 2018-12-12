import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html'
})

export class UserSettingsComponent implements OnInit {
    form: any;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            cpf: [null, Validators.required],
            email: [null, Validators.required, Validators.email],
            phone: [null],
            password: [null],
            confirmPassword: [null]
        });
    }

}
