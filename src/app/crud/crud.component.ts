import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { data } from 'jquery';

declare var $: any;

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
  
})
export class CrudComponent implements OnInit{
  tblHdr = ['Policy Number', 'Policy Holder Name', 'Policy Holder Age', 'Policy Holder Gender', 'Action'];
  isModalOpen = false;
  createForm;
  policies: any;

  constructor(fb: FormBuilder, private service: CrudService) {
    this.createForm = fb.group({
      id: [null],
      Number: [""],
      Name: [""],
      Age: [""],
      Gender: [""],
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  opnMdl() {
    this.isModalOpen = true;
    this.createForm.reset();
  }

  clsMdl() {
    this.isModalOpen = false;
    this.createForm.reset();
  }

  onSubmit() {
    if (this.createForm.value.id) {
      // Update
      this.service.updateData(this.createForm.value.id, this.createForm.value).subscribe(data => {
        alert("Policy Updated");
        this.createForm.reset();
        this.getData();
        console.log(data);
        this.clsMdl();
      });
    }
    else {
      // Create
      this.service.createData(this.createForm.value).subscribe(data => {
        alert("Policy Created");
        this.createForm.reset();
        this.getData();
        console.log(data);
        this.clsMdl();
      })
    }
  }

  getData() {
    this.service.getData().subscribe(data => {
      console.log('policies', data);
      this.policies = data;
    })
  }

  deleteData(ID: any) {
    this.service.deleteData(ID).subscribe(data => {
      alert("Policy Deleted");
      this.getData();
    })
  }

  updateData(ID: any) {
    this.service.getPolicyById(ID).subscribe(data => {
      console.log("Detail", data);
      this.isModalOpen = true;
      this.createForm.patchValue({
        id: data.id,
        Number: data.Number,
        Name: data.Name,
        Age: data.Age,
        Gender: data.Gender,
      })
    })
  }

}
