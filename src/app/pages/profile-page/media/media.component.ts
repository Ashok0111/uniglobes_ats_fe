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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CommonModule } from '@angular/common';
import { E } from '@angular/cdk/keycodes';
import { fileSizeValidator } from './file-size.validator';
import Notiflix from 'notiflix';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';
@Component({
    selector: 'app-media',
    standalone: true,
    imports: [FileUploadModule,MatCardModule,CommonModule ,MatMenuModule, SidebarComponent, MatButtonModule, RouterLink, MatTableModule, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule,ReactiveFormsModule],
    templateUrl: './media.component.html',
    styleUrl: './media.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class MediaComponent implements OnInit {
    @Input() appid = '';
    displayedColumns: string[] = ['folderName', 'owner', 'listedDate', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);
    documentForm: FormGroup;
    uploadedFiles:any;
    selectedFile: File | null = null;
    MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5 MB
    DocsList:any={}
    documentsTypes: string[] = [
        "Passport",
        "Visa",
        "Academic Transcripts",
        "Language Proficiency Test Scores (IELTS, TOEFL)",
        "Letter of Recommendation",
        "Statement of Purpose (SOP)",
        "Resume/Curriculum Vitae (CV)",
        "Financial Statements (Proof of Funds)",
        "Application Form",
        "Offer Letter",
        "Health and Medical Certificate",
        "Scholarship Letters (if applicable)",
        "Birth Certificate",
        "Work Experience Certificates (if applicable)",
        "Research Proposal (for PhD or research-based courses)",
        "Accommodation Proof (if pre-arranged)",
        "Vaccination Records (in some countries)"
      ];
    DocTypes:any= {};
    DocTypeList: any={};
    fileUrl: any;
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
    convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            // Ensure that the parameter passed is a File or Blob
            if (file instanceof Blob) {
                reader.readAsDataURL(file);
            } else {
                reject(new Error('The provided input is not a valid File or Blob'));
            }
        });
    }
    async getFile(){
        const base64String = await this.convertFileToBase64(this.documentForm.value.document_file[0]);
        return base64String
    }
    async onSubmit() {
        if (this.documentForm.valid) {
            let payload={
                'document_type':this.documentForm.value.document_type,
                'document_name':this.documentForm.value.document_file[0].name,
                'document_file':await this.getFile(),
                'document_exn':'png',
                'application_id':this.appid
            }
                this.service.updateMyDocument(payload).subscribe((result:any)=>{
                    if(result['status_code']==200){
                        Notiflix.Notify.success("Document is Updated Successfully")
                    }
                   this.refreshMyDocs();
                   this.toggleClass();
            });



        } else {
          console.log('Form is not valid');
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
        this.share_ser.docTypesOB.subscribe((result:any)=>{
            this.DocTypes=result.doc_types;
            this.DocsList=result.my_docs;
            if(this.DocTypes){
                this.DocTypeList= this.convertListToDict(this.DocTypes);
            }

        });
    }
    ngOnInit(): void {
        this.documentForm = this.fb.group({
            document_type: ['', Validators.required],
            document_file: [null, Validators.required,fileSizeValidator(this.MAX_FILE_SIZE)]
          });
    }
    download_file(element:any){
        let payload={
        "doc_id": element.id,
        "application_id": this.appid
        };
        this.service.downloadMyDocument(payload).subscribe((result:any)=>{
            if(result['status_code']==200){
                this.fileUrl =result['result']['url'];
                this.browserDownload(element);
            }
        });

    }
    delete_my_file(element:any){
        this.service.deleteMyDocument(element.id).subscribe((result:any)=>{
            if(result['status_code']==200){
                Notiflix.Notify.success("Document is deleted Successfully");
                this.refreshMyDocs();
            }
        });

    }
    browserDownload(element:any) {
        if (this.fileUrl) {
          const a = document.createElement('a');
          a.href = this.fileUrl;  // Set the URL from the backend
          a.download = element.document_name;  // Set the desired file name
          a.target = '_blank';
          a.click();  // Trigger the download
        }
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
        this.service.getMyApplicationDetailByID({"application_id":this.appid}).subscribe((response)=>{
            if(response["status_code"]==200){
                this.share_ser.setdocTypesOB(response.result)

            }
        });
    }

}

