import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MediaComponent } from './media/media.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [RouterLink, RouterOutlet, MatCardModule, MatMenuModule, MatButtonModule, RouterLinkActive,MediaComponent,ProfilePageComponent,ToDoListComponent,],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

}
