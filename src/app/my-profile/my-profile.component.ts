import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TotalProjectsComponent } from './total-projects/total-projects.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { ProfileInformationComponent } from '../pages/profile-page/profile-information/profile-information.component';
import { OverviewComponent } from './overview/overview.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { EducationalDetailComponent } from '../pages/profile-page/education-detail/education-detail.component';

@Component({
    selector: 'app-my-profile',
    standalone: true,
    imports: [RouterLink, RouterOutlet,WelcomeComponent, TotalProjectsComponent, TotalOrdersComponent, TotalRevenueComponent, ProfileIntroComponent, OverviewComponent, RecentActivityComponent],
    templateUrl: './my-profile.component.html',
    styleUrl: './my-profile.component.scss'
})

export class MyProfileComponent  {


}
