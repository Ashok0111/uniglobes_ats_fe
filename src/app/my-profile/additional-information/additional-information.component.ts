import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { StudentServices } from '../../services/student.service';
import { shareService } from '../../services/share.service';

@Component({
    selector: 'app-additional-information',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './additional-information.component.html',
    styleUrl: './additional-information.component.scss'
})
export class AdditionalInformationComponent {
    userObject:any={};

    constructor(
        public service: StudentServices,
        public share:shareService,
    ) {

    }
    ngOnInit(): void {
        this.share.updateProfileOB.subscribe((res)=>{
         this.userObject=res;

        });
     }
}
