import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  addForm!:FormGroup;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddChannelComponent>) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.addForm = this._fb.group({
      channel_name:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postChannel(this.addForm.value).subscribe(
        (resp:any)=>{
          this.dialogRef.close()
        },
        (error:any)=>{
          console.log("error");
          
        }
      )
    }

  }
}

