import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CrudService } from '../services/crud.service';

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
  }

  clsMdl() {
    this.isModalOpen = false;
  }

  onSubmit() {
    this.service.createData(this.createForm.value).subscribe(data => {
      alert("Create");
      this.createForm.reset();
      this.getData();
      console.log(data);
    })
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
    this.service.updateData(ID).subscribe(data => {
      alert("Successfully Get");
      console.log("Detail", data);
      setTimeout(() => {
        $(".modal").click();
      })
      this.createForm.patchValue({
        Number: data.Number,
        Name: data.Name,
        Age: data.Age,
        Gender: data.Gender,
      })
    })
  }

}
