import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Candidate } from './Candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  readonly rootUrl = 'http://localhost:35257/api/Candidate';
  selectedCandidate : Candidate;
  CandidateList : Candidate[];
  constructor(private http : HttpClient) { }

  postCandidate(cnd : Candidate){
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/text' }),responsetype:'Text' };
    return this.http.post<Candidate>(this.rootUrl + '/POST-InsertCandidateDetails/', cnd, httpOptions);
  }

  putCandidate(employee: Candidate): Observable<Candidate> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Candidate>(this.rootUrl + '/Put/', employee, httpOptions);
  }
  
 
  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(this.rootUrl + '/Get/' + id);
  }
  
  getCandidateList(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.rootUrl + '/CandidateList');
  }

  deleteCandidate(id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.rootUrl + '/Delete?id=' + id, httpOptions)
  }
}
