import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CEditLeadComponent } from '../../../pages/crm-page/c-edit-lead/c-edit-lead.component';

@Component({
    selector: 'app-leads-popup',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatCardModule,CEditLeadComponent],
    templateUrl: './leads-popup.component.html',
    styleUrl: './leads-popup.component.scss'
})

export class LeadsPopupComponent implements OnInit,OnChanges {
    data: { id: number; src: string; };
    // Dialog with header, scrollable content and actions
    constructor() {
        
    }
    ngOnInit(): void {
        this.data={
            id:88,
            src:'popup'
        } 
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.data={
            id:88,
            src:'popup'
        } 
    }

}
