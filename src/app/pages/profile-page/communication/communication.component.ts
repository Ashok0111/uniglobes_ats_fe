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
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-communication',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule,FormsModule,CommonModule],
    templateUrl: './communication.component.html',
    styleUrl: './communication.component.scss'
})
export class CommunicationComponent  {

    // isToggled
    isToggled = false;
    myQuery="";
    messages:any = [];
    currentUserId = 33;  // Set the current user's ID
    DocsList: any;
    lead_number: any="";
    private destroy$ = new Subject<void>();
    constructor(
        public themeService: CustomizerSettingsService,
        public service: StudentServices,
        public share_ser: shareService
    ) {
        this.themeService.isToggled$
            .pipe(takeUntil(this.destroy$))
            .subscribe(isToggled => {
                this.isToggled = isToggled;
            });

        this.share_ser.docTypesOB
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: any) => {
                if (result.lead) {
                    this.lead_number = result.lead.application_id;
                    this.fetchConversations(this.lead_number);
                }
            });
    }
    fetchConversations(leadNumber: string) {
        this.service.getMyConversation(leadNumber).subscribe((res: any) => {
            this.messages = res['result'];
            this.myQuery = "";
        });
    }
    sendConvo() {
        if (this.myQuery.trim() !== "") {
            const payload = { 'content': this.myQuery };

            this.service.setMyConversation(this.lead_number, payload).subscribe((res: any) => {
                if (res.status_code === 201) {
                    this.fetchConversations(this.lead_number);
                }
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next(); // Emit value to complete all subscriptions
        this.destroy$.complete();
    }
}
