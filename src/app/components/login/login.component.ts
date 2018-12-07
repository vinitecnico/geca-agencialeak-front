import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: any;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idAccount: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      // this.formService.validateAllFormFields(this.form);
      return;
    }

    const data = this.form.value;
    alert(true);
  }
}
