import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [],
  templateUrl: './patient.model.html',
  styleUrl: './patient.model.css'
})
export class PatientModel {
  pid?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: number[];
  gender?: string;
  phoneNumber?: string;
  address?: string;
  suburb?: string;
  state?: string;
  postCode?: string;
}
