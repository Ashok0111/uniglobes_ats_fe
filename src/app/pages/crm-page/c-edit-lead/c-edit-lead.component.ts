import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
import { StudentServices } from '../../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LeadsPopupComponent } from '../../../dashboard/crm/leads-popup/leads-popup.component';
@Component({
	selector: 'app-c-edit-lead',
	standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule,
         MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, 
         MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule,CommonModule,MatDialogModule],
	templateUrl: './c-edit-lead.component.html',
	styleUrl: './c-edit-lead.component.scss',
    providers: [  // ✅ Provide MatDialogRef and MAT_DIALOG_DATA manually
        { provide: MatDialogRef, useValue: {} },
      ]
})
export class CEditLeadComponent {

    editor: Editor;
    SCREEN_TYPE='edit';
    leadForm: FormGroup;
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

    Leadsource: string[] = ["Refferal", "College Referal"];
    IntakeYearBase:string[] =["January","June","September"];
    IntakeYear: { year: number, months: string[] }[] = [];
    application_id:any;
    Country: any;
    University: any;
    Course: any;
    src: any='default';
    @Input() dataSrc: any;
    @Input() message: any; 
    groupMonthsByYear(): void {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        // Group the months under the current and next year
        this.IntakeYear = [
          { year: currentYear, months: this.IntakeYearBase },
          { year: nextYear, months: this.IntakeYearBase }
        ];
      }
    async ngOnInit() {
        if(!this.application_id && this.dataSrc ){
            this.application_id = this.dataSrc?.id; // Get the passed value
            this.src=this.dataSrc?.src
        }
        await this.getLeadsDetails();
        this.editor = new Editor();
        this.studentService.getCountry().subscribe((response:any)=>{
            if(response["status_code"]==200){
                this.Country=response.result
            }
        });
        this.leadForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: [{value:'',disabled: true}, [Validators.required, Validators.email]],
            phone_number: ['', Validators.required],
            c_address: ['', Validators.required],
            p_address: ['', Validators.required],
            year_intake: ['', Validators.required],
            country: [{value:'',disabled: true}, Validators.required],
            university: [{value:'',disabled: true}, Validators.required],
            course: [{value:'',disabled: true}, Validators.required],
            source: [{value:'',disabled: true}, Validators.required],
            status: [{value:'',disabled: true}, Validators.required],
            description: ['']
          });

          this.groupMonthsByYear();
    }
    onSubmit(): void {
        if (this.leadForm.valid) {
          const formValues = this.leadForm.value;

          const result = {
              phone_number: formValues.phone_number,
              first_name: formValues.first_name,
              last_name: formValues.last_name,
              p_address: formValues.p_address,
              c_address: formValues.c_address,
              description: formValues.description,
              application_id:this.application_id
          };
          this.service.updateMyLeadsById(result).subscribe((response)=>{
            if(response.status_code==200){
                Notiflix.Notify.success('Lead is updated succcessfully');
            }else{
                Notiflix.Notify.failure('Technical Error');
            }
        });
        }
    }

    // make sure to destory the editor
    ngOnDestroy(): void {

        this.editor.destroy();
    }
    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        public service:Services,
        public studentService:StudentServices,
        public router:Router,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<LeadsPopupComponent>,
        
        
    ) {
      
        this.application_id= this.route.snapshot.paramMap.get('id');
        if(this.application_id){
            this.getLeadsDetails()

        }
    }

    async getLeadsDetails(){
        this.service.getMyLeadsById(this.application_id).subscribe((response)=>{
            if(response.status_code==200){
                const leadData = response.result[0];
                this.leadForm.patchValue({
                    first_name: leadData.first_name,  // Assuming you might get first_name from another source
                    last_name: leadData.last_name,   // Assuming you might get last_name from another source
                    email: leadData.user_email,
                    phone_number:leadData.phone_number,  // Assuming you might get phone_number from another source
                    c_address: leadData.c_address,  // Assuming you might get c_address from another source
                    p_address: leadData.p_address,  // Assuming you might get p_address from another source
                    year_intake: leadData.year_intake,
                    country: leadData.preferred_country,
                    university: leadData.preferred_university,
                    course: leadData.preferred_course,
                    source: leadData.source,
                    status: leadData.status,
                    description: leadData.description
                });
                this.University=[{id:leadData.preferred_university,name:leadData.university_name}];
                this.Course=[{id:leadData.preferred_course,name:leadData.course_name}];

            }
          });
    }
    // File Uploader
    public multiple: boolean = false;

    // Select Value
    leadSourceSelected = 'option1';
    statusSelected = 'option1';

}
