import { Component } from '@angular/core';
import { PatientModel } from '../../model/patient/patient.model';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  patient: PatientModel = {
  firstName: "",
  lastName: "",
  birthDate: "1990-01-01",
  gender: "",
  phoneNumber: "",
  address: "",
  suburb: "",
  state: "",
  postcode: ""
  };
  submitted = false;

  constructor(private patientService: PatientService) {}

  createPatient(): void {
    this.patientService.create(this.patient).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  resetForm(): void {
    this.submitted = false;
    this.patient = {
      firstName: "",
      lastName: "",
      birthDate: "1990-01-01",
      gender: "",
      phoneNumber: "",
      address: "",
      suburb: "",
      state: "",
      postcode: ""
    };
  }
}
