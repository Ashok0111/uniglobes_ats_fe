

import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';
import { StudentServices } from '../../../services/student.service';
@Component({
    selector: 'app-c-create-agent',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule,CommonModule],
    templateUrl: './c-create-agent.component.html',
    styleUrl: './c-create-agent.component.scss'
  })
export class CCreateAgentComponent {

    // Text Editor
    leadForm: FormGroup;
    editor: Editor;
    Country:any;
    University:any;
    Course:any;
    ApplicationObject:any={'lead':{}}
    Leadsource: string[] = ["Refferal", "College Referal"];
    IntakeYearBase:string[] =["January","June","September"];
    IntakeYear: { year: number, months: string[] }[] = [];
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    ngOnInit(): void {

        this.editor = new Editor();
        
        this.leadForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone_number: ['', Validators.required],
            c_address: ['',],
            p_address: ['',]
          });
    }
    onSubmit(): void {
        if (this.leadForm.valid) {
          const formValues = this.leadForm.value;

          const result = {
            user: {
              email: formValues.email,
              phone_number: formValues.phone_number,
              first_name: formValues.first_name,
              last_name: formValues.last_name,
              p_address: formValues.p_address,
              c_address: formValues.c_address
            }
          };
          this.service.createAgent(result).subscribe((response)=>{
            if(response.status_code==201){
                Notiflix.Notify.success('Agent is created succcessfully');
                Notiflix.Notify.success('Agent Creation mails is created trigerred ');
                this.router.navigateByUrl('agent/list-agent')
            }
          });

        } else {
          console.log('Form is invalid');
        }
    }
    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

    // File Uploader
    public multiple: boolean = false;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        public service:Services,
        public router:Router,
        public studentervice:StudentServices,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}

