import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeComponent } from '../../../my-profile/welcome/welcome.component';
import { TotalProjectsComponent } from '../../../my-profile/total-projects/total-projects.component';
import { TotalRevenueComponent } from '../../../my-profile/total-revenue/total-revenue.component';
import { TotalOrdersComponent } from '../../../my-profile/total-orders/total-orders.component';
import { ProfileIntroComponent } from '../../../my-profile/profile-intro/profile-intro.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';
import { OverviewComponent } from '../../../my-profile/overview/overview.component';
import { RecentActivityComponent } from '../../../my-profile/recent-activity/recent-activity.component';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { AdditionalInformationComponent } from '../additional-information/additional-information.component';

@Component({
    selector: 'app-my-profile',
    standalone: true,
    imports: [RouterLink, WelcomeComponent, TotalProjectsComponent, TotalOrdersComponent, TotalRevenueComponent, ProfileIntroComponent, ProfileInformationComponent, AdditionalInformationComponent, OverviewComponent, ToDoListComponent, RecentActivityComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
    UserData:any;
    constructor(
        public service: StudentServices,
        public share:shareService,
    ) {

    }
    ngOnInit(): void {
       this.service.getMyProfile().subscribe((res)=>{
        if(res['status_code']==200){
            this.UserData=res["result"];
            this.share.updateProfileData(res["result"]);
        }

       });
    }


}
