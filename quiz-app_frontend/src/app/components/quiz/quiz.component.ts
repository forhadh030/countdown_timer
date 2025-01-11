import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions: any[] = []; // Store all quiz questions
  currentQuestionIndex: number = 0; // Track the current question index
  score: number = 0; // Keep track of the user's score
  selectedAnswers: string[] = []; // Store the user's selected answers
  showQuitConfirmation: boolean = false; // Flag for showing quit confirmation
  selectedCategory: string = 'General'; // Default category
  selectedDifficulty: string = 'Easy'; // Default difficulty

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    // Fetch all questions initially (you already have this functionality)
    this.quizService.getAllQuestions().subscribe((data: any[]) => {
      this.questions = data.map((question) => this.shuffleOptions(question));
    });
  }

  // Fisher-Yates shuffle algorithm to shuffle the options
  shuffleOptions(question: any): any {
    const options = [
      question.optionOne,
      question.optionTwo,
      question.optionThree,
      question.correctOption,
    ];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]]; // Swap
    }
    return { ...question, options }; // Return the shuffled question
  }

  // Fetch questions based on category and difficulty
  fetchQuestion(): void {
    this.quizService
      .getQuestionsByCategoryAndDifficulty(this.selectedCategory, this.selectedDifficulty)
      .subscribe(
        (data) => {
          this.questions = data.map((question: any) => this.shuffleOptions(question));
          this.currentQuestionIndex = 0; // Reset to the first question
  
          // Navigate to the quiz page after fetching the questions
          this.router.navigate(['/quiz']); // This will redirect to the quiz component
        },
        (error) => {
          console.error('Error fetching question:', error);
        }
      );
  }
  

  // Method for quitting the quiz
  quitQuiz(): void {
    this.showQuitConfirmation = true; // Show confirmation dialog
  }

  // Method to confirm quitting
  confirmQuit(): void {
    this.router.navigate(['/home']); // Redirect to home page
  }

  // Method to cancel quitting
  cancelQuit(): void {
    this.showQuitConfirmation = false; // Hide confirmation dialog
  }

  // Handle selecting an answer
  selectAnswer(selectedOption: string): void {
    if (!this.showQuitConfirmation) {  // Only allow selecting answers if the confirmation is not visible
      const currentQuestion = this.questions[this.currentQuestionIndex];
      currentQuestion.selectedOption = selectedOption; // Store the selected option in the question object
      this.selectedAnswers[this.currentQuestionIndex] = selectedOption;
    
      // Automatically move to the next question if it's not the last one
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    }
  }

  // Getter for the total number of questions
  get totalQuestions(): number {
    return this.questions.length;
  }

  // Getter for the current question
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // Getter for the options of the current question
  get options() {
    return this.currentQuestion?.options || [];
  }

  // Move to the next question
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1 && !this.showQuitConfirmation) {
      this.currentQuestionIndex++;
    }
  }

  // Move to the previous question
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0 && !this.showQuitConfirmation) {
      this.currentQuestionIndex--;
    }
  }

  // Check if the quiz is complete
  isQuizComplete(): boolean {
    return this.currentQuestionIndex >= this.questions.length - 1;
  }

  // Calculate and display the final score
  submitQuiz(): void {
    const correctAnswers = this.questions.filter(
      (q) => q.selectedOption === q.correctOption
    ).length;
  
    this.router.navigate(['/result'], {
      state: { 
        questions: this.questions, 
        correctAnswers: correctAnswers 
      }
    });
  }

  // Reset the quiz
  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswers = [];
  }
}
