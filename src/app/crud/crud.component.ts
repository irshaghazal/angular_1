import { Component } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
  
})
export class CrudComponent {
  tblHdr = ['Policy Number', 'Policy Holder Name', 'Policy Holder Age', 'Policy Holder Gender', 'Action'];
  isModalOpen = false;

  policyId: string = '';
  policyHolderName: string = '';
  age: number = 0;
  gender: string = '';
  

  opnMdl() {
    this.isModalOpen = true;
  }

  clsMdl() {
    this.isModalOpen = false;
  }

  onSubmit() {
    console.log('Policy ID:', this.policyId);
    console.log('Policy Holder Name:', this.policyHolderName);
    console.log('Age:', this.age);
    console.log('Gender:', this.gender);
    this.clsMdl();
  }
}
