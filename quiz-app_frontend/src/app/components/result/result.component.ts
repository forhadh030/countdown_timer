import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question-result.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  questions: Question[] = [];
  correctAnswers: number = 0;
  currentPage: number = 1;
  questionsPerPage: number = 6;
  score: number = 0;

  constructor(private router: Router, private quizService: QuizService) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      questions: Question[];
    };

    if (state) {
      this.questions = state.questions;
      this.score = this.calculateScore(); // Set the initial score
    }
  }

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as { questions: Question[] };
  
    if (state?.questions) {
      this.questions = state.questions.map((question) => ({
        ...question,
        options: this.shuffleOptions([
          question.optionOne,
          question.optionTwo,
          question.optionThree,
          question.correctOption,
        ]),
        isIncorrect: question.selectedOption !== question.correctOption, // Set flag for incorrect answers
      }));
      this.score = this.calculateScore();
    }
  }
  

  // Shuffle options to display them in random order
  shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5);
  }

  // Calculate the user's score and mark incorrect answers
  calculateScore(): number {
    let score = 0;
    this.questions.forEach((question) => {
      if (question.selectedOption === question.correctOption) {
        score++;
      } else {
        question.isIncorrect = true; // Flag for incorrect answers
      }
    });
    return score;
  }

  // Get the total number of questions
  get totalQuestions(): number {
    return this.questions.length;
  }

  // Get questions for the current page (pagination)
  get paginatedQuestions(): Question[] {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.questions.slice(startIndex, endIndex);
  }

  // Calculate the total number of pages
  totalPages(): number {
    return Math.ceil(this.totalQuestions / this.questionsPerPage);
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Check if the selected option is the user's choice
  isOptionSelected(option: string, question: Question): boolean {
    return question.selectedOption === option;
  }

  // Disable options after selection
  disableOptions(question: Question): boolean {
    return !!question.selectedOption;
  }

  // Handle selecting an option in the result view
  selectOption(option: string, question: Question): void {
    if (!question.selectedOption) {
      question.selectedOption = option;
      question.isIncorrect = option !== question.correctOption; // Mark incorrect answers
      console.log(`Selected Option for Question ID ${question.id}:`, option);
      this.score = this.calculateScore(); // Update score after selection
      console.log(`Total Score: ${this.score}`);
    }
  }

  // Navigate back to the home page
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
