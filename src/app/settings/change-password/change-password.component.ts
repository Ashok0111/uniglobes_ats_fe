import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { APISERVICE } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { asyncValidator } from '../../authentication/reset-password/reset-password.component';
@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule,NgIf],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

    // Password Hide
    hide = true;
    hide2 = true;
    hide3 = true;
    authForm: FormGroup;
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        public fb: FormBuilder,
        public service: APISERVICE,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.authForm = this.fb.group({
            old_password: ['', [Validators.required]],
            current_password:['', [Validators.required,Validators.minLength(8),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')],asyncValidator ],
            confirm_password: ['', [Validators.required]],
        });        
    }
    
    onSubmit(){
        this.service.changePassword(this.authForm.value).subscribe((res:any)=>{
            console.log(res)
        })
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}