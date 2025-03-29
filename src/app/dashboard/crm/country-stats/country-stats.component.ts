import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-country-stats',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink,CommonModule],
    templateUrl: './country-stats.component.html',
    styleUrl: './country-stats.component.scss'
})
export class CountryStatsComponent {

    // isToggled
    isToggled = false;
    @Input() leads_by_country:  Record<string, any> = {}; ;
    get countryList() {
        if(this.leads_by_country){
            return Object.values(this.leads_by_country);
        }else{
            return []
        }
         // ✅ Converts object to an array
      }
    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

}
