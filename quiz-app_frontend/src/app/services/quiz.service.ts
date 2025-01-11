import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://localhost:8080'; // Base URL for your backend

  constructor(private http: HttpClient) {}

  // Get all questions (already working)
  getAllQuestions(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/question/allQuestions`);
  }

  // Get question by ID (already working)
  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/question/question/${id}`);
  }

  // Get all categories (fixed URL)
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/question/categories`);
  }

  // Get questions by category (already working)
  getQuestionsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/question/category/${category}`);
  }

  // Add this method to your quiz.service.ts
  getQuestionsByCategoryAndDifficulty(category: string, difficulty: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/question/category/${category}/difficulty/${difficulty}`);
  }

  // Add a question (already working)
  addQuestion(question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/question/add`, question);
  }

  // Submit the answers (if needed in future)
  submitAnswers(results: any): Observable<any> {
    const quizId = 1; // Replace with appropriate quiz ID if needed
    return this.http.post(`${this.baseUrl}/quiz/submit/${quizId}`, results);
  }
}
