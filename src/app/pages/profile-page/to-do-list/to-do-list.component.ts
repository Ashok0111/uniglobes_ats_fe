import { DatePipe, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentServices } from '../../../services/student.service';

@Component({
    selector: 'app-to-do-list:not(pp)',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule,DatePipe,ReactiveFormsModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ELEMENT_DATA: any[];
    displayedColumns: string[] = [ 'application_id','user_email','agent_name','created_date','status','action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);

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

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskID + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        public service: StudentServices,
        public router:Router,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    editLead(payload:any){
        this.router.navigateByUrl("my-applications/view-application/"+payload.application_id)
    }
    deleteLeads(id:any){

    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    ngOnInit(): void {
        this.service.getMyApplications().subscribe((result:any)=>{
         if(result['status_code']==200){
            this.ELEMENT_DATA=result.result;
            this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
            this.ngAfterViewInit();
         }

        });
     }
     ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}

