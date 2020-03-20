import { Component, OnInit } from '@angular/core';
import { Candidate } from '../shared/Candidate.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from '../shared/Candidate.service';
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  dataSaved = false;
  candForm: any;
  allCandidates: Observable<Candidate[]>;
  candidateIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private candidateService: CandidateService) { }

  ngOnInit() {
    this.candForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      CandidateDomain: ['', [Validators.required]],
      CandidateProfileDoc: ['', [Validators.required]],
    });
    this.loadAllCandidates();
  }
  loadAllCandidates() {
    this.allCandidates = this.candidateService.getCandidateList();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const candidate = this.candForm.value;
    this.CreateCandidate(candidate);
    this.candForm.reset();
  }
  loadEmployeeToEdit(candidateId: number) {
    this.candidateService.getCandidateById(candidateId).subscribe(candidate => {
      this.massage = null;
      this.dataSaved = false;
      this.candidateIdUpdate = candidate.CandidateID;
      this.candForm.controls['Name'].setValue(candidate.CandidateName);
      this.candForm.controls['DateOfBirth'].setValue(candidate.CandidateDOB);
      this.candForm.controls['CandidateDomain'].setValue(candidate.CandidateDomain);
      this.candForm.controls['CandidateProfileDoc'].setValue(candidate.CandidateProfileDoc);
      
    });

  }
  CreateCandidate(candidate: Candidate) {
    if (this.candidateIdUpdate == null) {
      this.candidateService.postCandidate(candidate).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllCandidates();
          this.candidateIdUpdate = null;
          this.candForm.reset();
        }
      );
    } else {
      candidate.CandidateID = this.candidateIdUpdate;
      this.candidateService.putCandidate(candidate).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllCandidates();
        this.candidateIdUpdate = null;
        this.candForm.reset();
      });
    }
  }
 
  deleteEmployee(candidateId:number) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.candidateService.deleteCandidate(candidateId).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllCandidates();
      this.candidateIdUpdate = null;
      this.candForm.reset();

    });
  }
}
  resetForm() {
    this.candForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }

}
