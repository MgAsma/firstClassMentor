import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { LoginListComponent } from './login-list/login-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericDeleteComponent } from './generic-delete/generic-delete.component';
import { NodataComponent } from './nodata/nodata.component';


@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationComponent,
    QuickAddComponent,
    LoginListComponent,
    GenericDeleteComponent,
    NodataComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    CKEditorModule ,
    NgbTimepickerModule,
  ],
  exports:[
    SearchbarComponent,
    NotificationComponent,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    LoginListComponent,
    CKEditorModule ,
    NgbTimepickerModule,
    NodataComponent 
  ]
})
export class SharedModule { }
