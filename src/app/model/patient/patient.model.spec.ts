import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientModel } from './patient.model';

describe('PatientModel', () => {
  let component: PatientModel;
  let fixture: ComponentFixture<PatientModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
