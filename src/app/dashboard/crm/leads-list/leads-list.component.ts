import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';
import { shareService } from '../../../services/share.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LeadsPopupComponent } from '../leads-popup/leads-popup.component';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [RouterLink, MatCardModule,MatDialogModule,  MatTooltipModule, MatCheckboxModule, NgIf, MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.scss'
})
export class LeadsListComponent implements OnInit,OnChanges  {
    displayedColumns: string[] = ['select', 'agent_name', 'application_id','source','preferred_country','status',];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);
    isToggled=false
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() leads_generated: any;
    ELEMENT_DATA: any;

    ngAfterViewInit() {
        if(this.dataSource !=null){
            this.dataSource.paginator = this.paginator;
        }
        
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection?.selected?.length;
        const numRows = this.dataSource?.data?.length;
        return numSelected === numRows;
    }

    ngOnInit(): void {
       
        this.updateDataSource();
    };
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
    constructor(
        public themeService: CustomizerSettingsService,
        public globalService:Services,
        public dataService:shareService,
        public router:Router,
        public dialog: MatDialog
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    openDialog() {
        const dialogRef = this.dialog.open(LeadsPopupComponent, {
            width: '80vw',  // Adjust the width (e.g., '600px', '80vw', '90%')
            height: '80vh', // Adjust the height (e.g., '400px', '80vh', '90%')
            maxWidth: '90vw', // Prevents excessive scaling
            panelClass: 'custom-dialog' // Optional custom styling
        });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['leads_generated'] && changes['leads_generated'].currentValue) {
            this.updateDataSource();
        }
    }
    openLeads(){
        this.openDialog()
    }
    updateDataSource(): void {
        this.dataSource = new MatTableDataSource<any>(this.leads_generated);
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }
}
