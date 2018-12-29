import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import * as moment from 'moment';

// services
import { AuthenticationService } from '../../services/authentication.service';

declare var swal: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  passwordType: String = 'password';
  showPasswordError = false;

  constructor(private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    @Inject('LocalStorage') localStorage,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      // this.formService.validateAllFormFields(this.form);
      return;
    }

    this.authenticationService.login(this.form.value)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((response) => {
        const auth = response;
        if (!auth) {
          return;
        }
        localStorage.setItem('authData', JSON.stringify({ expires_in: moment().add(30, 'minutes') }));
        this.router.navigateByUrl('/app/dashboard');
      }, (error) => {
        swal({
          text: 'Usuário ou senha inválido!',
          type: 'warning'
        });
      });
  }

  getHostErrorMessage(): string {
    return '';
  }
}
