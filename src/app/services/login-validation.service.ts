import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginValidationService {

  employeeDetails : any ;
  constructor(private http: HttpClient, private router:Router) { }

  //this method is used to validate the Employee
  loginValidation(value:any){
    this.http.get<any>(environment.TNDetails).subscribe((details)=>{
      const validation = details.find((employee:any)=>{
        this.employeeDetails = employee;
        return value.EmployeeEmail === employee.Mail_Id && value.EmployeePassword === employee.PASSWORD;
      })

      if(validation){
        alert("successfully LoggedIn");
        sessionStorage.setItem("Employee_Name",this.employeeDetails.FIRST_NAME+" "+this.employeeDetails.LAST_NAME);
        sessionStorage.setItem("Employee_Designation",this.employeeDetails.DESIGNATION);
        sessionStorage.setItem("Employee_Email",this.employeeDetails.MAIL_ID);
        this.router.navigateByUrl("homePage");
      }else{
        alert("Invalid Credentials");
        window.location.reload();
      }

    })
  }
}
