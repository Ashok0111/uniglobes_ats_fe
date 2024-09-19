import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentServices } from '../../../services/student.service';
import { shareService } from '../../../services/share.service';

@Component({
    selector: 'app-communication',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule,FormsModule,CommonModule],
    templateUrl: './communication.component.html',
    styleUrl: './communication.component.scss'
})
export class CommunicationComponent  implements OnInit {

    // isToggled
    isToggled = false;
    myQuery="";
    messages:any = [];
    currentUserId = 33;  // Set the current user's ID
    DocsList: any;
    lead_number: any="";
    constructor(
        public themeService: CustomizerSettingsService,
        public service:StudentServices,
        public share_ser:shareService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.share_ser.docTypesOB.subscribe((result:any)=>{
            if(result.lead){
                this.lead_number=result.lead.lead_id;
                this.service.getMyConversation(this.lead_number).subscribe((res:any)=>{
                    this.messages=res['result']
                });
            }

        });
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    sendConvo(){
        if(this.myQuery.trim()!=""){
            let payload={'content':this.myQuery}
            this.service.setMyConversation(this.lead_number,payload).subscribe((res:any)=>{
                if(res.status_code==201){
                    this.service.getMyConversation(this.lead_number).subscribe((res:any)=>{
                        this.messages=res['result'];
                        this.myQuery="";
                    });
                }
            });
        }

    }

}
