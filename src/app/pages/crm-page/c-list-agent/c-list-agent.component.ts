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

@Component({
  selector: 'app-c-list-agent',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatTooltipModule, MatCheckboxModule, NgIf, MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './c-list-agent.component.html',
  styleUrl: './c-list-agent.component.scss'
})
export class CListAgentComponent implements OnInit {

    displayedColumns: string[] = ['select', 'id','first_name','last_name', 'user_email','action'];
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
        public globalService:Services,
        public dataService:shareService,
        public router:Router
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.globalService.getMyAgents().subscribe(result=>{
            if(result.status_code==200){
                this.ELEMENT_DATA=result['result']
                this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                this.dataService.updateLeadsAll(result['result'].length);
                this.ngAfterViewInit();
            }
       });
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
     convertDate(dateStr:any) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Split the input date string by "/"
        const parts = dateStr.split("/");

        // Extract day, month, and year from the input
        const day = parts[0];
        const month = monthNames[parseInt(parts[1]) - 1]; // Convert month to month name
        const year = parts[2];

        // Return the converted date as an object
        return {
            day: day,
            month: month,
            year: year,
            toString: function() {
                return `${this.day} ${this.month} ${this.year}`;
            }
        };
    }
        editLead(element:any){
            this.router.navigate(["agent/edit-agent",{id: element.id}])
        }
     convertforChart(input:any,filterType:any) {
        // Create an object to group counts by date for type "New"
        const groupedData:any = {};

        // Iterate over each item in the input array
        input.forEach((item:any) => {
            const { count, week_start_formatted, type } = item;

            // Only consider items with type "New"
            if (type === filterType) {
                // If the date is not in the groupedData, initialize it
                if (!groupedData[week_start_formatted]) {
                    groupedData[week_start_formatted] = 0;
                }

                // Sum the counts for the same date
                groupedData[week_start_formatted] += count;
            }
        });

        // Extract the dates and leads into separate arrays
        const dates_o: string[] = [];
        const leads_o: number[] = [];

        // Iterate over the groupedData to populate dates and leads arrays
        for (const date in groupedData) {
            dates_o.push(this.convertDate(date).toString());
            leads_o.push(groupedData[date]);
        }
        // Sort the dates and leads arrays by date
        const sortedIndices = dates_o
        .map((date, index) => ({ date, index }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((item) => item.index);

        let dates = sortedIndices.map((index) => dates_o[index]);
        const leads = sortedIndices.map((index) => leads_o[index]);
        // Return the result in the desired format
        return { leads, dates };
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
