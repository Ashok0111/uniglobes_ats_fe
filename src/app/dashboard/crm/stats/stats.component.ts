import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [MatOptionModule, MatSelectModule,FormsModule, ReactiveFormsModule,MatCardModule, MatMenuModule,CommonModule,
         MatButtonModule, RouterLink, NewUsersComponent, ActiveUsersComponent, LeadConversationComponent, RevenueGrowthComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit{
    AgentList:any=[];
    ngOnInit(): void {
        this.service.getAgentList().subscribe((response:any)=>{
            if(response["status_code"]==200){
               this.AgentList=response.result
            }
        });
    }

    constructor(
        public service:StudentServices,
        public share_ser:shareService

    ) {
        

    }

}
