import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TraineeDetailsService } from 'src/app/services/trainee-details.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  reviewForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private dataService:TraineeDetailsService){

    //this form is used validate the review form
    this.reviewForm = this.formBuilder.group({
      technicalTopic: [''],
      reviewerName:['',Validators.required],
      reviewerID:['',Validators.required],
      nonTechnicalTopic:[''],
      traineeName:['',Validators.required],
      traineeID:['',Validators.required],
      reviewType:[''],
      mentorName:['',Validators.required],
      mentorID:['',Validators.required],
      reviewDate:['',Validators.required],
      TNTeam:['',Validators.required],
      TNTeamID:['',Validators.required]
    })
  }

  // this method is used to get the details from the review form
  reviewFormDetails(value:any){
    const reviewFormDetails = {
      REVIEW_ID : 127,
      TECHNICAL_ID : 16,
      NON_TECHNICAL_ID : 15,
      REVIEWER_NAME : value.reviewerName,
      REVIEWER_ID : value.reviewerID,
      TRAINEE_NAME : value.traineeName,
      TRAINEE_ID : value.traineeID,
      MENTOR_NAME : value.mentorName,
      MENTOR_ID : value.mentorID,
      TN_TEAM : value.TNTeam,
      TN_TEAM_ID : value.TNTeamID,
      REVIEW_TYPE : value.reviewType,
      REVIEW_DATE : value.reviewDate,
      OVERALL_PERFORMANCE : "",
      OVERALL_SCORE : "",
      TECHNOLOGY : "",
      EMPLOYEE_EMAIL: sessionStorage.getItem('Employee_Email')
    }
    console.log(reviewFormDetails);
     this.dataService.reviewFormDetails(reviewFormDetails);
  }
}
