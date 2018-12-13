import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html'
})

export class PeopleComponent implements OnInit {
    form: any;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            birthDate: [null, Validators.required],
            rg: [null, Validators.required],
            cpf: [null, Validators.required],
            motherName: [null],
            email: [null, Validators.required, Validators.email],
            phone: [null],
            password: [null],
            confirmPassword: [null]
        });
    }

}
