import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileListRoutingModule } from './user-profile-list-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReplaceUserComponent } from './replace-user/replace-user.component';
import { DisableChatComponent } from './disable-chat/disable-chat.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { UserprofileSettingsComponent } from './userprofile-settings/userprofile-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { UserProfileFilterComponent } from './user-profile-filter/user-profile-filter.component';
import { EditUserProfileListComponent } from './edit-user-profile-list/edit-user-profile-list.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    ReplaceUserComponent,
    DisableChatComponent,
    AddNewUserComponent,
    UserProfileFilterComponent,
    UserprofileSettingsComponent,
    EditUserProfileListComponent,
  ],
  imports: [
    CommonModule,
    UserProfileListRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class UserProfileListModule { }