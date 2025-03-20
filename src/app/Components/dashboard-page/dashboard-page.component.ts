import { Component, OnInit } from '@angular/core';
import { TraineeDetailsService } from 'src/app/services/trainee-details.service';



@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent{

  impactTrainee:any = [];
  internship:any = [];
  totalCount:any = [];

  constructor(private traineeDetailsService:TraineeDetailsService){

    this.allCounts();
  }
  

  allCounts(){
    this.traineeDetailsService.impactTraineeDetails().subscribe((details)=>{
      this.impactTrainee = details;
      this.totalCount.push(...this.impactTrainee);
    })
    this.traineeDetailsService.internshipDetails().subscribe((details)=>{
      this.internship = details;
      this.totalCount.push(...this.internship);
    })
  }
}
