import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NewUsersComponent } from './new-users/new-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { LeadConversationComponent } from './lead-conversation/lead-conversation.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';
import { CommonModule } from '@angular/common';
import { CountryStatsComponent } from '../country-stats/country-stats.component';
import { LeadsListComponent } from '../leads-list/leads-list.component';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [MatOptionModule, MatSelectModule,FormsModule, ReactiveFormsModule,MatCardModule, MatMenuModule,CommonModule,
         MatButtonModule, RouterLink, NewUsersComponent, ActiveUsersComponent, LeadConversationComponent, RevenueGrowthComponent,CountryStatsComponent,LeadsListComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit,OnChanges{
    selectedAgent: string | number = 'All'; // Default value
    @Input() leads_stats: any; 
    @Input() AgentList: any; 
    @Output() updated_leads_stats = new EventEmitter<string>();
    agentCount: number;
    facilitatorCount: number;

    updateValue() {
      this.updated_leads_stats.emit(this.leads_stats); // Emit the updated value to the parent
    }
    ngOnInit(): void {
       
    }
    OnchangeAgents(){
        this.service.getDashboard(this.selectedAgent).subscribe((response:any)=>{
            if(response["status_code"]==200){
                this.leads_stats=response['result'];
                this.updated_leads_stats.emit(this.leads_stats);
                
            }
        });
    }
    getAgentCount(filter_type:string) {
        if (Array.isArray(this.AgentList)) {
            if(filter_type=='agent')
            {
                this.agentCount = this.AgentList.filter((agent: any) => {
                    return agent.user_type === filter_type
                }).length;
            }
            if(filter_type=='facilitator')
                {
                    this.facilitatorCount = this.AgentList.filter((agent: any) => {
                        return agent.user_type === filter_type
                    }).length;
                }
        
        } else {
          this.agentCount = 0;
        }
      }
    constructor(
        public service:StudentServices,
        public share_ser:shareService

    ) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        this.getAgentCount('agent');
        this.getAgentCount('facilitator');
    }

}
