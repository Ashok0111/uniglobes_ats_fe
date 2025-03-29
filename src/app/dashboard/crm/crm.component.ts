import { Component, OnInit } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { MostLeadsComponent } from './most-leads/most-leads.component';
import { CountryStatsComponent } from './country-stats/country-stats.component';
import { EarningReportsComponent } from './earning-reports/earning-reports.component';
import { TasksStatsComponent } from './tasks-stats/tasks-stats.component';
import { TopCustomersComponent } from './top-customers/top-customers.component';
import { RecentLeadsComponent } from './recent-leads/recent-leads.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ClientPaymentStatusComponent } from './client-payment-status/client-payment-status.component';
import { TotalLeadsComponent } from './total-leads/total-leads.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { StudentServices } from '../../services/student.service';
import { shareService } from '../../services/share.service';
import { LeadsListComponent } from './leads-list/leads-list.component';

@Component({
    selector: 'app-crm',
    standalone: true,
    imports: [MatCardModule, StatsComponent,MatOptionModule, MatSelectModule,MostLeadsComponent, CountryStatsComponent, EarningReportsComponent, TasksStatsComponent, TopCustomersComponent, RecentLeadsComponent, ToDoListComponent, ClientPaymentStatusComponent, TotalLeadsComponent, FormsModule, ReactiveFormsModule,RouterLink,LeadsListComponent],
    templateUrl: './crm.component.html',
    styleUrl: './crm.component.scss'
})
export class CrmComponent implements OnInit{
    AgentList: any;
    leads_stats: any;
    ngOnInit(): void {
        this.service.getAgentList().subscribe((response:any)=>{
            if(response["status_code"]==200){
               this.AgentList=response.result
            }
        });

        this.service.getDashboard('').subscribe((response:any)=>{
            if(response["status_code"]==200){
               this.leads_stats=response['result'];
            }
        });
    }
    onValueChanged(newValue: any) {
        this.leads_stats=newValue
      }
    constructor(
        public themeService: CustomizerSettingsService,
        public route:Router,
        public snap:ActivatedRoute,
        public service:StudentServices,
        public share_ser:shareService

    ) {
        

    }

}
