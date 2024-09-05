import { Component, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { genericservice } from '../../services/generic.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [NgScrollbarModule, MatExpansionModule, RouterLinkActive, RouterModule, RouterLink, NgClass,CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    userRole="None";
    pathMap:any={
        "facilitator":"leads/dashboard",
        "agent":"leads/leads",
        "student":"my-profile"

    }
    private refreshSubscription: Subscription;
    role: any;
    loaded: boolean=false;
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public generic :genericservice,
        public routes:Router
    ) {

        this.userRole=this.generic.get_userrole()
        this.refreshComponent();
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.refreshSubscription = this.generic.refresh$.subscribe(() => {
            this.userRole=this.generic.get_userrole();
          });

      }
    refreshComponent() {
        let path=localStorage.getItem('default_path');
        if(path){
            this.routes.navigateByUrl(path)
        }


    }
    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

}
