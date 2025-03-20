import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraineeDetailsService {

  traineeDetails : any = [];
  constructor(private http:HttpClient) { 

  }

  //this block is used to retrieve the Impact Trainee data
  impactTraineeDetails(){
    return this.http.get<any>(environment.impactTraineeDetails);
  }
  //this block is used to retrieve the Inter Trainee data
  internshipDetails(){
    return this.http.get<any>(environment.internshipDetails);
  }
  //this block is used to retrieve the Review data
  reviewDetails(){
    return this.http.get<any>(environment.reviewDetails);
  }
  //this block is used to retrieve the Review data
  TNDetails(){
    return this.http.get<any>(environment.TNDetails);
  }


  //this method is used to delete Impact Trainee Data
  deleteImpactTrainee(Trainees:any){
    this.http.post(environment.deleteImpactTrainee,Trainees, { responseType: 'text' }).subscribe(()=>{
      console.log("successfully deleted");
    });
  }

  // this method is used to delete All the Impact Trainees
  deleteAllImpactTrainees(){
    this.http.post(environment.deleteAllImpactTrainees,{responseType : 'text'}).subscribe(()=>{
      console.log("successfully deleted");
    });
  }
  //this method is used to delete Impact Trainee Data
  deleteInternship(Trainees:any){
    this.http.post(environment.deleteInternship,Trainees, { responseType: 'text' }).subscribe(()=>{
      console.log("successfully deleted");
    });
  }

  // this method is used to delete All the Impact Trainees
  deleteAllInternship(){
    this.http.post(environment.deleteAllInternship,{responseType : 'text'}).subscribe(()=>{
      console.log("successfully deleted");
    });
  }
  //this method is used to delete Impact Trainee Data
  deleteReviewDetails(Trainees:any){
    this.http.post(environment.deleteReviewDetails,Trainees, { responseType: 'text' }).subscribe(()=>{
      console.log("successfully deleted");
    });
  }

  // this method is used to delete All the Impact Trainees
  deleteAllReviewDetails(){
    this.http.post(environment.deleteAllReviewDetails,{responseType : 'text'}).subscribe(()=>{
      console.log("successfully deleted");
    });
  }

   //this method is used to delete Impact Trainee Data
   deleteTNDetails(Trainees:any){
    this.http.post(environment.deleteTNDetails,Trainees, { responseType: 'text' }).subscribe(()=>{
      console.log("successfully deleted");
    });
  }
  // this method is used to delete All the Impact Trainees
  deleteAllTNDetails(){
    this.http.post(environment.deleteAllTNDetails,{responseType : 'text'}).subscribe(()=>{
      console.log("successfully deleted");
    });
  }

  // this method is used to send the Excel to the server
  sendExcelFile(file:any){
    const formData = new FormData();
    if(file)
      formData.append('file', file);

    this.http.post(environment.impactTraineeExcelFile, formData).subscribe(
      (res) => window.location.reload(),
      (err) => console.log(err)
    );
  }
  // this method is used to send the Excel to the server
  internshipSendExcelFile(file:any){
    const formData = new FormData();
    if(file)
      formData.append('file', file);

    this.http.post(environment.internshipExcelFile, formData).subscribe(
      (res) => window.location.reload(),
      (err) => console.log(err)
    );
  }
  // this method is used to send the Excel to the server
  reviewDetailsSendExcelFile(file:any){
    const formData = new FormData();
    if(file)
      formData.append('file', file);

    this.http.post(environment.reviewDetailsExcelFile, formData).subscribe(
      (res) => window.location.reload(),
      (err) => console.log(err)
    );
  }
  // this method is used to send the Excel to the server
  TNDetailsSendExcelFile(file:any){
    const formData = new FormData();
    if(file)
      formData.append('file', file);

    this.http.post(environment.TNDetailsExcelFile, formData).subscribe(
      (res) => window.location.reload(),
      (err) => console.log(err)
    );
  }

// this method is used to store the review form details in the database
  reviewFormDetails(value:any){
    this.http.post(environment.reviewFormDetails, value, { responseType: 'text' }).subscribe(
      (res)=>{
        alert("Review Form Submitted");
        window.location.reload();
      },
      (error)=>console.log(error)
    )
  }


  // this method is used to send a mail
  sendMail(mailDetails: any){
    this.http.post(environment.sendMail,mailDetails, { responseType: 'text' }).subscribe(
      (res) => {
        alert("Mail Sent Successfully");
        window.location.reload();
      },
      (err) => console.log(err)
    )
  }

  //this method is used to retrieve the question bank
  getQuestionBank(){
    return this.http.get(environment.questionBank);
  }


  addQuestion(question:any){
    return this.http.post(environment.addQuestion,question,{responseType : 'text'});
  }
  editQuestion(question:any){
    return this.http.post(environment.editQuestion,question,{responseType : 'text'});
  }
  deleteQuestion(question:any){
    this.http.post(environment.deleteQuestion,question,{responseType : 'text'}).subscribe((res)=>{
      alert("successfully deleted");
      window.location.reload();
    },(error)=>{
      console.log(error);
    }
  );
  }

}
