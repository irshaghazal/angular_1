import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
  
})
export class CrudComponent {
  tblHdr = ['Policy Number', 'Policy Holder Name', 'Policy Holder Age', 'Policy Holder Gender', 'Action'];
  isModalOpen = false;
  createForm;

  constructor(fb: FormBuilder) {
    this.createForm = fb.group({
      Number: [""],
      Name: [""],
      Age: [""],
      Gender: [""],
    })
  }

  opnMdl() {
    this.isModalOpen = true;
  }

  clsMdl() {
    this.isModalOpen = false;
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

}
