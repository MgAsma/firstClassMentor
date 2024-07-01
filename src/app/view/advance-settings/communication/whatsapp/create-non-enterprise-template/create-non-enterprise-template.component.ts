import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-non-enterprise-template',
  templateUrl: './create-non-enterprise-template.component.html',
  styleUrls: ['./create-non-enterprise-template.component.css']
})
export class CreateNonEnterpriseTemplateComponent implements OnInit {
  message:any
  currentTime:any
  constructor() { }

  ngOnInit(): void {
    this.updateTime()
  }
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  private updateTime() {
    this.currentTime = new Date();
  }
}
