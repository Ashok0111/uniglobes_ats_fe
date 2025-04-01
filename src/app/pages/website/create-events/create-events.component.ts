import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
import { WebsiteServices } from '../../../services/website.service';

@Component({
    selector: 'app-create-events',
    standalone: true,
    imports: [
        MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        MatSelectModule, MatDatepickerModule, MatNativeDateModule, FileUploadModule, 
        NgxEditorModule, CommonModule,ReactiveFormsModule
    ],
    templateUrl: './create-events.component.html',
    styleUrl: './create-events.component.scss'
})
export class CreateEventsComponent {
    eventform: FormGroup;
    editor: Editor;
    eventId: number | null = null;

    statusOptions = [
        { value: 'upcoming', viewValue: 'Upcoming' },
        { value: 'ongoing', viewValue: 'Ongoing' },
        { value: 'completed', viewValue: 'Completed' },
        { value: 'cancelled', viewValue: 'Cancelled' }
    ];

    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: WebsiteServices
    ) {
        this.eventform = this.fb.group({
            event_title: ['', Validators.required],
            event_description: ['', Validators.required],
            event_date: ['', Validators.required],
            location: [''],
            cover_image: [null],
            status: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.editor = new Editor();

        this.route.params.subscribe(params => {
            if (params['id']) {
                this.eventId = +params['id'];
                this.loadEventDetails();
            }
        });
    }

    loadEventDetails(): void {
        if (!this.eventId) return;
        
        let payload = { id: this.eventId };
        this.service.getEventDetail(payload).subscribe(response => {
            if (response.status_code === 200) {
                const event = response.result;
                this.eventform.patchValue({
                    event_title: event.event_title,
                    event_description: event.event_description,
                    event_date: event.event_date,
                    location: event.location,
                    status: event.status
                });
            }
        });
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.eventform.patchValue({ cover_image: file });
        }
    }

    onSubmit(): void {
        if (this.eventId) {
          const formData = new FormData();
          formData.append('event_title', this.eventform.value.event_title);
          formData.append('event_description', this.eventform.value.event_description);
          formData.append('location', this.eventform.value.location);
          formData.append('status', this.eventform.value.status);
          const eventDate = new Date(this.eventform.value.event_date);
          if (!isNaN(eventDate.getTime())) {  // Ensure the date is valid
            const formattedDate = eventDate.toISOString();  // Format the date in ISO 8601 format
            formData.append('event_date', formattedDate);
          } else {
            Notiflix.Notify.failure('Invalid event date');
            return;
          }
      
          formData.append('status', this.eventform.value.status);
      
          this.service.updateEvent(this.eventId, formData).subscribe((response) => {
            if (response.status_code == 201) {
              Notiflix.Notify.success('Event is updated and published');
            }
          });
        } else {
          if (this.eventform.valid) {
            const formData = new FormData();
            formData.append('event_title', this.eventform.value.event_title);
            formData.append('event_description', this.eventform.value.event_description);
            formData.append('location', this.eventform.value.location);
            formData.append('status', this.eventform.value.status);
            // Check if the event date is valid before formatting it
            const eventDate = new Date(this.eventform.value.event_date);
            if (!isNaN(eventDate.getTime())) {  // Ensure the date is valid
              const formattedDate = eventDate.toISOString();  // Format the date in ISO 8601 format
              formData.append('event_date', formattedDate);
            } else {
              Notiflix.Notify.failure('Invalid event date');
              return;
            }
      
            this.service.createEvent(formData).subscribe((response) => {
              if (response.status_code == 201) {
                Notiflix.Notify.success('Event is created and published');
              }
            });
          } else {
            Notiflix.Notify.failure('Please enter all the fields');
          }
        }
      }
      

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
