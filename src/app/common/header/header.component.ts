import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { Subscription } from 'rxjs';
import { genericservice } from '../../services/generic.service';
import {UpperCasePipe} from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive,UpperCasePipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    // isSidebarToggled
    isSidebarToggled = false;
    private refreshSubscription: Subscription;
    // isToggled
    isToggled = false;
    userRole: any;
    userIMG: any='images/admin.png';

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public generic :genericservice,
    ) {
        this.userRole=this.generic.get_userrole();
        if(this.userRole.toLowerCase()=='student'){
            this.userIMG='images/graduated.png'
        }else if(this.userRole.toLowerCase()=='agent'){
            this.userIMG='images/admin_user.png'
        }
        
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
    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

}
