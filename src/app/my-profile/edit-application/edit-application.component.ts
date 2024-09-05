import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { shareService } from '../../services/share.service';
import { StudentServices } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MediaComponent } from '../media/media.component';

@Component({
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, MatRadioModule, MatCheckboxModule,CommonModule,MatSlideToggleModule,MediaComponent],
    templateUrl: './edit-application.component.html',
    styleUrl: './edit-application.component.scss'
})
export class EditApplicationComponent implements OnInit {

    // File Uploader
    public multiple: boolean = false;

    // isToggled
    isToggled = false;
    application_id: string;
    ApplicationObject:any;
    constructor(
        public themeService: CustomizerSettingsService,
        public route:Router,
        public snap:ActivatedRoute,
        public service:StudentServices

    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.application_id = this.snap.snapshot.paramMap.get('lead_id')!;

    }
    ngOnInit(): void {
        this.service.getMyApplicationDetailByID({"application_id":this.application_id}).subscribe((response)=>{
            if(response["status_code"]==200){
                console.log(response.result,"data")
                this.ApplicationObject=response.result;
            }
        })
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
