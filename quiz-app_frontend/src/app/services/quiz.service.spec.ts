import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/api/quiz'; // Update as per backend

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/questions`);
  }

  submitAnswers(answers: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, answers);
  }
}
