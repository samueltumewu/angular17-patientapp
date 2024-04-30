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
  pageSize: number = 10;
  patients?: PatientModel[];
  patientFirstName = ''
  patientLastName = ''
  totalPage: number = 0;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.retrievePatientList();
  }

  retrievePatientList(pageNumber = this.pageNumber, pageSize = this.pageSize): void {
    this.patientService.getPageable(pageNumber, pageSize)
      .subscribe({
        next: (data) => {
          this.patients = data.content;
          this.totalPage = data.totalPage;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchByPatientName(): void {
    this.pageNumber = 0;
    this.patientService.getPageableSearch(this.pageNumber, this.pageSize, this.patientFirstName, this.patientLastName)
      .subscribe({
        next: (data) => {
          this.patients = data.content;
          this.totalPage = data.totalPage;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  removeThisRow(patient: PatientModel): void {
    console.log(`DELETING: ${patient.firstName} with ${patient.pid}`)
    this.patientService.delete(patient.pid)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      })
  }

  handleNextButton(): void {
    if (this.pageNumber < this.totalPage-1) {
      this.pageNumber++;
      if (this.patientFirstName != '' || this.patientLastName != '')
        this.searchByPatientName();
      else 
        this.retrievePatientList();
    } 
  }
  handleBackButton(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      if (this.patientFirstName != '' || this.patientLastName != '')
        this.searchByPatientName();
      else 
        this.retrievePatientList();
    } 
  }
  handleFirstButton(): void {
    this.pageNumber = 0;
    if (this.patientFirstName != '' || this.patientLastName != '')
      this.searchByPatientName();
    else 
      this.retrievePatientList();
  }
  handleLastButton(): void {
    this.pageNumber = this.totalPage - 1;
    if (this.patientFirstName != '' || this.patientLastName != '')
      this.searchByPatientName();
    else 
      this.retrievePatientList();
  }

  //utilities
  convertToJSDateFromString(strBirthDate?: number[]): Date {
    let strDate: string = strBirthDate?.at(0) +"-"+ strBirthDate?.at(1) +"-"+ strBirthDate?.at(2);
    return new Date(strDate);
  }
  refreshList(): void {
    this.pageNumber = 0;
    this.pageSize = 10;
    this.patientFirstName = ''
    this.patientLastName = ''
    this.totalPage = 0;
    this.retrievePatientList();
  }

}
