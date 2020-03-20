import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../shared/Candidate.service'
import { Candidate } from '../shared/Candidate.model';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit {

  constructor(public candidateService: CandidateService,private toastr : ToastrService) { }

  ngOnInit() {
    this.candidateService.getCandidateList();
  }

  showForEdit(emp: Candidate) {
    this.candidateService.selectedCandidate = Object.assign({}, emp);;
  }


  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.candidateService.deleteCandidate(id)
      .subscribe(x => {
        this.candidateService.getCandidateList();
        this.toastr.warning("Deleted Successfully","candidate Register");
      })
    }
  }

}
