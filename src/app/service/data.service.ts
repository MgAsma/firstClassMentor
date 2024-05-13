import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { log } from 'console';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  api_url: any = environment.live_url;
  public isAllChecked: boolean = false;

  filteredData = {
    counsellor_id: '',
    // campaign_id:[''],
    // channel_id:[''],
    source_id: '',
    // department_id:[''],
    stream_id: '',
    course_id: '',
    city_id: '',
    // follow_up_status:[''],
    counselled_by: '',
  };

  private filteredValues = new BehaviorSubject<any>(this.filteredData);
  public filteredValuesData$ = this.filteredValues.asObservable();


  

  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  constructor() {}
  private sharedData: any;

  url: any = `${this.api_url}/api/follow-up/?page=1&page_size=5`;
  setFilteredFollowUpURL(url: string) {
    this.url = url;
  }

  getFollowupfilterURL() {
    return this.url;
  }

  setSharedData(...args: any[]): void {
    this.sharedData = args;
  }

  getSharedData(): any {
    return this.sharedData;
  }
  dataUpdated = new EventEmitter<any>();

  sendData(data: any) {
    this.dataSubject.next(data);
  }
  resetData(): void {
    this.dataSubject.next(null);
  }

  renderingFilterData: any = [];
  setFormDataFollowupFilter(data: any) {
    this.renderingFilterData = data;
  }

  getFormDataFollowupFilter() {
    return this.renderingFilterData;
  }

  patchedFilteredValues: any = [];


  getfiletredFormValues() {
    return this.filteredData;
  }

  setFilteredFormValues(data: any) {
    //console.log(data,"data in set filterde values");
    
    this.filteredData.counsellor_id = data.counsellor_id;
    //console.log(this.filteredData.counsellor_id,"this.filteredData.counsellor_id ");
    this.filteredData.counselled_by = data.counselled_by;
    this.filteredData.source_id = data.source_id;
    this.filteredData.stream_id = data.stream_id;
    this.filteredData.stream_id=data.stream_id
    this.filteredData.city_id=data.city_id
  }
  resetFilterForm(){
    this.filteredData = {
      counsellor_id: '',
      // campaign_id:[''],
      // channel_id:[''],
      source_id: '',
      // department_id:[''],
      stream_id: '',
      course_id: '',
      city_id: '',
      // follow_up_status:[''],
      counselled_by: '',
    };
  }

 
  usersFilterForm={
    role_id:'',
      is_active:'',
      designation:'',
      reporting_to_ids:'',
  }
  

  private userFilteredValues = new BehaviorSubject<any>(this.usersFilterForm);
  public userFilteredValuesData$ = this.userFilteredValues.asObservable();

  setUsersFilteredFormValues(data: any) {
    //console.log(data,"data in set users filterde values");
    this.usersFilterForm.role_id = data.role_id;
    //console.log(this.usersFilterForm.role_id,"this.usersFilterForm.counsellor_id ");
    this.usersFilterForm.is_active = data.is_active;
    this.usersFilterForm.designation = data.designation;
    this.usersFilterForm.reporting_to_ids = data.reporting_to_ids;
    
  }

  getUsersfiletredFormValues() {
    return this.usersFilterForm;
  }



  
 
  }

 
  

