import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewLeadsComponent } from './new-leads/new-leads.component';
import { ActiveLeadsComponent } from './active-leads/active-leads.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';
import { MatCardModule } from '@angular/material/card';
import { LeadConversionComponent } from './lead-conversion/lead-conversion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';

@Component({
    selector: 'app-c-leads',
    standalone: true,
    imports: [RouterLink, MatCardModule, NewLeadsComponent, ActiveLeadsComponent, LeadConversionComponent, RevenueGrowthComponent, MatTooltipModule, MatCheckboxModule, NgIf, MatPaginatorModule, MatTableModule, MatButtonModule],
    templateUrl: './c-leads.component.html',
    styleUrl: './c-leads.component.scss'
})
export class CLeadsComponent implements OnInit {

    displayedColumns: string[] = ['select', 'id', 'lead_id','source','user_email','status'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    selection = new SelectionModel<any>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: any;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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
        public globalSerice:Services
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.globalSerice.getMyLeads().subscribe(result=>{
            if(result.status_code==200){
                this.ELEMENT_DATA=result['result']
                this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                this.ngAfterViewInit();
            }
            console.log(result,"res")
       });
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}

const ELEMENT_DATA: Myleads[] = [
];

export interface Myleads {
    id: string;
    lead_id: any;
    source: string;
    user_email: string;
    status: string;
}
