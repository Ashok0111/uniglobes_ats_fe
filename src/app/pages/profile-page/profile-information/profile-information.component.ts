import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import this
import Notiflix from 'notiflix';
import { genericservice } from '../../../services/generic.service';

@Component({
    selector: 'app-profile-information',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, CommonModule,MatMenuModule,DatePipe,FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule],
    templateUrl: './profile-information.component.html',
    styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent {
    userObject: { email: string; first_name: string; last_name: string; phone_number: string; c_address: string; p_address: string; date_joined:string };
    leadForm: FormGroup;
    constructor(
        public service: StudentServices,
        public share:shareService,
        private fb: FormBuilder,
        public dataShare:genericservice
    ) {

    }


    ngOnInit(): void {
     this.getProfile();
     }
    getProfile() {
        this.share.updateProfileOB.subscribe((res)=>{
            this.userObject=res;
            this.leadForm = this.fb.group({
               first_name: [this.userObject.first_name, Validators.required],
               last_name: [this.userObject.last_name, Validators.required],
               phone_number: [this.userObject.phone_number, Validators.required],
               c_address: [this.userObject.c_address, Validators.required],
               p_address: [this.userObject.p_address, Validators.required]
             });

           });
    }
     classApplied = false;
     toggleClass() {
         this.classApplied = !this.classApplied;
     }
     onSubmit(){
        this.service.setMyprofile(this.leadForm.value).subscribe((result)=>{
            if(result['status_code']==200){
                Notiflix.Notify.success('Profile is Updated Successfully');
                this.toggleClass();
                this.service.getMyProfile().subscribe((res)=>{
                    if(res['status_code']==200){
                        this.share.updateProfileData(res["result"]);
                    }

                   });
            }else{
                Notiflix.Notify.failure('Technical issue on updating profile info config');
                this.toggleClass();
            }
        })
     }
}
