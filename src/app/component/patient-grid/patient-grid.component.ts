import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../model/patient/patient.model';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrl: './patient-grid.component.css'
})
export class PatientGridComponent implements OnInit{
  pageNumber: number = 0;
  pageSize: number = 5;
  patients?: PatientModel[];
  title = ''

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.retrievePatientList();
  }

  retrievePatientList(): void {
    this.patientService.getPageable(this.pageNumber, this.pageSize)
      .subscribe({
        next: (data) => {
          this.patients = data.content;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
