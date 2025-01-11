import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationStart, RouterModule } from '@angular/router'; // Add RouterModule here

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],  // Ensure RouterModule is included here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hasQuizStarted: boolean = false;

  constructor(private router: Router) {}

  startQuiz() {
    this.hasQuizStarted = true;
    console.log('Navigating to /quiz');
    this.router.navigate(['/quiz']);
  }

  submitQuiz() {
    this.hasQuizStarted = false;
    console.log('Navigating to /submit');
    this.router.navigate(['/submit']);
  }
  title = 'quiz-app_frontend';
}
