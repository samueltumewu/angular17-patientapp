import { Component, OnInit, TemplateRef } from '@angular/core';
import { PatientModel } from '../../model/patient/patient.model';
import { PatientService } from '../../service/patient.service';

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrl: './patient-grid.component.css',
  providers: [BsModalService],
})
export class PatientGridComponent implements OnInit{
  pageNumber: number = 0;
  pageSize: number = 5;
  patients?: PatientModel[];
  patientFirstName = ''
  patientLastName = ''
  totalPage: number = 0;
  // Modal Edit Mode
  modalRef!: BsModalRef;
  patientToEdit!: any;

  constructor(private patientService: PatientService, 
    private modalService: BsModalService) {}

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

  searchByPatientNameAndResetPageNumberToZero(): void {
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

  searchByPatientName(): void {
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

  editThisRow(): void {
    console.log(`UPDATING: ${this.patientToEdit.firstName} with ${this.patientToEdit.pid}`)
    this.patientService.update(this.patientToEdit.pid, this.patientToEdit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      })
    this.exitModal();
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

  changePageSize(value:any): void {
    let numberValue = Number(value);
		this.pageSize = numberValue;
    this.pageNumber = 0;
    if (this.patientFirstName != '' || this.patientLastName != '')
      this.searchByPatientName();
    else 
      this.retrievePatientList();
	}

  //modal bootstrap functions
  openModal(viewUserTemplate: TemplateRef<any>, patient: PatientModel) {
    this.modalRef = this.modalService.show(viewUserTemplate);
    this.patientToEdit = patient;
  }
  exitModal = (): void => {
    this.modalRef.hide();
  };

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
    this.patientToEdit = {};
  }

}
