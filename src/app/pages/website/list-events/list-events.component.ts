import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';
import { shareService } from '../../../services/share.service';
import Notiflix from 'notiflix';
import { routes } from '../../../../../base/app/app.routes';
import { WebsiteServices } from '../../../services/website.service';
import { CommonModule } from '@angular/common';
import { MatSort,MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatTooltipModule, MatCheckboxModule,
    NgIf, MatPaginatorModule, MatTableModule, MatButtonModule,CommonModule,MatSortModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.scss'
})
export class ListEventsComponent implements OnInit {
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['select', 'id','organizer_name','event_title','status','created_at','action'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    selection = new SelectionModel<any>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: any;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.customer + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        public globalService:WebsiteServices,
        public dataService:shareService,
        public router:Router
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.globalService.listEvent().subscribe(result=>{
            if(result.status_code==200){
                this.ELEMENT_DATA=result['result']
                this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                this.ngAfterViewInit();
            }
       });
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    editEvent(element:any){
            this.router.navigate(["website/edit-event/",{id: element.id}])
        }
        deleteLeads(id:number){
            Notiflix.Confirm.show(
                'Delete Event',
                'Are You Sure You Want to Delete?',
                'Yes',
                'No',
                () => {
                    this.globalService.deleteEvent({'id':id}).subscribe((res:any)=>{

                            Notiflix.Report.success(
                                'Success',
                                'Deleted Successfully',
                                'Okay',
                                );
                                this.ngOnInit();

                    });
                },
                () => {

                }
                );

        }


}

const ELEMENT_DATA: Myleads[] = [
];

export interface Myleads {
    id: string;
    application_id: any;
    source: string;
    user_email: string;
    status: string;
}
