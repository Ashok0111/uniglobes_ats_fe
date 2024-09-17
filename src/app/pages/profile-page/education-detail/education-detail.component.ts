import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CommonModule } from '@angular/common';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';
import Notiflix from 'notiflix';
@Component({
    selector: 'app-education-detail',
    standalone: true,
    imports: [FileUploadModule,MatCardModule,CommonModule ,MatMenuModule, SidebarComponent, MatButtonModule, RouterLink, MatTableModule, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule,ReactiveFormsModule],
    templateUrl: './education-detail.component.html',
    styleUrl: './education-detail.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class EducationalDetailComponent implements OnInit {
    @Input() appid = '';
    displayedColumns: string[] = ['education', 'institute','score', 'created_date', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);
    documentForm: FormGroup;
    uploadedFiles:any;
    selectedFile: File | null = null;
    MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5 MB
    EduList:any[] = [];
    IsEDIT=false;
    DocTypes:any= [
        "10th (Secondary School Certificate - SSC/Matriculation)",
        "12th (Higher Secondary Certificate - HSC/Intermediate/Pre-University)",
        "Undergraduate (Bachelor's Degree)",
        "Postgraduate (Master's Degree)",
        "Doctorate (PhD)"
      ];
    DocTypeList: any={};
    fileUrl: any;
    CurrentEdit: any;
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }
    addEducation(){
        this.IsEDIT=false;
        this.toggleClass();
    }
    edit_record(payload:any){
        this.IsEDIT=true;
        this.CurrentEdit=payload;
        this.toggleClass();
        this.documentForm = this.fb.group({
            education: [payload.education, Validators.required],
            institute: [payload.institute, Validators.required],
            score: [payload.score, Validators.required],
          });
    }
    async onSubmit() {
        if (this.documentForm.valid) {
            let payload:any={
                'education':this.documentForm.value.education,
                'institute':this.documentForm.value.institute,
                'score':this.documentForm.value.score,
            }
            if(!this.IsEDIT){
                this.service.addEducation(payload).subscribe((result)=>{
                    if(result['status_code']==200){
                        Notiflix.Notify.success("Education is Updated Successfully")
                    }
                   this.refreshMyDocs();
                   this.toggleClass();
            });
        }else{
            payload['id']=this.CurrentEdit.id
        this.service.updateEducation(payload).subscribe((result)=>{
            if(result['status_code']==200){
                Notiflix.Notify.success("Education is Updated Successfully")
            }
           this.refreshMyDocs();
           this.toggleClass();
    });

        }



        } else {
          console.log('Education Form is not valid');
        }
      }
      addKeyValuePair(key: string, value: any): void {
        this.documentForm.addControl(key, new FormControl(value, Validators.required));
      }
    classApplied = false;
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.folderName + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Popup Trigger
    toggleClass() {
        this.classApplied = !this.classApplied;

    }

  // Capture the selected file
  onFileSelected(event: any): void {
    const file: File = event.target.files;
    if (file) {
    }
}
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        public service: StudentServices,
        public share_ser:shareService,

    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
         this.refreshMyDocs();

    }
    ngOnInit(): void {
        this.documentForm = this.fb.group({
            education: ['', Validators.required],
            institute: ['', Validators.required],
            score: ['', Validators.required]
          });
    }
    delete_my_file(element:any){
        this.service.deleteMyEducation(element.id).subscribe((result:any)=>{
            if(result['status_code']==200){
                Notiflix.Notify.success("Education is deleted Successfully");
                this.refreshMyDocs();
            }
        });

    }
     convertListToDict(data:any) {
        // Use the reduce function to convert the array into an object
        return data.reduce((acc:any, item:any) => {
            acc[item.id] = item.name;
            return acc;
        }, {}); // Start with an empty object as the accumulator
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    refreshMyDocs(){
        this.service.getEducation().subscribe((result:any)=>{
            if(result['status_code']==200){
                this.EduList=result.result;
            }
        });
    }

}

