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
    selector: 'app-experience-detail',
    standalone: true,
    imports: [FileUploadModule,MatCardModule,CommonModule ,MatMenuModule, SidebarComponent, MatButtonModule, RouterLink, MatTableModule, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule,ReactiveFormsModule],
    templateUrl: './experience-detail.component.html',
    styleUrl: './experience-detail.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class ExperienceDetailComponent implements OnInit {
    @Input() appid = '';
    displayedColumns: string[] = ['title', 'company','employment_type', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);
    documentForm: FormGroup;
    uploadedFiles:any;
    selectedFile: File | null = null;
    MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5 MB
    EduList:any[] = [];
    EmpTypes:any= [
        "Intern",
        "FULL TIME",
        "Part Time"
      ];
    DocTypeList: any={};
    fileUrl: any;
    IsEDIT: boolean=false;
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
    async onSubmit() {
        if (this.documentForm.valid) {
            let payload:any={
                'title':this.documentForm.value.title,
                'company':this.documentForm.value.company,
                'employment_type':this.documentForm.value.employment_type,
                'start_date':this.convertToYYYYMMDD(this.documentForm.value.start_date),
                'end_date':this.convertToYYYYMMDD(this.documentForm.value.end_date),
            }
            if(!this.IsEDIT){
                this.service.addExperience(payload).subscribe((result)=>{
                    if(result['status_code']==200){
                        Notiflix.Notify.success("Experience is Updated Successfully")
                    }
                   this.refreshMyDocs();
                   this.toggleClass();
                    });
        }else{
            payload['id']=this.CurrentEdit.id;
            this.service.updateExperience(payload).subscribe((result)=>{
                if(result['status_code']==200){
                    Notiflix.Notify.success("Experience is Updated Successfully")
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
    convertToYYYYMMDD(dateString:any) {
        const date = new Date(dateString);

        // Get the year, month, and day
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
        const day = ('0' + date.getDate()).slice(-2); // Padding day with '0' if it's a single digit

        return `${year}-${month}-${day}`;
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
            title: ['', Validators.required],
            company: ['', Validators.required],
            employment_type: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required]
          });
    }
    delete_my_file(element:any){
        this.service.deleteMyExperience(element.id).subscribe((result:any)=>{
            if(result['status_code']==200){
                Notiflix.Notify.success("Experience is deleted Successfully");
                this.refreshMyDocs();
            }
        });

    }
    edit_record(payload:any){
        this.IsEDIT=true;
        this.CurrentEdit=payload;
        this.toggleClass();
        this.documentForm = this.fb.group({
            title: [payload.title, Validators.required],
            company: [payload.company, Validators.required],
            employment_type: [payload.employment_type, Validators.required],
            start_date: [payload.start_date, Validators.required],
            end_date: [payload.end_date, Validators.required],
          });
    }
    addExperience(){
        this.IsEDIT=false;
        this.toggleClass();
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
        this.service.getExperience().subscribe((result:any)=>{
            if(result['status_code']==200){
                this.EduList=result.result;
            }
        });
    }

}

