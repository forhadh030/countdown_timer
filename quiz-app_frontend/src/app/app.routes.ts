import { provideRouter, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },              // Default redirect
  { path: 'home', component: HomeComponent },        // Home page route
  { path: 'quiz', component: QuizComponent },          // Quiz page route
  { path: 'result', component: ResultComponent },      // Result page route
];