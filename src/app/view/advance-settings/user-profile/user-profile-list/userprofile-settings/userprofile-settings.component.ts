import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileFilterComponent } from '../user-profile-filter/user-profile-filter.component';
import { DisableChatComponent } from '../disable-chat/disable-chat.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ReplaceUserComponent } from '../replace-user/replace-user.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EditUserProfileListComponent } from '../edit-user-profile-list/edit-user-profile-list.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PauseUserComponent } from '../pause-user/pause-user.component';
export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,
  'Reporting To':string,
  'User Status':string,
  'Action':string
}

@Component({
  selector: 'app-userprofile-settings',
  templateUrl: './userprofile-settings.component.html',
  styleUrls: ['./userprofile-settings.component.css']
})
export class UserprofileSettingsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'first_name',
    'email',
    'mobile_number',
    'role',
    'designation_id',
    'reporting_to_ids',
    'is_allow_for_app',
    'Action',

  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allUser:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  params:any=null;

  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService,private fb:FormBuilder
    ) {
      
   
      // Create 100 users
  


  }
  ngOnInit(): void {
    this.initForm()
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getUser(this.params); 
        }
      }
    )
    this.emit.getRefreshByFilter.subscribe(
      (resp:any)=>{
       
          this.params=resp
          this.getUser(this.params); 
          
        
      }
    )
  }
  ngAfterViewInit() {

    this.getUser(null); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUser(data:any){
    var role="Admin"
    console.log("ppp");
    if(this.params!=null){
      this.api.getUser(this.pageSize,this.currentPage,role,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
    else{
      this.api.getUser(this.pageSize,this.currentPage,role,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }

  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    console.log(this.pageSize,this.currentPage);
    var role="Admin"
    if(this.params!=null){
      this.api.getUser(this.pageSize,this.currentPage,role,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
    else{
      this.api.getUser(this.pageSize,this.currentPage,role,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
  }
  
  openReplaceUser(userdata:any){
    const dialogRef = this.dialog.open(ReplaceUserComponent, {
      width:'45%',
      data: { userdata: userdata }

    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openResetPassword(userdata:any){
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '45%',
      data: { userdata: userdata }
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openDisableChat(id:any){
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width:'35%',
      data: id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openPauseUser(id:any){
    console.log("kkk",id);
    
    const dialogRef = this.dialog.open(PauseUserComponent, {
      width:'35%',
      data:id 
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openFilter(){
    const dialogRef = this.dialog.open(UserProfileFilterComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openAddUser(){
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      width: '50%',
    })
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  editUserProfile(userdata:any){
    const dialogRef = this.dialog.open(EditUserProfileListComponent, {
      width: '45%',
      data: { userdata: userdata }
    })
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  editForm!:FormGroup
  initForm(){
    this.editForm = this.fb.group({
      deactive:["",Validators.required]
    });}
  onSlideToggleChange(id:any,event:any){
    console.log(id,event.checked);
    this.editForm.patchValue({is_allow_for_app:event.checked})
    this.api.pauseUser(id,this.editForm.value).subscribe(
      (resp:any)=>{
        this.emit.sendRefresh(true)
      },
      (error:any)=>{
        console.log("error");
        
      }
    )
  }
    
  
}
