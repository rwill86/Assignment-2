import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
//Routes
const routes: Routes = [
     {path:'', component: HomeComponent},
     {path:'home', component: HomeComponent},
     {path:'login', component: LoginComponent},
     {path:'user', component: UserComponent},
     {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{ 
}
