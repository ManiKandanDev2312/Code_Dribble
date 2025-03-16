import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';
import { TNManagementPageComponent } from './Components/tnmanagement-page/tnmanagement-page.component';
import { ImpactTrainingPageComponent } from './Components/impact-training-page/impact-training-page.component';
import { InternshipComponent } from './Components/Internship/internship.component';
import { TNStructureComponent } from './Components/tn-structure/tn-structure.component';
import { ReviewPendingComponent } from './Components/review-pending/review-pending.component';
import { ReviewFormComponent } from './Components/review-form/review-form.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },{
    path:"homePage",
    component: HomePageComponent,
    children:[
      {
        path:"",
        pathMatch:"full",
        redirectTo:"dashboard"
      },
      {
        path:"dashboard",
        component:DashboardPageComponent
      },
      {
        path:"tn-management",
        component:TNManagementPageComponent
      }
      ,
      {
        path:"impact-training",
        component:ImpactTrainingPageComponent
      },
      {
        path:"impact-training/Internship",
        component: InternshipComponent
      },
      {
        path:"tn-management/TN_Structure",
        component: TNStructureComponent
      },
      {
        path:"reviewPending",
        component: ReviewPendingComponent
      },
      {
        path:"reviewForm",
        component: ReviewFormComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
