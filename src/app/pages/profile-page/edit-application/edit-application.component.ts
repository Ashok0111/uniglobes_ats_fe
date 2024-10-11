import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { shareService } from '../../../services/share.service';
import { StudentServices } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EducationalDetailComponent } from '../education-detail/education-detail.component';
import { MediaComponent } from '../media/media.component';
import { CommunicationComponent } from '../communication/communication.component';

@Component({
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, MatRadioModule, MatCheckboxModule,CommonModule,MatSlideToggleModule,MediaComponent,EducationalDetailComponent,CommunicationComponent],
    templateUrl: './edit-application.component.html',
    styleUrl: './edit-application.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class EditApplicationComponent implements OnInit {

    // File Uploader
    public multiple: boolean = false;

    // isToggled
    isToggled = false;
    application_id: string;
    ApplicationObject:any;
    Country:any;
    University:any;
    Course:any;
    constructor(
        public themeService: CustomizerSettingsService,
        public route:Router,
        public snap:ActivatedRoute,
        public service:StudentServices,
        public share_ser:shareService

    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.application_id = this.snap.snapshot.paramMap.get('lead_id')!;

    }
    ngOnInit(): void {
        this.service.getCountry().subscribe((response:any)=>{
            if(response["status_code"]==200){
                this.Country=response.result
            }
        });
        this.service.getMyApplicationDetailByID({"application_id":this.application_id}).subscribe((response)=>{
            if(response["status_code"]==200){
                this.ApplicationObject=response.result;
                this.share_ser.setdocTypesOB(this.ApplicationObject);
                this.University=this.ApplicationObject.university_list;
                this.Course=this.ApplicationObject.course_list;

            }
        });
    }
    getUniverityList(){
        this.ApplicationObject.lead.preferred_university.id=null;
        this.ApplicationObject.lead.preferred_course.id=null;
        this.service.getUniversity(this.ApplicationObject.lead.preferred_country.id).subscribe((response)=>{
            if(response["status_code"]==200){
                this.University=response.result;
            }
        });
    }
    getCourseList(){
        this.ApplicationObject.lead.preferred_course.id=null;
        this.service.getCourse(this.ApplicationObject.lead.preferred_university.id).subscribe((response)=>{
            if(response["status_code"]==200){
                this.Course=response.result;
            }
        });
    }
    updateMyProfile(){
        var payload={
            "visa_slot_booking":this.ApplicationObject.lead.visa_slot_booking,
            "flight_ticket_booking":this.ApplicationObject.lead.flight_ticket_booking,
            "preferred_country":this.ApplicationObject.lead.preferred_country.id || '',
            "preferred_university":this.ApplicationObject.lead.preferred_university.id || '',
            "preferred_course":this.ApplicationObject.lead.preferred_course.id || '',
        }
        this.service.updateMyApplicationDetail(this.application_id,payload).subscribe((response)=>{

        });
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
