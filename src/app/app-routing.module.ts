import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGridComponent } from './component/patient-grid/patient-grid.component';
import { AddPatientComponent } from './component/add-patient/add-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientGridComponent },
  { path: 'addPatient', component: AddPatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }