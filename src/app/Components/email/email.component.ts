import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TraineeDetailsService } from 'src/app/services/trainee-details.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  technologyList : any = new Set();
  internList : any = [];
  impactTraineeList : any = [];
  tnDetails : any = [];

  employeeList : any = [];
  selectedDomainList : any = [];
  selectedDomainDisplay : any = [];
  selectedDomainMailList : any = [];
  selectedCcList : any = [];

  isShowIndividualList : boolean = false;

  mailForm:FormGroup;


  constructor(private traineeDetailsService:TraineeDetailsService, private formBuilder:FormBuilder){

    this.mailForm = this.formBuilder.group({
      selectedDomain: [''],
      subject : [''],
      subDomain:[''],
      mailContent : [''],
      selectedCc:['']
    })
    this.techList();
  }


  // this method is used to list the technologies we have
  techList(){
    this.traineeDetailsService.impactTraineeDetails().subscribe((detail)=>{
      this.impactTraineeList = detail;
    });

    this.traineeDetailsService.internshipDetails().subscribe((detail)=>{
      this.internList = detail;
    });

    this.traineeDetailsService.TNDetails().subscribe((detail)=>{
      this.tnDetails = detail;
    });

  }


  // this method is used merge the list into one
  allTechList(){
    this.employeeList = [...this.impactTraineeList,...this.internList];

    for(var i = 0; i< this.employeeList.length; i++){
      if(this.employeeList[i].Practice !== undefined)
      this.technologyList.add(this.employeeList[i].Practice);
    }

    console.log(this.technologyList);
  }

  domainsToMail(){
    const toOptionElement = document.getElementById('domainsToMail') as HTMLSelectElement | null;
    if (toOptionElement) {
      toOptionElement.selectedIndex = 0;
    }
    this.allTechList();

    switch(this.mailForm.controls['selectedDomain'].value.toLowerCase()){
      case "impact trainee":
        // this.impactTraineeMailList();
        this.isShowIndividualList = true;
        break;
      case "internship":
        this.selectedDomainList.push(...this.internList);
        this.selectedDomainDisplay.push("internship");
        break;
      case "tn team":
        this.selectedDomainList.push(...this.tnDetails);
        this.selectedDomainDisplay.push("tn team");
        break;
      case "all":
        this.selectedDomainList = [...this.impactTraineeList, ...this.tnDetails, ...this.internList]
        this.selectedDomainDisplay = [];
        this.selectedDomainDisplay.push("all");
        break;
    }

    console.log(this.selectedDomainList);
  }

  removeSelectedDomain(index:any){
      switch(this.selectedDomainDisplay[index]){
        case "impact "+ this.mailForm.controls['subDomain'].value:
          if("impact "+ this.mailForm.controls['subDomain'].value == "impact All"){
            for(var i=0;i<this.selectedDomainList.length;i++){
              if(this.selectedDomainList[i].Designation == "Impact Training" ){
                this.selectedDomainList.splice(i,1);
                i -= 1;
              }
            }
            return;
          }

          for(var i=0;i<this.selectedDomainList.length;i++){
            if(this.selectedDomainList[i].Technology == this.mailForm.controls['subDomain'].value ){
              this.selectedDomainList.splice(i,1);
              i -= 1;
            }
          }
          this.selectedDomainDisplay.splice(index,1);
          break;
        case "internship":
          for(var i=0;i<this.selectedDomainList.length;i++){
            if(this.selectedDomainList[i].Designation == "Intern" ){
              this.selectedDomainList.splice(i,1);
              i -= 1;
            }
          }
          this.selectedDomainDisplay.splice(index,1);
          break;
        case "tn team":
          for(var i=0;i<this.selectedDomainList.length;i++){
            if(this.selectedDomainList[i].PRACTICE == "TALENT NURTURING" ){
              this.selectedDomainList.splice(i,1);
              i -= 1;
            }
          }
          this.selectedDomainDisplay.splice(index,1);
          break;
        case "all":
          this.selectedDomainList = [];
          this.selectedDomainMailList = [];
          this.selectedDomainDisplay.splice(index,1);
          break;
      }

      if(this.selectedDomainDisplay.length == 0)
        this.isShowIndividualList = false;
      console.log(this.selectedDomainList);
  }

  ccList(){  
    this.selectedCcList.push(this.mailForm.controls['selectedCc'].value);
    const ccOptionElement = document.getElementById('CcOption') as HTMLSelectElement | null;
    if (ccOptionElement) {
      ccOptionElement.selectedIndex = 0;
    }
  }

  removeSelectedCc(index:any){
    this.selectedCcList.splice(index,1);
  }

  selectedMailList(value:any){
    this.selectedDomainMailList = [];
    for(var i=0; i< this.selectedDomainList.length; i++){
      this.selectedDomainMailList.push(this.selectedDomainList[i].Mail_Id);
    }

    const mailObject = {
      to : this.selectedDomainMailList,
      Cc : this.selectedCcList,
      subject : value.subject,
      mailContent : value.mailContent
    }

    // console.log(mailObject);
    this.traineeDetailsService.sendMail(mailObject);
  }

  impactTraineeMailList(){
        const subOptionElement = document.getElementById('domains') as HTMLSelectElement | null;
        if (subOptionElement) {
          subOptionElement.selectedIndex = 0;
        }
        // this.selectedDomainList.push(...this.impactTraineeList);
        // this.selectedDomainDisplay.push("impact trainee"); {'.Net', 'JAVA', '(Java + Kotlin)', 'Web technology', 'Java base train'}
        let index = 0;
        var list = [];
        if(this.mailForm.controls['subDomain'].value.toLowerCase() == "all"){
          this.selectedDomainList.push(...this.impactTraineeList); 
          this.selectedDomainDisplay.push("impact "+ this.mailForm.controls['subDomain'].value);
          return;
        }else{
        for(var i=0;i<this.impactTraineeList.length;i++){
          if(this.impactTraineeList[i].Technology == this.mailForm.controls['subDomain'].value)
            list[index++] = this.impactTraineeList[i];
        }
        this.selectedDomainList.push(...list); 
        this.selectedDomainDisplay.push("impact "+ this.mailForm.controls['subDomain'].value)
      }
         
        
  }
}
