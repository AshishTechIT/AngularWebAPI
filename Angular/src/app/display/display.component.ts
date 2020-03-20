import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { CandidateService } from '../shared/Candidate.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(public candidateService: CandidateService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.candidateService.selectedCandidate = {
      CandidateID:null,
      CandidateName:'',
      CandidateDOB:'',
      CandidateDomain:'',
      CandidateProfileDoc:'',
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      this.candidateService.postCandidate(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.candidateService.getCandidateList();
          this.toastr.success('New Record Added Succcessfully', 'Candidate Register');
        })
    }
    else {
      this.candidateService.putCandidate(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.candidateService.getCandidateList();
        this.toastr.info('Record Updated Successfully!', 'Candidate Register');
      });
    }
  
  }

}
