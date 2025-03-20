import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TraineeDetailsService } from 'src/app/services/trainee-details.service';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent {
reviewDetails:any =[];
  checkreviewDetails = [];
  questionBank : any = [];
  filteredQuestionBank : any = [];
  checkboxIndex= 1;
  traineeDetail:any = {};
  technologyList: any = new Set();
  impactTraineeList :any = [];
  internList :any = [];
  employeeList : any = [];
  editedIndex : any ;

  selectedFile: File | null = null;

  showMemberManagement:boolean = false;
  showAddQuestion:boolean = false;
  showEditMember:boolean = false;
  showTraineeList:boolean = false;

  questionForm:FormGroup;
  uploadForm:FormGroup;
  KeywordForm:FormGroup;
  editQuestionForm:FormGroup;

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
    this.questionForm= this.formBuilder.group({

      TECHNOLOGY_NAME: ['',Validators.required],
      TOPIC: ['',Validators.required],
      OBJECTIVE: ['',Validators.required],
      WEIGHTAGE: ['',Validators.required]
    });
    // this FormGroup is used to apply the conditions to the member Edit Form
    this.editQuestionForm= this.formBuilder.group({

      TECHNOLOGY_NAME: ['',Validators.required],
      TOPIC: ['',Validators.required],
      OBJECTIVE: ['',Validators.required],
      WEIGHTAGE: ['',Validators.required]

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
       this.reviewDetails = details;
    });
    this.traineeDetailsService.getQuestionBank().subscribe((details)=>{
       this.questionBank = details;
       this.checkreviewDetails = this.questionBank;
    });

    this.traineeDetailsService.impactTraineeDetails().subscribe((detail)=>{
      this.impactTraineeList = detail;
    });

    this.traineeDetailsService.internshipDetails().subscribe((detail)=>{
      this.internList = detail;
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



  // this method is used to select all the checkboxes
  clickAllCheckBoxes(){
    for(var i=0;i<this.reviewDetails.length;i++){
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
    console.log(this.questionBank);
        this.questionBank = this.checkreviewDetails;
      if(value.filterByKeyword != ''){
        let filtertedData = new Set<any>();
        for(var i=0;i<this.questionBank.length;i++){
          var data = Object.values(this.questionBank[i]);
          for(var j=0;j<data.length;j++){
            var checkData = String(data[j]).toLowerCase();
          if(checkData.includes(value.filterByKeyword.toLowerCase())){
            filtertedData.add(this.questionBank[i]);
          }
        }
        }


        if(filtertedData.size == 0)
          this.questionBank = [];
        else
        this.questionBank = [...filtertedData];
    }
  }


  // this method is used to remove the member
  deleteQuestion(index:any){
    if(confirm("sure you want to Remove "+this.questionBank[index].TECHNOLOGY_NAME)) {
      this.traineeDetailsService.deleteQuestion(this.questionBank[index]);
      this.questionBank.splice(index,1);
      this.checkreviewDetails = this.questionBank;
    }
  }

  // this method is used to show the Edit form
  showEdit(){
    if(this.showEditMember)
      this.showEditMember = false;
    else{
      this.showEditMember = true;
      this.allTechList();
    }
    
  }

  // this method is used to fill the Member Details in Edit Form
  showEditQuestion(index:any){
    this.showEdit();
    this.editQuestionForm.controls['TOPIC'].setValue(this.questionBank[index].TOPIC);
    this.editQuestionForm.controls['OBJECTIVE'].setValue(this.questionBank[index].OBJECTIVE);
    this.editQuestionForm.controls['WEIGHTAGE'].setValue(this.questionBank[index].WEIGHTAGE);
    this.editQuestionForm.controls['TECHNOLOGY_NAME'].setValue(this.questionBank[index].TECHNOLOGY_NAME);
    this.editedIndex = index;
  }

  showQuestion(){
    if(this.showAddQuestion)
      this.showAddQuestion = false;
    else{
      this.allTechList();
      this.showAddQuestion = true;
      
    }
    
  }


 

  // this method is used to delete all the members
  deleteAllMembers(){
    const checkbox = document.getElementById("parentCheckBox") as HTMLInputElement;
    if(checkbox.checked){
    if(confirm("sure you want to remove all Members")){
    this.traineeDetailsService.deleteAllReviewDetails();
    this.reviewDetails = [];
    this.checkreviewDetails = [];
    checkbox.checked = false;
    }
    }else{
      var checkedIndex = 0;
      for(var i=0;i<this.reviewDetails.length;i++){
        const checkbox = document.getElementById("checkbox"+i) as HTMLInputElement;
        if(checkbox.checked){
          this.deleteQuestion(i);
          ++checkedIndex;
          checkbox.checked = false;
        }
  
      }
      if(checkedIndex == 0)
        alert("select the Members to remove");
    }
  }


  addQuestion(question:any){
    console.log(question);
    this.traineeDetailsService.addQuestion(question).subscribe((res)=>{
      alert("question Added");
      window.location.reload();
    },
    (error)=>{
      console.log(error);
    }
  )
  }

  editQuestion(question:any){
    const editedQuestion = {
      _id:this.questionBank[this.editedIndex]._id,
      TECHNOLOGY_NAME: question.TECHNOLOGY_NAME,
      TOPIC: question.TOPIC,
      OBJECTIVE: question.OBJECTIVE,
      WEIGHTAGE: question.WEIGHTAGE
    }
    this.traineeDetailsService.editQuestion(editedQuestion).subscribe((res)=>{
      alert("question Edited");
      window.location.reload();
    },
    (error)=>{
      console.log(error);
    }
  )
  }

}
