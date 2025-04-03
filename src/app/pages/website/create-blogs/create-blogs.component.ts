

import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Services } from '../../../services/leads.service';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { StudentServices } from '../../../services/student.service';
import { WebsiteServices } from '../../../services/website.service';
@Component({
    selector: 'app-create-blogs',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule,CommonModule],
    templateUrl: './create-blogs.component.html',
    styleUrl: './create-blogs.component.scss'
  })
export class CreateBlogsComponent {

    // Text Editor
    blogform: any;
    editor: Editor;
    blog_content = '';
    statusOptions = [
        { value: 'draft', viewValue: 'Draft' },
        { value: 'published', viewValue: 'Published' },
        { value: 'archived', viewValue: 'Archived' }
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
    blogId: number;
    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        public service:WebsiteServices,
        public router:Router,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.blogform = this.fb.group({
            blogTopic: [''],
            blogContent: [''],
            coverImage: [null],
            status: [null]
          });
    }

    ngOnInit(): void {

        this.editor = new Editor();

        this.route.params.subscribe(params => {
            this.blogId = +params['id']; // Convert string to number
            let payload={id:this.blogId}
            this.service.getBlogDetail(payload).subscribe((response)=>{
                if(response.status_code==200){
                    const blog = response.result;
                    this.blogform.patchValue({
                        blogTopic: blog.blogtopic,   // ✅ Map blogtopic -> blogTopic
                        blogContent: blog.blogcontent, // ✅ Set HTML content
                        coverImage: null  ,// 🛑 You'll need a separate method to handle image loading
                        status: blog.status,
                      });
                    
                }
              });
          });
  
    }
    onSubmit(): void {
        if( this.blogId){
            const formData = new FormData();
            formData.append('blogtopic', this.blogform.value.blogTopic);
            formData.append('blogcontent', this.blogform.value.blogContent);
            formData.append('status', this.blogform.value.status);
            this.service.updateBlog(this.blogId,formData).subscribe((response)=>{
                if(response.status_code==201){
                    Notiflix.Notify.success('Blog is updated published');
                }
              });
            
        }else{
        if (this.blogform.valid) {
            const formData = new FormData();
            formData.append('blogtopic', this.blogform.value.blogTopic);
            formData.append('blogcontent', this.blogform.value.blogContent);
            
    this.service.createBlog(formData).subscribe((response)=>{
            if(response.status_code==201){
                Notiflix.Notify.success('Blog is created published');
                this.router.navigate(['/website/list-event']);
            }
          });
            // Implement API call to submit form data
          }else{
            Notiflix.Notify.failure('Please enter all the fields');
          }
        }

    }
    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

    // File Uploader
    public multiple: boolean = false;

    // isToggled
    isToggled = false;

    
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}

