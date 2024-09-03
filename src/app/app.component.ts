import { Component } from '@angular/core';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component';
import { CustomizerSettingsService } from './customizer-settings/customizer-settings.service';
import { ToggleService } from './common/sidebar/toggle.service';
import { Location } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, FooterComponent, CustomizerSettingsComponent, NgClass,NgxSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})


export class AppComponent {

    // Title
    title = '';

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        private viewportScroller: ViewportScroller,
        public location: Location,
        public themeService: CustomizerSettingsService,
        private spinner: NgxSpinnerService

    ) {

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Scroll to the top after each navigation end
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        if(!localStorage.getItem('token')){
            let path=location.path()
            if(!this.isValidActivationUrl(path)){
                this.router.navigateByUrl('authentication');
            }

        }
    }
    isValidActivationUrl(url:any) {
        // Define the regex pattern to match the format 'url/activate/{uid}/{token}/'
        const regex = /^\/authentication\/reset-password\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\/?$/;
        return regex.test(url);
    }
    ngOnInit() {
        /** spinner starts on init */

      }

}

interface NgxSpinnerConfig {
    type?: string;
  }
