import { Component } from '@angular/core';
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

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [MatOptionModule, MatSelectModule,FormsModule, ReactiveFormsModule,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NewUsersComponent, ActiveUsersComponent, LeadConversationComponent, RevenueGrowthComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent {}
