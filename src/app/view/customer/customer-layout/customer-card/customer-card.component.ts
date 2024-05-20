import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {

  allLeadCardsDataSource:any = new MatTableDataSource<any>([]);
  // Define paginator references for all tabs
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  
  leadCards: any;
  displayedLeadCards!: MatTableDataSource<any>;
  query!: string;
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  totalNumberOfRecords:any;
  statusArray:any = []
  sorting: boolean = false;
  sortingType: any;
  leadAllIds: any = [];
  searchTerm:any;
  user_id: any;
  
  leadFilter: boolean = false;
  user_role: any;
  permissions:any;
  bulk_Upload: any;
  counsellors_ids:any;
 
  
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService,
    private emit:EmitService,
    private dialog:MatDialog) {
      this.user_id = localStorage.getItem('user_id');
      this.user_role = localStorage.getItem('user_role')?.toUpperCase();
      // this.getLeadIds();

      this.counsellors_ids=localStorage.getItem('counsellor_ids')



      this.permissions=localStorage.getItem('decodedToken')
      //console.log(this.permissions,"this.permissions");
      
     // console.log(JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Allocations'),"this.permissions");
      
      let accesspermissions=JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Allocations')
      accesspermissions.children_status.forEach((element:any) => {
        if(element.menu_name=='Bulk Upload'){
          this.bulk_Upload=element.access_status;
        //  console.log(this.bulk_Upload,"this.bulk_Upload");
          
        }
    })}
  
   
  // openBottomSheet(): void {
  //   const config: MatBottomSheetConfig = {
  //     panelClass: 'lead-bottom-sheet',
  //     disableClose: true
  //   };
  //   this._bottomSheet.open(AddNewLeadComponent,config);
   
  // }
  onChangeSorting(event:any){
    this.sorting = true
     this.sortingType = event.target.innerText

     this.query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `?counsellor_id=${this.user_id}&filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`?filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=customers`:`?filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
    //  this.query = (this.user_role === 'counsellor')
    //   ? `?counsellor_id=${this.user_id}&filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=customers`
    //   : `?filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=customers&user_id=${this.user_id}`;
      
      if(this.leadFilter){
        this.query  = ""
        this._addLeadEmitter.leadFilter.subscribe((res:any) => {
          if (res) {


            this.query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${res}&counsellor_id=${this.user_id}&filter_by=${this.sortingType}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`${res}&filter_by=${this.sortingType}&user_type=customers`:`${res}&filter_by=${this.sortingType}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
            // this.query = (this.user_role === 'counsellor')
            // ? `${res}&counsellor_id=${this.user_id}&filter_by=${this.sortingType}&user_type=customers`
            // : `${res}&filter_by=${this.sortingType}&user_type=customers&user_id=${this.user_id}`;
            
          }
        });

      }
      this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
        if (res.results) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      });
  }
  // uploadLeads(): void{
    
  //   const dialogRef = this.dialog.open(LeadUploadComponent, {
  //     width:'37%',
  //     height:'64%',
  //     // data:{data:this.selectedLeads,name:'BULK'},
  //   });
  //   dialogRef.disableClose=true


  
  //   dialogRef.afterClosed().subscribe((result:any) => {});
  // }
  ngOnInit(): void {
  
      // this.getLeadIds()
      this.getStatus()
    this._addLeadEmitter.triggerGet$.subscribe(() => {
      // this.getLeadIds()
      this.getLeadData('tabLabel')
      this._addLeadEmitter.goBack.next(true)
    });
    
    this._addLeadEmitter.leadFilter.subscribe((res:any) => {
      if (res) {
      //  console.log(res, "RES");
        this.leadFilter = true;
        this.filterLeads(res);
      }else{
        this.getLeadData('tabLabel')
      }
    });
   
  }
  
  
 
  
  applySearch(event:any){
    this.searchTerm = event
    if(event !==''){
    let query: string;

    query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}&key=${event}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`${environment.lead_list}?page=1&page_size=${this.pageSize}&key=${event}&user_type=customers`:`${environment.lead_list}?page=1&page_size=${this.pageSize}&key=${event}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
    // query = (this.user_role === 'counsellor')
    // ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}&key=${event}&user_type=customers`
    // : `${environment.lead_list}?page=1&page_size=${this.pageSize}&key=${event}&user_type=customers&user_id=${this.user_id}`;
    
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      }
      else{
        if(this.leadFilter){
          this._addLeadEmitter.leadFilter.subscribe((res:any) => {
            if (res) {
              query = ''

              query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${res}&counsellor_id=${this.user_id}&key=${event}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`${res}&key=${event}&user_type=customers`:`${res}&key=${event}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
              // query = (this.user_role === 'counsellor')
              // ? `${res}&counsellor_id=${this.user_id}&key=${event}&user_type=customers`
              // : `${res}&key=${event}&user_type=customers&user_id=${this.user_id}`;
              
            }
          });
        }
      }
  
    this._baseService.getData(`${query}`).subscribe((res: any) => {
      if (res.results) {
        this.leadCards = []
        this.allLeadCardsDataSource = []
        this.totalNumberOfRecords = ''
        this.leadCards = res.results.data;
        this.leadAllIds = res.results.lead_ids
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.totalNumberOfRecords = res.total_no_of_record
      }
    }, (error: any) => {
       this.api.showError(this.api.toTitleCase(error.error.message));
    });
  }else{
    let query: string;
    // query = (this.user_role === 'counsellor')
    // ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=${this.currentPage}&page_size=${this.pageSize}&user_type=customers`
    // : `${environment.lead_list}?page=${this.currentPage}&page_size=${this.pageSize}&user_type=customers&user_id=${this.user_id}`;
    query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=${this.currentPage}&page_size=${this.pageSize}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`${environment.lead_list}?page=${this.currentPage}&page_size=${this.pageSize}&user_type=customers`:`${environment.lead_list}?page=${this.currentPage}&page_size=${this.pageSize}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`


      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      }
      else{
        if(this.leadFilter){
          this._addLeadEmitter.leadFilter.subscribe((res:any) => {
            if (res) {
              query = ''
              // query = (this.user_role === 'counsellor')
              // ? `${res}&counsellor_id=${this.user_id}&key=${event}&user_type=customers`
              // : `${res}&key=${event}&user_type=customers&user_id=${this.user_id}`;

              query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${res}&counsellor_id=${this.user_id}&key=${event}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`${res}&key=${event}&user_type=customers`:`${res}&key=${event}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
              
            }
          });
        }
      }
    this._baseService.getData(`${query}`).subscribe((res: any) => {
      if (res.results) {
        this.leadCards = []
        this.allLeadCardsDataSource = []
        this.totalNumberOfRecords = ''
        this.leadCards = res.results.data;
        this.leadAllIds = res.results.lead_ids
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.totalNumberOfRecords = res.total_no_of_record
      }
    }, (error: any) => {
       this.api.showError(this.api.toTitleCase(error.error.message));
    });
  }
  }
  getStatus(){
    this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
     if(res.results){
       this.statusArray = res.results;
     }
    },(error:any)=>{
      this.api.showError(this.api.toTitleCase(error.error.message))
    })
   }
   filterLeads(apiUrl:any){
    this._baseService.getData(`${apiUrl}`).subscribe((res:any) => {
     
      // if(res.results.length === 0){
      //   this._addLeadEmitter.leadFilter.next('')
      //   this._addLeadEmitter.selectedFilter.next('')
      // }
      // else{
        if(res){
        this.leadFilter = true
        this.leadCards = res.results.data;
        this.leadAllIds = res.results.lead_ids
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        // this.allLeadCardsDataSource.paginator = this.allPaginator;
        this.totalNumberOfRecords = res.total_no_of_record
      }
    //}
     
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }));
 
   }
   getLeadData(tabLabel: any,filter?:any) {
    this.leadCards = [];
    this.totalNumberOfRecords = [];
    this.allLeadCardsDataSource = [];

    let apiUrl=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}&user_type=customers`:this.user_role === 'SUPERADMIN' || this.user_role === 'SUPER ADMIN' ?`${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=customers`:`${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
    // let apiUrl = (this.user_role === 'counsellor')
    //   ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}&user_type=customers`
    //   : `${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=customers&user_id=${this.user_id}`;
  
    if (tabLabel !== 'tabLabel' && tabLabel.tab.textLabel !== 'All') {
      let tabId = this.statusArray.find((f:any)=>f.name === tabLabel.tab.textLabel)
      apiUrl += `&status=${tabId.id}`;
    }
   
    this._baseService.getData(apiUrl).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
 
  onPageChange(event: any, dataSource: MatTableDataSource<any>, type?: any) {
    if (!event) {
      return;
    }
  
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
   

    let query: string;
    // query = (this.user_role === 'counsellor')
    // ? `?counsellor_id=${this.user_id}&page=${this.currentPage}&page_size=${event.pageSize}&user_type=customers`
    // : `?page=${this.currentPage}&page_size=${event.pageSize}&user_type=customers&user_id=${this.user_id}`;
    query=this.user_role == 'COUNSELLOR' || this.user_role == 'COUNSELOR' ? `?counsellor_id=${this.user_id}&page=${this.currentPage}&page_size=${event.pageSize}&user_type=customers`:this.user_role == 'SUPERADMIN' || this.user_role == 'SUPER ADMIN' ?`?page=${this.currentPage}&page_size=${event.pageSize}&user_type=customers`:`?page=${this.currentPage}&page_size=${event.pageSize}&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellors_ids}`
    
    if (type === 'All') {
      query = query;
  
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      } else if (this.searchTerm) {
        query += `&key=${this.searchTerm}`;
      }
     
        else if(this.leadFilter){
          this._addLeadEmitter.filterWithPageSize.subscribe((res:any) => {
            if (res) {
             
              query += res
            
            }
          });
      }
    } 
    else {
      query = `?status=${type}&page=${this.currentPage}&page_size=${event.pageSize}`;
  
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      }else{
        if(this.leadFilter){
          this._addLeadEmitter.filterWithPageSize.subscribe((res:any) => {
            if (res) {
              query += res
              
            }
          });
        }
      }
    }
    this._baseService.getData(`${environment.lead_list}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(error.error.error.message);
      }
    );
    
  }
  
  onChange(event:any){
    //console.log(event,'EVENT')
  }
   delete(event:any){
   if(event){
    this.getLeadData('tabLabel')
   }
   
   }
  //  getLeadIds(){
  //   if(this.user_role !== 'counsellor'){
  //     this._baseService.getData(environment.lead_ids).subscribe((res:any)=>{
  //       if(res){
  //         this.leadAllIds = res.lead_ids
  //       }
  //     },((error:any)=>{
  //       this.api.showError(error.error.error.message)
  //     }))
  //   }else{
  //     this._baseService.getData(`${environment.lead_ids}?counsellor_id=${this.user_id}`).subscribe((res:any)=>{
  //       if(res){
  //         this.leadAllIds = res.lead_ids
  //       }
  //     },((error:any)=>{
  //       this.api.showError(error.error.error.message)
  //     }))
  //   }
   
  //   return this.leadAllIds
  // }
  reLoad(event:any){
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.leadFilterIcon.next('false')
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.selectedFilter.next('')
    this.getStatus()
    this.getLeadData('tabLabel')
    // this.getLeadIds()
    this._addLeadEmitter.leadRefresh.next(true)
  }

}
