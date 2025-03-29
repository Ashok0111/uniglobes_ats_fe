import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MediaComponent } from './media/media.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { genericservice } from '../../services/generic.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [RouterLink, RouterOutlet, MatCardModule, MatMenuModule, MatButtonModule,CommonModule, RouterLinkActive,MediaComponent,ProfilePageComponent,ToDoListComponent,],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

    // isToggled
    isToggled = false;
    userRole='';
    constructor(
        public themeService: CustomizerSettingsService,
        public dataShare:genericservice
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.userRole=this.dataShare.get_userrole()
    }

}
