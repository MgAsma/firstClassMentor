import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService,private router:Router){}
  ngOnInit(){
    
    if(!localStorage.getItem('token')){
      this.router.navigate(['login'])
    }
    this.ngxService.start(); 
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);

    this.ngxService.startBackground("do-background-things");
    
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); 
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); 
    }, 1000);
  }
}
