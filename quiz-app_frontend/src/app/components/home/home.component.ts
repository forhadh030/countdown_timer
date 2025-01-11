import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasQuizStarted: boolean = false;
  selectedCategory: string = ''; // Initially set to empty string to indicate no category is selected
  selectedDifficulty: string = ''; // Initially empty until difficulty is selected
  categories: string[] = [];  // Store the categories
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];  // Add difficulty options
  questions: any[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.quizService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        // Optionally, if you want to handle the case where no categories are returned, you can check the length here
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  startQuiz() {
    this.hasQuizStarted = true;
    this.router.navigate(['/quiz']);
  }

  fetchQuestions() {
    if (this.selectedCategory && this.selectedDifficulty) {
      this.quizService.getQuestionsByCategoryAndDifficulty(this.selectedCategory, this.selectedDifficulty).subscribe(
        (data: any) => {
          this.questions = data;
          console.log('Fetched Questions:', this.questions);
          // Pass the filtered questions to the quiz component via router state
          this.router.navigate(['/quiz'], {
            state: {
              questions: this.questions
            }
          });
        },
        (error: any) => {
          console.error('Error fetching questions:', error);
        }
      );
    } else {
      console.error('Please select both category and difficulty');
    }
  }
}