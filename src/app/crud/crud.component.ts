import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { data } from 'jquery';
import { CrudValidators } from './crud.validators';

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
  mdlTitle: string = '';
  crtUpt: string = '';
  shwCnfrm = false;
  policyNumberToDelete: string = '';
  policyIdToDelete: string = '';

  constructor(fb: FormBuilder, private service: CrudService) {
    this.createForm = fb.group({
      id: [""],
      Number: ["", [Validators.required, Validators.minLength(4)]],
      Name: ["", [Validators.required]],
      Age: ["", [Validators.required, CrudValidators.checkAge]],
      Gender: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  get Number() {
    return this.createForm.get('Number');
  }

  get Name() {
    return this.createForm.get('Name');
  }

  get Age() {
    return this.createForm.get('Age');
  }

  get Gender() {
    return this.createForm.get('Gender');
  }

  opnMdl() {
    this.isModalOpen = true;
    this.createForm.reset();
    this.mdlTitle = 'Create a new Policy';
    this.crtUpt = 'Create';
  }

  clsMdl() {
    this.isModalOpen = false;
    this.createForm.reset();
  }

  generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
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
      const newPolicy = { ...this.createForm.value, id: this.generateUniqueId() };
      this.service.createData(newPolicy).subscribe(data => {
      // this.service.createData(this.createForm.value).subscribe(data => {
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

  cnfrmDlt(id: string, number: string) {
    this.policyIdToDelete = id;
    this.policyNumberToDelete = number;
    this.shwCnfrm = true;
  }

  dltCnfrm() {
    this.service.deleteData(this.policyIdToDelete).subscribe(data => {
      alert("Policy Deleted");
      this.getData();
      this.shwCnfrm = false;
      // this.policyIdToDelete = '';
      // this.policyNumberToDelete = '';
    });
  }

  cnclDlt() {
    this.shwCnfrm = false;
    // this.policyIdToDelete = '';
    // this.policyNumberToDelete = '';
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
      this.mdlTitle = 'Updating Policy: ' + data.Number;
      this.crtUpt = 'Update';
    })
  }

}
