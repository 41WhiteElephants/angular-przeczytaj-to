import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
// import { SignupComponent } from "./auth/signup/signup.component";
import { GenerateAudioComponent } from "./generate-audio/generate-audio.component";
import { LandingComponent } from "./landing/landing.component";
import { AuthGuard } from './auth/auth-guard.service';


const routes :Routes = [
{path:'', component: LandingComponent},
// {path: 'generuj', canActivate: [AuthGuard],  component :GenerateAudioComponent},
{path: 'login', component :LoginComponent},
// todo: add registration
// {path: 'rejestruj', component :SignupComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    // providers: [AuthGuard]

})
export class AppRoutingModule{}