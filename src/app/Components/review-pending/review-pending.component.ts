import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TraineeDetailsService } from 'src/app/services/trainee-details.service';

@Component({
  selector: 'app-review-pending',
  templateUrl: './review-pending.component.html',
  styleUrls: ['./review-pending.component.css']
})
export class ReviewPendingComponent {
TNData:any =[];
  checkTNData = [];
  checkboxIndex= 1;
  traineeDetail:any = {};
  filteredQuestionBank: any = [];
  questionBank : any = [];

  selectedFile: File | null = null;

  showMemberManagement:boolean = false;
  showUploadFile:boolean = false;
  showEditMember:boolean = false;
  showTraineeList:boolean = false;

  memberForm:FormGroup;
  uploadForm:FormGroup;
  KeywordForm:FormGroup;
  editMemberForm:FormGroup;

  filterByKeyword:string = "";
  filterByACEID: string ="";
  filterByFirstName:string="";
  filterByLastName:string= "";
  filterByDesignation:string="";
  filterByTeam:string = "";


  constructor(private formBuilder: FormBuilder, private traineeDetailsService:TraineeDetailsService, private router:Router) { 

    // this FormGroup is used to filter the data by Keyword
    this.KeywordForm = this.formBuilder.group({
      filterByKeyword: new FormControl(['',Validators.required])
    });

    // this FormGroup is used to apply the conditions to the member Add Form
    this.memberForm= this.formBuilder.group({

      ACE_ID: ['',Validators.required],
      First_Name: ['',Validators.required],
      Last_Name: ['',Validators.required],
      Designation: ['',Validators.required],
      Team: ['',Validators.required],
      Practice: ['',Validators.required]

    });
    // this FormGroup is used to apply the conditions to the member Edit Form
    this.editMemberForm= this.formBuilder.group({

      ACE_ID: ['',Validators.required],
      First_Name: ['',Validators.required],
      Mail_ID: ['',Validators.required],
      College_Name: ['',Validators.required],
      Practice: ['',Validators.required],
      DOJ: ['',Validators.required]

    });

    // this FormGroup is used to apply the condition in File Upload Form
    this.uploadForm = this.formBuilder.group({
      fileUpload:['',Validators.required]
    });

    // this Array is the Full details of the Review
   this.retrieveReviewDetails();

    //this code is used when the filterByKeyword variable disturbed it calls filter function
    this.KeywordForm.valueChanges.subscribe((value) => {
      // if(value.filterByKeyword !==  '')
        this.filterData(value);
    });
  }

  //this method is used to retrieve the Trainee Data
  retrieveReviewDetails(){
    this.traineeDetailsService.reviewDetails().subscribe((details)=>{
       this.TNData = details;
       this.checkTNData = this.TNData;
    });
    this.traineeDetailsService.getQuestionBank().subscribe((details)=>{
      this.questionBank = details;
   });
  }



  //this method is used to clear the data in form
  clearForm(){
  }

    // this method is used to show the file upload form
    showFileUpload(){
      if(this.showUploadFile){
        this.showUploadFile = false;
      }else{
        this.showUploadFile = true;
      }
    }


  // this method is used to select all the checkboxes
  clickAllCheckBoxes(){
    for(var i=0;i<this.TNData.length;i++){
      const checkbox = document.getElementById("checkbox"+i) as HTMLInputElement;
      if(this.checkboxIndex == 1){
        checkbox.checked = true;
      }else{
        checkbox.checked = false;
      }

    }
    if(this.checkboxIndex == 1)
    this.checkboxIndex = 2;
    else
    this.checkboxIndex = 1;
  }


  // this method is used to filter the data
  filterData(value:any){
    console.log(this.TNData);
        this.TNData = this.checkTNData;
      if(value.filterByKeyword != ''){
        let filtertedData = new Set<any>();
        for(var i=0;i<this.TNData.length;i++){
          var data = Object.values(this.TNData[i]);
          for(var j=0;j<data.length;j++){
            var checkData = String(data[j]).toLowerCase();
          if(checkData.includes(value.filterByKeyword.toLowerCase())){
            filtertedData.add(this.TNData[i]);
          }
        }
        }


        if(filtertedData.size == 0)
          this.TNData = [];
        else
        this.TNData = [...filtertedData];
    }
  }


