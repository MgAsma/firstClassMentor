import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { DataService } from 'src/app/service/data.service';
import { MyFollowupCardContentComponent } from '../my-followup-layout/my-followup-card-content/my-followup-card-content.component';
import { FilterFollowUp } from 'src/app/filter/filter';

@Component({
  selector: 'app-my-followup-filter',
  templateUrl: './my-followup-filter.component.html',
  styleUrls: ['./my-followup-filter.component.css']
})
export class MyFollowupFilterComponent implements OnInit {

  filterFollowUp = new FilterFollowUp();

  filterLead!:FormGroup
  @Output()filterApplied = new EventEmitter()
  counselorList:any = [];
  channelsList:any = [];
  sourceList:any = [];
  departmentList:any = [];
  courseList:any = [];
  status:any = [];
  cityList:any = [];
  campaignList: any;
  queryItems: any;
  streamsList:any=[];
  @Output() filter:any = new EventEmitter();
  // @Output() filterCount:any = new EventEmitter();
    counselled_by: any;
  role:any;
    constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private fb: FormBuilder,
      private api:ApiService,
      private _baseService:BaseServiceService,
      private _addLeadEmitter:AddLeadEmitterService,
      private dataService:DataService,
      private bottomsheet: MatBottomSheet
      ) {
        this.role=localStorage.getItem('user_role');
        // this.sendData();
        
      }

    updateFilterByStatusURL:any = null;
  
    ngOnInit(): void {

      this.updateFilterByStatusURL = this.dataService.getFollowupfilterURL()

      
      this.dropdownvalues()
      this.initForm() 
    }
    get f() {
      return this.filterLead.controls;
    }
    dropdownvalues(){
      this.getChannel()
      this.getSource()
      this.getCity()
      this.getCounselor()
      this.getChannel()
      this.getCourse()
      this.getCounselledBy()
      this.getStream();
      this.getAllFollowupStatuses()
    }
    getChannel(){
      this.api.getAllChannel().subscribe((resp:any)=>{
        if(resp.results){
          this.channelsList= resp.results;
        }
        else{
          this.api.showError('ERROR')
        }  
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      }
  
      )
    }
    getCourse(){
      this.api.getAllCourse().subscribe((res:any)=>{
        if(res){
         this.courseList = res
         console.log(res,"course response")
        }
        else{
         this.api.showError('ERROR')
        }
       },(error:any)=>{
          this.api.showError(this.api.toTitleCase(error.error.message))
         
       })
    }

    getStream(){
      this.api.getStreams().subscribe((res:any)=>{
        console.log(res,"streams response");
        this.streamsList=res;
      },((error:any)=>{
        this.api.showError(this.api.toTitleCase(error.error))
      }))
    }
    getSource(){
      this.api.getAllSource().subscribe((res:any)=>{
       if(res.results){
        this.sourceList = res.results
       }
       else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
    }
    getCity(){
      this.api.getAllCity().subscribe((res:any)=>{
        if(res.results){
          this.cityList = res.results;
        }
        else{
          this.api.showError('ERROR')
         }
        },(error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
          
        })
    }
    
    getCounselledBy(){
      this._baseService.getData(`${environment._user}/?role_name=Admin`).subscribe((res:any)=>{
        if(res){
        this.counselled_by = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    } 
   
    getCounselor(){
      this._baseService.getData(`${environment._user}/?role_name=counsellor`).subscribe((res:any)=>{
        if(res){
        this.counselorList = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }


    AllFollowupStatuses:any=[]
  getAllFollowupStatuses(){
    this.api.allFollowUpStatuses().subscribe((res:any)=>{
      console.log(res,"all folloups")
      this.AllFollowupStatuses=res
    })
  }
    clearSelectField(fieldName: string) {
      this.filterLead.get(fieldName)?.reset();
    }
    page = 1;
    pageSize = 5;
  
    
    initForm(){
      this.filterLead = this.fb.group({
        counsellor_id:[''],
        // campaign_id:[''],
        // channel_id:[''],
        source_id:[''],
        // department_id:[''],
        stream_id:[''],
        course_id:[''],
        city_id:[''],
        // follow_up_status:[''],
        counselled_by:['']
        // year_of_passing:['']
      })
    }
    closePopup(){
      this._bottomSheetRef.dismiss()
    }


  filterCount:any=[]
  filtered:boolean=false;
      onSubmit() {
        // console.log("updated url==>", this.updateFilterByStatusURL);

        console.log(this.filterLead.value);

        const nonEmptyKeys = Object.keys(this.filterLead.value).filter(key => this.filterLead.value[key] !== '');

        // console.log("nonEmptyKeys==>",nonEmptyKeys);
        

        // for(const key in nonEmptyKeys){
        //   const value = this.filterLead.value[key];
        //   console.log(`Key: ${key}, Value: ${value}`);
        // }
        nonEmptyKeys.forEach(key => {
          console.log(nonEmptyKeys.length,"nonemptykeys.length");
          this.filterCount=nonEmptyKeys.length;
          const value = this.filterLead.value[key];
            console.log(`Key: ${key}, Value: ${value}`);
            console.log(value.length,"no of filters applied")
            
            this.updateFilterByStatusURL += `&${key}=${value}`

            // let data = this.filterFollowUp.updateUrlParameter(this.updateFilterByStatusURL, key, value)

            // console.log("data==>", data);
            
        });

        
        this.dataService.setFilteredFollowUpURL(this.updateFilterByStatusURL)
        this.filtered=true;
        
        console.log("==============>>",this.updateFilterByStatusURL);

        this.bottomsheet.dismiss();

        // this.api.FollowUpFilterApi(this.updateFilterByStatusURL).subscribe((res:any)=>{
        //   console.log(res,"filtered followup  results")
        //   this.dataService.setFormDataFollowupFilter(res.results.data)
        // })




















        
        
      //console.log(this.filterLead.value,"filter followup values")
      // if (this.filterLead.invalid) {
      //   this.filterLead.markAllAsTouched()
      //   this.api.showError('Invalid Form')
      // } else{
      //  const formValues = this.filterLead.value;
      // //  this.api.filterFollowupsForAdmin(formValues,this.page,this.pageSize).subscribe((res:any)=>{
      // //   //console.log(res,"filtered records")
      // //  })
     
      //  // Create an array of query parameters with non-empty values
      //  const queryParams = [];
      //  for (const key in formValues) {
      //    const value = formValues[key];
      //    console.log(value.length,"form valuesssssssss length")
      //    if (value !== '' && value !== undefined && value !== null) {
      //      if (Array.isArray(value)) {
      //        // Handle multi-select fields
      //        if (value.length > 0) {
      //          // Convert array of objects to a comma-separated string of IDs
      //          const ids = value.map((item) => item.id).join(',');
      //          queryParams.push(`${key}=${ids}`);
      //          console.log(queryParams,"queryParams")
      //        }
      //      } else {
      //        queryParams.push(`${key}=${value}`);
      //        this.filterCount=queryParams.length;
      //        console.log(queryParams.length,"queryParams")
      //        this.sendData();
        
      //      }
      //    }
      //  }
     
   
      //  // Construct the API request URL with query parameters
      //  const apiUrl = `${environment.lead_follow_up}?page=1&page_size=10&${queryParams.join('&')}`;
     
      // this._addLeadEmitter.leadFilter.next(apiUrl)
      //  this._addLeadEmitter.triggerFilter()
      //  this._addLeadEmitter.followUpFilterIcon.next('true')
      //  // Make the API request with the constructed URL
      // this.closePopup();

      
      this.dataService.sendData(true)
      this.dataService.setSharedData(this.filterCount,this.filtered);
      this.dataService.dataUpdated.emit(this.filtered)
      // this.dataService.dataUpdated.emit(this.filtered)
    
      // }
  
     
    }
    sendData() {
     
      
    }
    



   
}
