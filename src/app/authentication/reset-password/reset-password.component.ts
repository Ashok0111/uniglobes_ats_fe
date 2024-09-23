import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormGroup, FormsModule, FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay, Observable, of } from 'rxjs';
import { APISERVICE } from '../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule,CommonModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

    // isToggled
    isToggled = false;
    pathURL:any;
    // Password Hide
    hide = true;
    hide2 = true;
    uid: string;
    token: string;
    decodedToken: any;
    setPassword: FormGroup;

    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public auth:APISERVICE
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

  ngOnInit(): void {
    // Extracting parameters from the URL
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.pathURL=this.uid+"/"+this.token+"/"
    this.setPassword = this.fb.group({
        password: ['', [Validators.required,Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')],asyncValidator ],
        confirm_password: ['', Validators.required]
    }, { validator: this.passwordMatchValidator

    });
    // Optionally, decode the JWT token
}
// Custom validator to check if passwords match
passwordMatchValidator(g: FormGroup): { [key: string]: boolean } | null {
    return g.get('password')?.value === g.get('confirm_password')?.value
      ? null
      : { mismatch: true };
  }
onSubmit(){
    if (this.setPassword.valid) {
        // Handle form submission
        console.log('Form Submitted!', this.setPassword.value);
        this.auth.reset_password( this.setPassword.value,this.pathURL).subscribe((res)=>{
            // console.log(res,"result")
        });
      } else {
        console.log('Form is invalid');
      }
}


}
export function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    // Simulating async operation, like an HTTP request
    return of(null).pipe(delay(1000)); // Always returns null after 1 second delay
  }
