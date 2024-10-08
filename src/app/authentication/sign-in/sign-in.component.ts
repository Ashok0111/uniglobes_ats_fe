import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { APISERVICE } from '../../services/auth.service';
import { genericservice } from '../../services/generic.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    // isToggled
    isToggled = false;
    userRole: any;
    pathMap:any={
        "facilitator":"leads/dashboard",
        "agent":"leads/leads",
        "student":"my-profile/details"

    }
    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        public service: APISERVICE,
        public generic:genericservice
    ) {

        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.service.login(this.authForm.value).subscribe((res: any) => {
                if(res['status_code']==200){
                    let response:any=res['result'];
                    if("access" in response)
                    {
                        localStorage.setItem('token',response["access"]);
                        localStorage.setItem('refresh',response["refresh"]);
                        this.userRole=this.generic.get_userrole_token(response["access"]);
                        localStorage.setItem("default_path",this.pathMap[this.userRole]);
                        this.generic.refreshSubject.next();
                        this.router.navigateByUrl(this.pathMap[this.userRole])


                    }else{
                    console.log("Auth Failed")
                    }
            }
              })
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

}
