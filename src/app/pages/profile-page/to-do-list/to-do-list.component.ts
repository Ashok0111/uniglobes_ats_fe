import { DatePipe, NgIf } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentServices } from '../../../services/student.service';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-to-do-list:not(pp)',
    standalone: true,
    imports: [
        MatCardModule, MatMenuModule, MatButtonModule, RouterLink, 
        MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, 
        MatTooltipModule, DatePipe, ReactiveFormsModule
    ],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ELEMENT_DATA: any[] = [];
    displayedColumns: string[] = ['application_id', 'user_email', 'agent_name', 'created_date', 'status', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);
    isToggled=false;
    constructor(
        public themeService: CustomizerSettingsService,
        public service: StudentServices,
        public router: Router,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.service.getMyApplications().subscribe((result: any) => {
            if (result['status_code'] === 200) {
                this.ELEMENT_DATA = result.result;
                this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
                
                // Set paginator after data is available
                setTimeout(() => {
                    if (this.paginator) {
                        this.dataSource.paginator = this.paginator;
                    }
                    if (this.sort) {
                        this.dataSource.sort = this.sort;
                    }
                });
            }
        });
    }

    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    editLead(payload: any) {
        this.router.navigateByUrl("my-applications/view-application/" + payload.application_id);
    }

    deleteLeads(id: any) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
