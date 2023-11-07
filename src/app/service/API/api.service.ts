import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{
  baseurl= environment.live_url;
  private leadData: any[] = [];
  constructor(private http:HttpClient,private toastr:ToastrService) { }

  ngOnInit(): void {}
  //Gateway Api
  //Login
  login(data:any){
    return this.http.post(`${this.baseurl}/api/user-login/`,data)
  }
  //Login
  //ResetLink
  sendResetLink(data:any){
    return this.http.post(`${this.baseurl}/api/reset-password/`,data)
  }
  //ResetLink
  //NewPassword
  sendNewPassword(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/reset-password/${id}/`,data)
  }
  //NewPassword


  //Advanced Settings api
  //Setup dropupdown value
  //Status
  getStatus(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/status?page_size=${size}&page=${pageNo}`)
  }
  getStatusSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/status?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllStatus(){
    return this.http.get(`${this.baseurl}/api/status`)
  }
  getStatusById(id:any){
    return this.http.get(`${this.baseurl}/api/status/${id}/`)
  }
  editStatus(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/status/${id}/`,data)
  }
  postStatus(data:any){
    return this.http.post(`${this.baseurl}/api/status/`,data)
  }
  //Status
  //Sub Status
  //Sub Status

  getSubStatus(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/sub-status?page_size=${size}&page=${pageNo}`)
  }
  getSubStatusSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/sub-status?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllSubStatus(){
    return this.http.get(`${this.baseurl}/api/sub-status`)
  }
  getSubStatusById(id:any){
    return this.http.get(`${this.baseurl}/api/sub-status/${id}/`)
  }
  editSubStatus(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/sub-status/${id}/`,data)
  }
  postSubStatus(data:any){
    return this.http.post(`${this.baseurl}/api/sub-status/`,data)
  }
  //Master Status
  getAllMasterStatus(){
    return this.http.get(`${this.baseurl}/api/master-status`)
  }
  //Master Status
  // Status Group
  getAllStatusGroup(){
    return this.http.get(`${this.baseurl}/api/status-group`)
  }
  // Status Group
  // Status Group
  getAllReasonGroup(){
    return this.http.get(`${this.baseurl}/api/reason-group`)
  }
  // Status Group
  //Channel
  getChannel(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/channel?page_size=${size}&page=${pageNo}`)
  }
  getChannelSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/channel?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllChannel(){
    return this.http.get(`${this.baseurl}/api/channel`)
  }
  getChannelById(id:any){
    return this.http.get(`${this.baseurl}/api/channel/${id}/`)
  }
  editChannel(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/channel/${id}/`,data)
  }
  postChannel(data:any){
    return this.http.post(`${this.baseurl}/api/channel/`,data)
  }
  //Channel
  //Source
  getSource(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/source?page_size=${size}&page=${pageNo}`)
  }
  getSourceSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/source?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllSource(){
    return this.http.get(`${this.baseurl}/api/source`)
  }
  getSourceById(id:any){
    return this.http.get(`${this.baseurl}/api/source/${id}/`)
  }
  editSource(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/source/${id}/`,data)
  }
  postSource(data:any){
    return this.http.post(`${this.baseurl}/api/source/`,data)
  }
  //Source
  //New Channel
  getNewChannel(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/new-channel?page_size=${size}&page=${pageNo}`)
  }
  getNewChannelSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/new-channel?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllNewChannel(){
    return this.http.get(`${this.baseurl}/api/new-channel`)
  }
  getNewChannelById(id:any){
    return this.http.get(`${this.baseurl}/api/new-channel/${id}/`)
  }
  editNewChannel(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/new-channel/${id}/`,data)
  }
  postNewChannel(data:any){
    return this.http.post(`${this.baseurl}/api/new-channel/`,data)
  }
  //Source
  //Campign
  getCampign(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/campaign?page_size=${size}&page=${pageNo}`)
  }
  getCampignSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/new-channel?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllCampign(){
    return this.http.get(`${this.baseurl}/api/campaign`)
  }
  getCampignById(id:any){
    return this.http.get(`${this.baseurl}/api/campaign/${id}/`)
  }
  editCampign(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/campaign/${id}/`,data)
  }
  postCampign(data:any){
    return this.http.post(`${this.baseurl}/api/campaign/`,data)
  }
  //Campaign
  //Medium
  getMedium(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/medium?page_size=${size}&page=${pageNo}`)
  }
  getMediumSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/medium?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllMedium(){
    return this.http.get(`${this.baseurl}/api/medium`)
  }
  getMediumById(id:any){
    return this.http.get(`${this.baseurl}/api/medium/${id}/`)
  }
  editMedium(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/medium/${id}/`,data)
  }
  postMedium(data:any){
    return this.http.post(`${this.baseurl}/api/medium/`,data)
  }
  //Medium
  //Level of program
  getLevelOfProgram(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/level-of-program?page_size=${size}&page=${pageNo}`)
  }
  getLevelOfProgramSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/level-of-program?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllLevelOfProgram(){
    return this.http.get(`${this.baseurl}/api/level-of-program`)
  }
  getLevelOfProgramById(id:any){
    return this.http.get(`${this.baseurl}/api/level-of-program/${id}/`)
  }
  editLevelOfProgram(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/level-of-program/${id}/`,data)
  }
  postLevelOfProgram(data:any){
    return this.http.post(`${this.baseurl}/api/level-of-program/`,data)
  }
  //Level of program
  //Department
  getDepartment(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/department?page_size=${size}&page=${pageNo}`)
  }
  getDepartmentSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/department?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllDepartment(){
    return this.http.get(`${this.baseurl}/api/department`)
  }
  getDepartmentById(id:any){
    return this.http.get(`${this.baseurl}/api/department/${id}/`)
  }
  editDepartment(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/department/${id}/`,data)
  }
  postDepartment(data:any){
    return this.http.post(`${this.baseurl}/api/department/`,data)
  }
  //Department
  //Course
  getCourse(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/course?page_size=${size}&page=${pageNo}`)
  }
  getCourseSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/course?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllCourse(){
    return this.http.get(`${this.baseurl}/api/course`)
  }
  getCourseById(id:any){
    return this.http.get(`${this.baseurl}/api/course/${id}/`)
  }
  editCourse(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/course/${id}/`,data)
  }
  postCourse(data:any){
    return this.http.post(`${this.baseurl}/api/course/`,data)
  }
  //Course
  //Country
  getCountry(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/country?page_size=${size}&page=${pageNo}`)
  }
  getCountrySearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/country?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllCountry(){
    return this.http.get(`${this.baseurl}/api/country`)
  }
  getCountryById(id:any){
    return this.http.get(`${this.baseurl}/api/country/${id}/`)
  }
  editCountry(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/country/${id}/`,data)
  }
  postCountry(data:any){
    return this.http.post(`${this.baseurl}/api/country/`,data)
  }
  //Country
  //State
  getState(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/state?page_size=${size}&page=${pageNo}`)
  }
  getStateSearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/state?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllState(){
    return this.http.get(`${this.baseurl}/api/state`)
  }
  getStateById(id:any){
    return this.http.get(`${this.baseurl}/api/state/${id}/`)
  }
  editState(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/state/${id}/`,data)
  }
  postState(data:any){
    return this.http.post(`${this.baseurl}/api/state/`,data)
  }
  //State
  //City
  getCity(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/city?page_size=${size}&page=${pageNo}`)
  }
  getCitySearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/city?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllCity(){
    return this.http.get(`${this.baseurl}/api/city`)
  }
  getCityById(id:any){
    return this.http.get(`${this.baseurl}/api/city/${id}/`)
  }
  editCity(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/city/${id}/`,data)
  }
  postCity(data:any){
    return this.http.post(`${this.baseurl}/api/city/`,data)
  }
  //State
  //Priority
  getPriority(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/priority-name?page_size=${size}&page=${pageNo}`)
  }
  getPrioritySearch(search:any,size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/priority-name?page_size=${size}&page=${pageNo}&key=${search}`)
  }
  getAllPriority(){
    return this.http.get(`${this.baseurl}/api/priority-name`)
  }
  getPriorityById(id:any){
    return this.http.get(`${this.baseurl}/api/priority-name/${id}/`)
  }
  editPriority(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/priority-name/${id}/`,data)
  }
  postPriority(data:any){
    return this.http.post(`${this.baseurl}/api/priority-name/`,data)
  }
  //Priority
  //Priority Group
  getPriorityGroup(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/priority-group?page_size=${size}&page=${pageNo}`)
  }
  getAllPriorityGroup(){
    return this.http.get(`${this.baseurl}/api/priority-group`)
  }
  getPriorityGroupById(id:any){
    return this.http.get(`${this.baseurl}/api/priority-group/${id}/`)
  }
  editPriorityGroup(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/priority-group/${id}/`,data)
  }
  postPriorityGroup(data:any){
    return this.http.post(`${this.baseurl}/api/priority-group/`,data)
  }
  //Priority Group
  //User
  getUser(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/user?page_size=${size}&page=${pageNo}`)
  }
  getAllUser(){
    return this.http.get(`${this.baseurl}/api/user`)
  }
  getUserById(id:any){
    return this.http.get(`${this.baseurl}/api/user/${id}/`)
  }
  editUser(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/user/${id}/`,data)
  }
  postUser(data:any){
    return this.http.post(`${this.baseurl}/api/user/`,data)
  }
  //User
  //Role
  getRole(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/role?page_size=${size}&page=${pageNo}`)
  }
  getAllRole(){
    return this.http.get(`${this.baseurl}/api/role`)
  }
  getRoleById(id:any){
    return this.http.get(`${this.baseurl}/api/role/${id}/`)
  }
  editRole(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/role/${id}/`,data)
  }
  postRole(data:any){
    return this.http.post(`${this.baseurl}/api/role/`,data)
  }
  //Role
  //Designation
  getDesignation(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/designation?page_size=${size}&page=${pageNo}`)
  }
  getAllDesignation(){
    return this.http.get(`${this.baseurl}/api/designation`)
  }
  getDesignationById(id:any){
    return this.http.get(`${this.baseurl}/api/designation/${id}/`)
  }
  editDesignation(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/designation/${id}/`,data)
  }
  postDesignation(data:any){
    return this.http.post(`${this.baseurl}/api/designation/`,data)
  }
  //Role


  //Whatsapp Template
  getWhatsappTemplate(size:any,pageNo:any){
    return this.http.get(`${this.baseurl}/api/template?page_size=${size}&page=${pageNo}`)
  }
  getAllWhatsappTemplate(){
    return this.http.get(`${this.baseurl}/api/template`)
  }
  getWhatsappTemplateById(id:any){
    return this.http.get(`${this.baseurl}/api/template/${id}/`)
  }
  editWhatsappTemplate(id:any,data:any){
    return this.http.put(`${this.baseurl}/api/template/${id}/`,data)
  }
  postWhatsappTemplate(data:any){
    return this.http.post(`${this.baseurl}/api/template/`,data)
  }
  getPlaceHolder(){
    return this.http.get(`${this.baseurl}/api/placeholder/`)
  }
  //Whatsapp Template
  //Report
  getTarget(){
    return this.http.get(`${this.baseurl}/api/employee-target/`)
  }
  getAcheived(){
    return this.http.get(`${this.baseurl}/api/employee-target-achived//`)
  }
  postEmployeeForReport(data:any){
    return this.http.post(`${this.baseurl}/api/employee-target-achived/`,data)
  }
  //Report

  
  // Success Message
  showSuccess(message: any) {
    this.toastr.success(message);

  }
  // Error Message
  showError(message: any) {
    this.toastr.error(message);
  }
  // Warning Message
  showWarning(message: any) {
    this.toastr.warning(message);
  }

  //Raw data upload
  postRawdata(data:any){
    return this.http.post(`${this.baseurl}/api/upload-lead-data/`,data)
  }
  getLeadData(): any[] {
    return this.leadData;
  }

  setLeadData(data: any[]): void {
    this.leadData = data;
  }
}