  // this method is used to remove the member
  deleteMember(index:any){
    if(confirm("sure you want to Remove "+this.TNData[index].NAME)) {
      this.traineeDetailsService.deleteReviewDetails(this.TNData[index]);
      this.TNData.splice(index,1);
      this.checkTNData = this.TNData;
    }
  }

  // this method is used to show the Edit form
  showEdit(){
    if(this.showEditMember)
      this.showEditMember = false;
    else
    this.showEditMember = true;
  }

  // this method is used to fill the Member Details in Edit Form
  editMember(index:any){
    this.showEdit();
    this.editMemberForm.controls['ACE_ID'].setValue(this.TNData[index].ACE_ID);
    this.editMemberForm.controls['First_Name'].setValue(this.TNData[index].First_Name);
    this.editMemberForm.controls['Mail_ID'].setValue(this.TNData[index].Mail_ID);
    this.editMemberForm.controls['College_Name'].setValue(this.TNData[index].College_Name);
    this.editMemberForm.controls['Practice'].setValue(this.TNData[index].Practice);
    this.editMemberForm.controls['DOJ'].setValue(this.TNData[index].DOJ);
  }


  // this method is used to Edit the Member Details
  EditedMemberDetails(value:any){
    
    for(var i=0;i<this.TNData.length;i++){
      if(this.TNData[i].ACE_ID === value.ACE_ID){
        this.TNData[i] = value;
        break;
      }
    }

    this.showEdit();
  }

  // this method is used to delete all the members
  deleteAllMembers(){
    const checkbox = document.getElementById("parentCheckBox") as HTMLInputElement;
    if(checkbox.checked){
    if(confirm("sure you want to remove all Members")){
    this.traineeDetailsService.deleteAllReviewDetails();
    this.TNData = [];
    this.checkTNData = [];
    checkbox.checked = false;
    }
    }else{
      var checkedIndex = 0;
      for(var i=0;i<this.TNData.length;i++){
        const checkbox = document.getElementById("checkbox"+i) as HTMLInputElement;
        if(checkbox.checked){
          this.deleteMember(i);
          ++checkedIndex;
          checkbox.checked = false;
        }
  
      }
      if(checkedIndex == 0)
        alert("select the Members to remove");
    }
  }



  // this method is used to catch the file from the form
  onFileChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file)
        this.selectedFile = file;
    }
  }

  //this method is used to upload the file
  uploadFile(){
    this.traineeDetailsService.reviewDetailsSendExcelFile(this.selectedFile);
  }
  // this method is used to show the individual details
  showTraineeDetails(index:any){
    this.filteredQuestionBank = [];
    if(index >= 0){
      this.traineeDetail = this.TNData[index];
      console.log(this.traineeDetail.TECHNICAL_ID);
      let filterIndex = 0;
      for(var i=0;i<this.questionBank.length;i++){
        if(this.questionBank[i].TECHNOLOGY_NAME == "Soft Skills")
          this.filteredQuestionBank[filterIndex++] = this.questionBank[i];
      }
      for(var i=0;i<this.questionBank.length;i++){
        if(this.questionBank[i].TECHNOLOGY_NAME.toLowerCase() == this.traineeDetail.TECHNOLOGY.toLowerCase())
          this.filteredQuestionBank[filterIndex++] = this.questionBank[i];
      }
    }
    if(this.showTraineeList)
      this.showTraineeList = false;
    else
    this.showTraineeList = true;
  }


  saveScore(){
    const MarksList = [];
    console.log(this.filteredQuestionBank);
    for(var i =0; this.filteredQuestionBank.length; i++){
      const marks = document.getElementById("score"+i) as HTMLInputElement;
      MarksList[i] = marks?.value;
    }
    console.log(MarksList);
    // alert("score Saved successfully");
  }
}
