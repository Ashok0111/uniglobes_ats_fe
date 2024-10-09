import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-list-applications',
  standalone: true,
  imports: [RouterLink, RouterOutlet,ToDoListComponent ],
  templateUrl: './list-applications.component.html',
  styleUrl: './list-applications.component.scss'
})
export class ListApplicationsComponent {

}
