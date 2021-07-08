import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { GenerateAudioComponent } from "./generate-audio/generate-audio.component";
import { LandingComponent } from "./landing/landing.component";

const routes :Routes = [
{path:'', component: LandingComponent},
{path: 'generuj', component :GenerateAudioComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule{}